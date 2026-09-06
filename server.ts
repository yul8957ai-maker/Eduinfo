import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini client
function getGeminiClient(customApiKey?: string): GoogleGenAI {
  const key = customApiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({ apiKey: key });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Check if default server API key is configured and valid
app.get("/api/auth/status", async (req, res) => {
  const envKey = process.env.GEMINI_API_KEY?.trim();
  if (!envKey || envKey === "MY_GEMINI_API_KEY") {
    return res.json({
      approved: false,
      source: "none",
      message: "서버 환경변수(GEMINI_API_KEY)가 등록되지 않았습니다."
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: envKey });
    await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "ping",
    });
    return res.json({
      approved: true,
      source: "server_env",
      message: "서버 환경변수에 등록된 Gemini API Key가 정상 승인되었습니다."
    });
  } catch (err: any) {
    return res.json({
      approved: false,
      source: "server_env_invalid",
      message: "등록된 API Key의 유효성 검증에 실패했습니다.",
      error: err?.message || String(err)
    });
  }
});

// Explicit API Key Validation endpoint
app.post("/api/auth/validate-key", async (req, res) => {
  const inputKey = req.body?.apiKey?.trim() || process.env.GEMINI_API_KEY?.trim();

  if (!inputKey || inputKey === "MY_GEMINI_API_KEY") {
    return res.status(400).json({
      success: false,
      error: "API Key가 입력되지 않았거나 유효하지 않습니다."
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: inputKey });
    // Run quick verification query
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "간단한 유효성 테스트입니다. 'OK'라고만 답변해주세요.",
    });

    if (response && response.text) {
      return res.json({
        success: true,
        message: "Google Gemini API Key 유효성 검증이 성공적으로 승인되었습니다.",
        keyMasked: inputKey.slice(0, 6) + "..." + inputKey.slice(-4)
      });
    } else {
      throw new Error("API 응답을 수신하지 못했습니다.");
    }
  } catch (err: any) {
    console.error("API Key validation error:", err);
    return res.status(400).json({
      success: false,
      error: err?.message || "입력하신 API Key가 유효하지 않거나 할당량이 초과되었습니다."
    });
  }
});

// AI Counselor Feedback generation endpoint
app.post("/api/generate-counselor-notes", async (req, res) => {
  const { traineeInfo, overallMean, topStrengths, growthAreas, apiKey } = req.body;

  try {
    const ai = getGeminiClient(apiKey);
    const prompt = `
당신은 현대직업전문학교의 심리측정학 및 직업훈련 전문 상담교사입니다.
다음 훈련생의 H-LSIT(성인학습자 학습성향 진단도구) 검사 결과를 분석하고, 훈련교사용 종합 지도 소견 및 사후관리 가이드를 3~4문장의 전문적이고 정중한 한국어로 작성해주세요.

[훈련생 정보]
- 성명: ${traineeInfo?.name || "훈련생"}
- 훈련과정: ${traineeInfo?.courseName || "직업훈련과정"}
- 연령대: ${traineeInfo?.ageGroup || "성인"}
- 훈련목표: ${traineeInfo?.goalType || "취업"}
- 종합 점수: ${overallMean ? Number(overallMean).toFixed(2) : "3.50"} / 6.00점

[핵심 강점 요인]
${topStrengths?.map((s: any) => `- ${s.factorName} (${s.rawMean?.toFixed(2)}점): ${s.strengths}`).join("\n") || "정보 없음"}

[집중 성장 과제]
${growthAreas?.map((g: any) => `- ${g.factorName} (${g.rawMean?.toFixed(2)}점): ${g.cautions}`).join("\n") || "정보 없음"}

[작성 가이드라인]
1. 훈련생의 우수한 학습 강점을 먼저 칭찬하고 실습 프로젝트에서의 활용 방안을 제시하세요.
2. 성장 과제로 도출된 취약 요인을 직업훈련 현장(출결, 실습 에러 대처, 동료 협력 등)에서 보완할 수 있는 실천적 코칭 팁을 제안하세요.
3. 훈련교사 면담 및 포트폴리오 관리와 연계된 격려의 어조로 마무리해주세요.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      feedback: response.text || "상담 소견 생성 완료"
    });
  } catch (err: any) {
    console.error("Gemini feedback generation error:", err);
    res.status(500).json({
      success: false,
      error: err?.message || "AI 상담 소견 생성 중 오류가 발생했습니다."
    });
  }
});

// Vite middleware for dev or static serving for prod
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupViteOrStatic();

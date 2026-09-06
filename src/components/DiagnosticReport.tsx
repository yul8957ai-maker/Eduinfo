import React, { useState, useRef } from 'react';
import { DiagnosticResult, FactorScoreResult, FactorId } from '../types';
import { RadarChart } from './RadarChart';
import { downloadReportAsPdf, exportReportAsHtml } from '../utils/exportUtils';
import { useApiKeyAuth } from '../context/ApiKeyContext';
import { 
  Printer, 
  Award, 
  AlertTriangle, 
  Lightbulb, 
  UserCheck, 
  Share2, 
  Calendar, 
  User, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileEdit,
  FileDown,
  FileCode,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Sparkles
} from 'lucide-react';

interface DiagnosticReportProps {
  result: DiagnosticResult;
  onRetake: () => void;
}

export const DiagnosticReport: React.FC<DiagnosticReportProps> = ({ result, onRetake }) => {
  const [expandedFactor, setExpandedFactor] = useState<FactorId | null>(null);
  const [counselorFeedback, setCounselorFeedback] = useState<string>(
    result.counselorNotes || ''
  );
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const { customKey, isApproved, openModal } = useApiKeyAuth();

  const reportCardRef = useRef<HTMLDivElement>(null);

  const { traineeInfo, factorScores, overallMean, topStrengths, growthAreas, completedAt } = result;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!reportCardRef.current || isExportingPdf) return;
    setIsExportingPdf(true);
    setExportNotice(null);
    try {
      await downloadReportAsPdf(reportCardRef.current, traineeInfo.name);
      setExportNotice('A4 PDF 파일 저장이 성공적으로 완료되었습니다.');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.error('PDF generation error:', err);
      // Fallback to window.print() if canvas rendering is blocked
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportHtml = () => {
    try {
      exportReportAsHtml(result, counselorFeedback);
      setExportNotice('단일 실행형 HTML 결과표 저장이 완료되었습니다.');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.error('HTML export error:', err);
    }
  };

  const handleSaveFeedback = () => {
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  const handleGenerateAiFeedback = async () => {
    if (!isApproved) {
      openModal('AI 맞춤형 지도 소견을 생성하시려면 API Key 유효성 승인이 필요합니다.');
      return;
    }
    setIsGeneratingAi(true);
    setAiError(null);

    const activeKey = customKey || sessionStorage.getItem('h_lsit_custom_key') || '';

    // Pedagogical prompt
    const promptText = `당신은 현대직업전문학교의 심리측정학 및 직업훈련 전문 상담교사입니다.
다음 훈련생의 H-LSIT(성인학습자 학습성향 진단도구) 검사 결과를 분석하고, 훈련교사용 종합 지도 소견 및 사후관리 가이드를 3~4문장의 전문적이고 정중한 한국어로 작성해주세요.

[훈련생 정보]
- 성명: ${result.traineeInfo?.name || "훈련생"}
- 훈련과정: ${result.traineeInfo?.courseName || "직업훈련과정"}
- 연령대: ${result.traineeInfo?.ageGroup || "성인"}
- 훈련목표: ${result.traineeInfo?.goalType || "취업"}
- 종합 점수: ${result.overallMean ? Number(result.overallMean).toFixed(2) : "3.50"} / 6.00점

[핵심 강점 요인]
${result.topStrengths?.map((s) => `- ${s.factorName} (${s.rawMean?.toFixed(2)}점): ${s.strengths}`).join("\n") || "정보 없음"}

[집중 성장 과제]
${result.growthAreas?.map((g) => `- ${g.factorName} (${g.rawMean?.toFixed(2)}점): ${g.cautions}`).join("\n") || "정보 없음"}

[작성 가이드라인]
1. 훈련생의 우수한 학습 강점을 먼저 칭찬하고 실습 프로젝트에서의 활용 방안을 제시하세요.
2. 성장 과제로 도출된 취약 요인을 직업훈련 현장(출결, 실습 에러 대처, 동료 협력 등)에서 보완할 수 있는 실천적 코칭 팁을 제안하세요.
3. 훈련교사 면담 및 포트폴리오 관리와 연계된 격려의 어조로 마무리해주세요.`;

    try {
      // 1. Try server backend endpoint first
      let generatedText: string | null = null;
      try {
        const res = await fetch('/api/generate-counselor-notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            traineeInfo: result.traineeInfo,
            overallMean: result.overallMean,
            topStrengths: result.topStrengths,
            growthAreas: result.growthAreas,
            apiKey: activeKey,
          }),
        });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (res.ok && data.feedback) {
            generatedText = data.feedback;
          }
        }
      } catch {
        // Backend not available (e.g. Vercel static deployment)
      }

      // 2. If server didn't generate and we have a key, call Google Gemini directly
      if (!generatedText && activeKey) {
        const directUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(activeKey)}`;
        const directRes = await fetch(directUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });
        const directData = await directRes.json().catch(() => null);
        generatedText = directData?.candidates?.[0]?.content?.parts?.[0]?.text || null;
      }

      if (generatedText) {
        setCounselorFeedback(generatedText);
        setIsSavedFeedback(true);
        setTimeout(() => setIsSavedFeedback(false), 3000);
      } else {
        setAiError('AI 소견 생성에 실패했습니다. 유효한 API Key인지 확인해주세요.');
      }
    } catch (err: any) {
      console.error('AI generation error:', err);
      setAiError('AI 소견 생성 중 통신 오류가 발생했습니다.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'very_high':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'high':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'average':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'low':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'very_low':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const factorList = Object.values(factorScores) as FactorScoreResult[];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 print:p-0 print:space-y-6">
      {/* Top Actions Bar (Hidden on Print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-xl shadow-xs print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-slate-700">진단 채점 및 심리측정 프로파일 산출 완료</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* A4 PDF 저장 */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="A4 표준 규격 PDF 파일 다운로드"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>PDF 생성 중...</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>A4 PDF 저장</span>
              </>
            )}
          </button>

          {/* HTML 저장 */}
          <button
            type="button"
            onClick={handleExportHtml}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="독립 실행 가능한 단일 HTML 파일로 저장"
          >
            <FileCode className="w-3.5 h-3.5 text-blue-300" />
            <span>HTML 저장</span>
          </button>

          {/* 리포트 인쇄 */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="브라우저 인쇄 대화상자 열기 (Ctrl+P)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>A4 인쇄</span>
          </button>

          {/* 다시 진단하기 */}
          <button
            type="button"
            onClick={onRetake}
            className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>다시 진단</span>
          </button>
        </div>
      </div>

      {/* Export Success Notification Banner */}
      {exportNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl text-xs font-medium flex items-center justify-between shadow-2xs print:hidden animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{exportNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setExportNotice(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold cursor-pointer"
          >
            닫기
          </button>
        </div>
      )}

      {/* Official Trainee Diagnostic Report Card */}
      <div 
        ref={reportCardRef}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden print:border-none print:shadow-none"
      >
        {/* Report Institutional Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-blue-300 text-xs font-bold tracking-widest uppercase mb-1">
                <span>HYUNDAI VOCATIONAL TRAINING INSTITUTE</span>
                <span>•</span>
                <span>심리측정 정밀 리포트</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                학습성향 진단 결과표
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                현대직업전문학교 성인학습자 맞춤형 직업훈련 및 상담 가이드 리포트
              </p>
            </div>

            {/* Official Seal / Logo Badge Area */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/20 p-3.5 rounded-xl self-start sm:self-auto">
              <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-xl italic shadow-xs">
                H
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-white">현대직업전문학교</div>
                <div className="text-[11px] text-slate-300">인재개발상담센터 공인</div>
              </div>
            </div>
          </div>

          {/* Trainee Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4 mt-6 text-xs text-white">
            <div>
              <span className="text-slate-300 block text-[11px]">훈련생 성명</span>
              <span className="font-bold text-sm text-white">{traineeInfo.name || '미입력'}</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[11px]">소속 훈련과정</span>
              <span className="font-semibold text-slate-100 truncate block">{traineeInfo.courseName || '일반 직업훈련과정'}</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[11px]">연령대 / 목표</span>
              <span className="font-semibold text-slate-100">{traineeInfo.ageGroup} • {traineeInfo.goalType}</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[11px]">진단 시행일</span>
              <span className="font-semibold text-slate-100">{completedAt}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary & Visual Radar Profile */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Radar Chart Visualization */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-6">
              <div className="text-center mb-2">
                <h3 className="text-sm font-bold text-slate-900">8대 학습성향 레이더 프로파일</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  점선: 현대직업전문학교 표준 규준 (T=50) / 면적: 훈련생 점수
                </p>
              </div>
              <RadarChart factorScores={factorScores} size={420} />
            </div>

            {/* Right: Synthesis & Core Findings */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  종합 분석 진단평
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  전체 평균 <span className="text-blue-700 font-bold">{overallMean.toFixed(2)}점</span> (6점 만점)
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  훈련생 <strong>{traineeInfo.name}</strong> 님은 현대직업전문학교 직업훈련 환경에서{' '}
                  <strong className="text-slate-900">
                    {topStrengths.map(s => s.factorName).join(', ')}
                  </strong>{' '}
                  영역에서 높은 잠재력과 뛰어난 강점을 보이고 있으며,{' '}
                  <strong className="text-slate-900">
                    {growthAreas.map(g => g.factorName).join(', ')}
                  </strong>{' '}
                  영역의 체계적 보완을 통해 훈련 성과와 취업 경쟁력을 극대화할 수 있습니다.
                </p>
              </div>

              {/* Strengths Card */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>주요 학습 강점 요인 (Top 3)</span>
                </div>
                <div className="space-y-1.5">
                  {topStrengths.map((s, idx) => (
                    <div key={s.factorId} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        {idx + 1}. {s.factorName}
                      </span>
                      <span className="font-mono text-emerald-700 font-bold">
                        {s.rawMean.toFixed(2)}점 (T:{s.tScore}, 상위 {100 - s.percentile}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Areas Card */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>전략적 보완 및 관심 요인</span>
                </div>
                <div className="space-y-1.5">
                  {growthAreas.map((g) => (
                    <div key={g.factorId} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        • {g.factorName}
                      </span>
                      <span className="font-mono text-amber-800 font-bold">
                        {g.rawMean.toFixed(2)}점 (수준: {g.levelLabel})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Factor-by-Factor Score Metrics Table */}
          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              8대 요인별 세부 진단 결과표
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              * T점수는 평균 50, 표준편차 10 기준의 표준화 점수이며, 백분위는 동급 성인 훈련생 집단 내 상대적 위치를 나타냅니다.
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">요인명</th>
                    <th className="py-3.5 px-3 text-center">원점수 평균</th>
                    <th className="py-3.5 px-3 text-center">표준점수 (T)</th>
                    <th className="py-3.5 px-3 text-center">백분위 (%)</th>
                    <th className="py-3.5 px-3 text-center">진단 수준</th>
                    <th className="py-3.5 px-4">핵심 특징 요약</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {factorList.map((fs) => (
                    <tr key={fs.factorId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {fs.factorName}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-700">
                        {fs.rawMean.toFixed(2)} / 6.0
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-blue-700">
                        {fs.tScore}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        상위 {100 - fs.percentile}%
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getLevelBadgeClass(fs.level)}`}>
                          {fs.levelLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                        {fs.characteristics}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: In-Depth Profile Breakdown per Factor */}
          <div className="border-t border-slate-100 pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  요인별 심층 분석 및 맞춤형 학습전략
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  각 항목을 클릭하시면 훈련생 강점, 주의점, 추천 학습법 및 훈련교사 상담 팁을 확인하실 수 있습니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {factorList.map((fs) => {
                const isExpanded = expandedFactor === fs.factorId;
                return (
                  <div
                    key={fs.factorId}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFactor(isExpanded ? null : fs.factorId)}
                      className="w-full text-left p-4.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getLevelBadgeClass(fs.level)}`}>
                          {fs.levelLabel}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{fs.factorName}</span>
                          <span className="text-xs text-slate-500 ml-2 font-mono">
                            (원점수: {fs.rawMean.toFixed(2)} | T점수: {fs.tScore})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                          {isExpanded ? '접기' : '세부 전략 보기'}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Detailed Body */}
                    <div 
                      data-factor-details="true"
                      className={`p-5 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs ${isExpanded ? 'block' : 'hidden print:block'}`}
                    >
                      {/* Traits & Strengths & Cautions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                          <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            학습자 행동 특성
                          </div>
                          <p className="text-slate-600 leading-relaxed">{fs.characteristics}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-lg border border-emerald-200">
                          <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            훈련 현장 강점
                          </div>
                          <p className="text-slate-600 leading-relaxed">{fs.strengths}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-lg border border-amber-200">
                          <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            주의점 및 취약 상황
                          </div>
                          <p className="text-slate-600 leading-relaxed">{fs.cautions}</p>
                        </div>
                      </div>

                      {/* Strategies & Counselor Advice */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-lg">
                          <div className="font-bold text-blue-900 mb-1.5 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-blue-700" />
                            훈련생 맞춤 추천 학습전략
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
                            {fs.strategies.map((strat, sIdx) => (
                              <li key={sIdx}>{strat}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-100/80 border border-slate-300 p-3.5 rounded-lg">
                          <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-slate-700" />
                            현대직업전문학교 훈련교사 상담 팁
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
                            {fs.counselorTips.map((tip, tIdx) => (
                              <li key={tIdx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Counselor 1:1 Feedback Memo Field */}
          <div className="border-t border-slate-100 pt-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <FileEdit className="w-4 h-4 text-blue-700" />
                  <span>담임 훈련교사 1:1 상담 및 피드백 소견란</span>
                </div>
                <div className="flex items-center gap-2 print:hidden">
                  <button
                    type="button"
                    onClick={handleGenerateAiFeedback}
                    disabled={isGeneratingAi}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingAi ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>AI 소견 작성 중...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>✨ AI 소견 자동 생성</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveFeedback}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    {isSavedFeedback ? '저장되었습니다!' : '소견 메모 저장'}
                  </button>
                </div>
              </div>

              {aiError && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs print:hidden">
                  {aiError}
                </div>
              )}

              <textarea
                rows={3}
                value={counselorFeedback}
                onChange={(e) => setCounselorFeedback(e.target.value)}
                placeholder="담당 훈련교사의 관찰 소견, 면담 내용, 자격증 취득 및 프로젝트 조편성 관련 조언을 입력하세요. (인쇄 시 함께 출력됩니다)"
                className="w-full p-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 leading-relaxed"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-medium">
                <span>상담 교사: ________________ (인)</span>
                <span>훈련생 확인: ________________ (인)</span>
              </div>
            </div>
          </div>

          {/* Institutional Certification Footer */}
          <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500 space-y-1">
            <p className="font-bold text-slate-800">
              현대직업전문학교 직업능력개발원 • 인재개발상담센터
            </p>
            <p className="text-[11px]">
              본 진단도구는 성인학습이론, 자기조절학습, 사회인지이론 및 현대직업전문학교의 실무 훈련 환경을 기반으로 개발되었습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

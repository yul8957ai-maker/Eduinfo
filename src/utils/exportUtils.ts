import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DiagnosticResult, FactorScoreResult } from '../types';
import { FACTORS } from '../data/diagnosticFramework';

/**
 * Generates and downloads a multi-page A4 PDF using html2canvas & jsPDF.
 */
export async function downloadReportAsPdf(
  reportElement: HTMLElement,
  traineeName: string = '훈련생'
): Promise<void> {
  const cleanName = (traineeName || '훈련생').trim().replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const fileName = `현대직업전문학교_학습성향진단결과_${cleanName}_${dateStr}.pdf`;

  // Temporarily force all collapsible details open for export
  document.body.classList.add('exporting-pdf');

  try {
    // Render the report element into high-resolution canvas (2x)
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1080,
    });

    // Standard A4 specs in mm
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidthMm = 210;
    const pageHeightMm = 297;
    const marginMm = 10;
    const printableWidthMm = pageWidthMm - marginMm * 2; // 190mm
    const printableHeightMm = pageHeightMm - marginMm * 2; // 277mm

    // Calculate canvas pixel height corresponding to one A4 printable page
    const pageCanvasHeightPx = Math.floor((canvas.width * printableHeightMm) / printableWidthMm);

    let renderedPx = 0;
    let pageIndex = 0;

    while (renderedPx < canvas.height) {
      const sliceHeightPx = Math.min(pageCanvasHeightPx, canvas.height - renderedPx);

      // Create a temporary canvas for this page slice
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;
      const ctx = pageCanvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          renderedPx,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          canvas.width,
          sliceHeightPx
        );
      }

      const imgData = pageCanvas.toDataURL('image/png');
      const sliceHeightMm = (sliceHeightPx * printableWidthMm) / canvas.width;

      if (pageIndex > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'PNG', marginMm, marginMm, printableWidthMm, sliceHeightMm);

      renderedPx += sliceHeightPx;
      pageIndex++;
    }

    pdf.save(fileName);
  } finally {
    document.body.classList.remove('exporting-pdf');
  }
}

/**
 * Exports the complete diagnostic report as a standalone, self-contained HTML file.
 */
export function exportReportAsHtml(
  result: DiagnosticResult,
  counselorFeedback: string = ''
): void {
  const { traineeInfo, factorScores, overallMean, topStrengths, growthAreas, completedAt } = result;
  const cleanName = (traineeInfo.name || '훈련생').trim().replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const fileName = `현대직업전문학교_학습성향진단결과_${cleanName}_${dateStr}.html`;

  const factorList = Object.values(factorScores) as FactorScoreResult[];

  // Compute SVG radar chart elements
  const radarSvg = generateRadarSvgString(factorScores);

  // Build HTML string
  const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[현대직업전문학교] 학습성향 진단 결과표 - ${escapeHtml(traineeInfo.name || '훈련생')}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800&display=swap');
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 10mm 10mm 12mm 10mm;
      }
      body {
        background-color: #ffffff !important;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-before: always;
      }
      .page-break-inside-avoid {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body class="p-4 sm:p-8">
  <div class="max-w-4xl mx-auto space-y-6">

    <!-- Top Action Toolbar (Hidden during print) -->
    <div class="no-print bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
        <span class="text-xs font-bold text-slate-700">현대직업전문학교 H-LSIT 정밀 심리측정 결과 저장본</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          onclick="window.print()"
          class="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          🖨️ A4 인쇄 / PDF 저장 (Ctrl+P)
        </button>
        <button
          onclick="window.close()"
          class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          창 닫기
        </button>
      </div>
    </div>

    <!-- Official Report Card Container -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden print:border-none print:shadow-none">
      
      <!-- Institutional Header -->
      <div class="bg-slate-900 text-white p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-blue-300 text-xs font-bold tracking-widest uppercase mb-1">
              <span>HYUNDAI VOCATIONAL TRAINING INSTITUTE</span>
              <span>•</span>
              <span>심리측정 정밀 리포트</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">학습성향 진단 결과표</h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-1">현대직업전문학교 성인학습자 맞춤형 직업훈련 및 상담 가이드 리포트</p>
          </div>
          <div class="flex items-center gap-3 bg-white/10 border border-white/20 p-3.5 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-xl italic">
              H
            </div>
            <div class="text-left text-xs">
              <div class="font-bold text-white">현대직업전문학교</div>
              <div class="text-[11px] text-slate-300">인재개발상담센터 공인</div>
            </div>
          </div>
        </div>

        <!-- Trainee Meta Bar -->
        <div class="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span class="text-slate-400 block text-[11px]">훈련생 성명</span>
            <span class="font-bold text-white text-sm">${escapeHtml(traineeInfo.name || '홍길동')}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">훈련 과정명</span>
            <span class="font-bold text-white truncate block">${escapeHtml(traineeInfo.courseName || '직업훈련과정')}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">연령대 / 훈련목표</span>
            <span class="font-bold text-white">${escapeHtml(traineeInfo.ageGroup || '성인')} / ${escapeHtml(traineeInfo.goalType || '취업')}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">진단 완료 일시</span>
            <span class="font-bold text-white font-mono">${escapeHtml(completedAt || traineeInfo.testDate)}</span>
          </div>
        </div>
      </div>

      <!-- Report Body -->
      <div class="p-6 sm:p-8 space-y-8">

        <!-- Summary & Radar Chart Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Chart -->
          <div class="lg:col-span-6 flex flex-col items-center justify-center bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
            <div class="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between w-full px-2">
              <span>8대 학습성향 다차원 역량 프로파일</span>
              <span class="text-[11px] font-mono text-slate-500">6점 척도 (규준 평균 대비)</span>
            </div>
            ${radarSvg}
            <div class="flex items-center gap-4 text-[11px] text-slate-600 mt-2">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-blue-700"></span>
                <span class="font-semibold text-slate-800">훈련생 프로파일</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-slate-400"></span>
                <span>표준 규준 평균</span>
              </div>
            </div>
          </div>

          <!-- Summary Stats -->
          <div class="lg:col-span-6 space-y-5">
            <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-5">
              <div class="text-xs font-bold text-blue-900 mb-1 uppercase tracking-wider">
                COMPREHENSIVE LEARNING INDEX
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-extrabold text-blue-700 font-mono">${overallMean.toFixed(2)}</span>
                <span class="text-sm font-semibold text-slate-500">/ 6.00점</span>
              </div>
              <p class="text-xs text-slate-700 mt-2 leading-relaxed">
                현대직업전문학교 성인 훈련생 규준 데이터베이스 분석 결과, 
                전체적인 학습 준비도와 실습 수행 의지 수준이 
                <strong>${overallMean >= 4.5 ? '매우 우수한 상태' : overallMean >= 3.8 ? '양호한 수준' : '집중 보완 및 상담이 필요한 상태'}</strong>로 진단되었습니다.
              </p>
            </div>

            <!-- Top Strengths -->
            <div class="space-y-2">
              <div class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>🌟 핵심 강점 요인 (Top Strengths)</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${topStrengths.map(s => `
                  <div class="p-3 rounded-lg border border-emerald-200 bg-emerald-50/40 text-xs">
                    <div class="flex items-center justify-between font-bold text-emerald-950">
                      <span>${escapeHtml(s.factorName)}</span>
                      <span class="font-mono text-emerald-700">${s.rawMean.toFixed(2)}점</span>
                    </div>
                    <p class="text-[11px] text-emerald-900 mt-1 truncate">${escapeHtml(s.strengths)}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Growth Areas -->
            <div class="space-y-2">
              <div class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>🎯 집중 성장 과제 (Growth Priority)</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${growthAreas.map(g => `
                  <div class="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs">
                    <div class="flex items-center justify-between font-bold text-amber-950">
                      <span>${escapeHtml(g.factorName)}</span>
                      <span class="font-mono text-amber-700">${g.rawMean.toFixed(2)}점</span>
                    </div>
                    <p class="text-[11px] text-amber-900 mt-1 truncate">${escapeHtml(g.cautions)}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- 8 Factors Table -->
        <div class="border-t border-slate-100 pt-6 page-break-inside-avoid">
          <h3 class="text-base font-bold text-slate-900 mb-3">8대 하위요인 심리측정 표준 점수표</h3>
          <div class="overflow-x-auto border border-slate-200 rounded-xl">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th class="py-2.5 px-3">측정 요인</th>
                  <th class="py-2.5 px-3 text-center">원점수 (1~6)</th>
                  <th class="py-2.5 px-3 text-center">T점수 (50±10)</th>
                  <th class="py-2.5 px-3 text-center">백분위 (%)</th>
                  <th class="py-2.5 px-3 text-center">수준</th>
                  <th class="py-2.5 px-3">핵심 행동 특성 요약</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-slate-700">
                ${factorList.map(fs => `
                  <tr>
                    <td class="py-2.5 px-3 font-bold text-slate-900">
                      ${escapeHtml(fs.factorName)}
                    </td>
                    <td class="py-2.5 px-3 text-center font-mono font-bold text-blue-700">${fs.rawMean.toFixed(2)}</td>
                    <td class="py-2.5 px-3 text-center font-mono">${fs.tScore}</td>
                    <td class="py-2.5 px-3 text-center font-mono">${fs.percentile}%</td>
                    <td class="py-2.5 px-3 text-center">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${getLevelBadgeStyle(fs.level)}">
                        ${escapeHtml(fs.levelLabel)}
                      </span>
                    </td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">${escapeHtml(fs.characteristics)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Detailed Factor Breakdown Cards -->
        <div class="border-t border-slate-100 pt-6 space-y-4">
          <h3 class="text-base font-bold text-slate-900">요인별 심층 분석 및 맞춤형 학습전략</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${factorList.map(fs => `
              <div class="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 page-break-inside-avoid text-xs">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-900 text-sm">${escapeHtml(fs.factorName)}</span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${getLevelBadgeStyle(fs.level)}">
                      ${escapeHtml(fs.levelLabel)}
                    </span>
                  </div>
                  <span class="font-mono text-slate-500 font-bold text-[11px]">${fs.rawMean.toFixed(2)}점</span>
                </div>

                <div class="space-y-1.5">
                  <p class="text-slate-700 leading-relaxed font-medium">${escapeHtml(fs.characteristics)}</p>
                </div>

                <div class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span class="font-bold text-emerald-900 block text-[11px] mb-0.5">강점 및 기회:</span>
                  <p class="text-emerald-800 text-[11px] leading-relaxed">${escapeHtml(fs.strengths)}</p>
                </div>

                <div class="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                  <span class="font-bold text-amber-900 block text-[11px] mb-0.5">잠재적 저해요인 / 주의점:</span>
                  <p class="text-amber-800 text-[11px] leading-relaxed">${escapeHtml(fs.cautions)}</p>
                </div>

                <div>
                  <span class="font-bold text-blue-900 block text-[11px] mb-1">추천 맞춤형 학습법:</span>
                  <ul class="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    ${fs.strategies.map(st => `<li>${escapeHtml(st)}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Counselor Consultation Section -->
        <div class="border-t border-slate-100 pt-6 page-break-inside-avoid">
          <h3 class="text-base font-bold text-slate-900 mb-3">훈련교사 전문 소견 및 사후관리 기록</h3>
          <div class="p-5 border border-slate-200 rounded-xl bg-slate-50/60 space-y-3">
            <p class="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
              ${escapeHtml(counselorFeedback || '훈련생과의 1차 진단 면담을 완료하였으며, 도출된 강점 요인을 기반으로 실습 프로젝트 리더십을 부여하고, 성장 과제 요인에 대해서는 단계별 목표 설정 및 주간 피드백 세션을 운영할 계획입니다.')}
            </p>
            <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-700">담당 훈련교사:</span>
                <span>현대직업전문학교 지도교사</span>
              </div>
              <div class="flex items-center gap-4">
                <span>상담 확인일: ${escapeHtml(new Date().toISOString().slice(0, 10))}</span>
                <span class="font-serif italic font-bold text-slate-700">[ 서명 / 날인 ]</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Official Institutional Seal Footer -->
        <div class="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
          <p class="font-bold text-slate-700">현대직업전문학교 인재개발상담센터</p>
          <p class="text-[11px]">본 진단 결과표는 과학적 심리측정학 원리에 의해 산출된 공식 직업훈련 지도용 자료입니다.</p>
        </div>

      </div>
    </div>
  </div>
</body>
</html>`;

  // Trigger HTML file download
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates an SVG string representation of the 8-axis radar chart.
 */
function generateRadarSvgString(factorScores: Record<string, FactorScoreResult>): string {
  const size = 420;
  const center = size / 2;
  const radius = 145;
  const totalAxes = FACTORS.length; // 8
  const levels = [1, 2, 3, 4, 5, 6];

  const getCoordinates = (index: number, value: number, maxVal = 6) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Background Web
  const webPaths = levels.map(level => {
    const pts = FACTORS.map((_, idx) => {
      const pt = getCoordinates(idx, level);
      return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }).join(' ') + ' Z';
    return `<path d="${pts}" fill="${level % 2 === 0 ? '#f8fafc' : '#ffffff'}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="${level === 6 ? 'none' : '2,2'}"/>`;
  }).join('');

  // Axis Lines
  const axisLines = FACTORS.map((_, idx) => {
    const outer = getCoordinates(idx, 6);
    return `<line x1="${center}" y1="${center}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}" stroke="#cbd5e1" stroke-width="1.2"/>`;
  }).join('');

  // Norm Baseline Polygon
  const normPts = FACTORS.map((factor, idx) => {
    const pt = getCoordinates(idx, factor.mean);
    return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }).join(' ') + ' Z';
  const normSvg = `<path d="${normPts}" fill="#94a3b8" fill-opacity="0.12" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,3"/>`;

  // Trainee Score Polygon
  const traineePts = FACTORS.map((factor, idx) => {
    const score = factorScores[factor.id]?.rawMean || 3;
    const pt = getCoordinates(idx, score);
    return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }).join(' ') + ' Z';
  const traineeSvg = `<path d="${traineePts}" fill="#2563eb" fill-opacity="0.25" stroke="#1d4ed8" stroke-width="2.5"/>`;

  // Vertex Markers
  const markers = FACTORS.map((factor, idx) => {
    const score = factorScores[factor.id]?.rawMean || 3;
    const pt = getCoordinates(idx, score);
    return `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>`;
  }).join('');

  // Factor Labels around perimeter
  const labels = FACTORS.map((factor, idx) => {
    const outer = getCoordinates(idx, 6.7);
    const score = factorScores[factor.id]?.rawMean || 3;
    return `<text x="${outer.x.toFixed(1)}" y="${outer.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="10" font-weight="700" fill="#1e293b">${escapeHtml(factor.name)} (${score.toFixed(1)})</text>`;
  }).join('');

  return `
    <svg viewBox="0 0 ${size} ${size}" class="w-full max-w-[380px] h-auto overflow-visible select-none">
      <g>${webPaths}</g>
      <g>${axisLines}</g>
      ${normSvg}
      ${traineeSvg}
      <g>${markers}</g>
      <g>${labels}</g>
    </svg>
  `;
}

function getLevelBadgeStyle(level: string): string {
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
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

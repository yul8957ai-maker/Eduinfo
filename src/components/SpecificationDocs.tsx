import React, { useState } from 'react';
import { FACTORS, QUESTIONS } from '../data/diagnosticFramework';
import { BookOpen, CheckCircle, Search, Layers, FileSpreadsheet, ShieldAlert, Cpu, Award } from 'lucide-react';

export const SpecificationDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [questionSearch, setQuestionSearch] = useState('');

  const sections = [
    { num: 1, id: 'reason', title: '1. 개발 이유' },
    { num: 2, id: 'theory', title: '2. 이론적 근거' },
    { num: 3, id: 'structure', title: '3. 진단구조 표' },
    { num: 4, id: 'items', title: '4. 문항 표' },
    { num: 5, id: 'scoring', title: '5. 채점방법' },
    { num: 6, id: 'interpretation', title: '6. 결과 해석' },
    { num: 7, id: 'counseling', title: '7. 상담 활용법' },
    { num: 8, id: 'validation', title: '8. 타당화 계획' },
    { num: 9, id: 'future', title: '9. 향후 개선 제안' }
  ];

  const filteredQuestions = QUESTIONS.filter(q => 
    q.text.toLowerCase().includes(questionSearch.toLowerCase()) ||
    q.intention.toLowerCase().includes(questionSearch.toLowerCase()) ||
    FACTORS.find(f => f.id === q.factorId)?.name.includes(questionSearch)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs tracking-widest uppercase mb-1">
          <span>HYUNDAI VOCATIONAL TRAINING INSTITUTE</span>
          <span>•</span>
          <span>공식 심리측정 표준 규격서</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          학습성향 진단도구 심리측정학적 개발 명세서
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          본 명세서는 현대직업전문학교의 의뢰에 따라 20년 이상 경력의 심리측정(Psychometrics) 및 교육심리학 전문가 자문을 거쳐 설계된 직업훈련 성인학습자 진단도구(H-LSIT)의 공식 개발 보고서입니다.
        </p>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto mt-6 pt-4 border-t border-slate-100 no-scrollbar">
          {sections.map((sec) => (
            <button
              key={sec.num}
              type="button"
              onClick={() => setActiveSection(sec.num)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.num
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area Based on Active Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* 1. 개발 이유 */}
        {activeSection === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">1.</span> 개발 이유 (Development Rationale)
            </h2>
            <div className="prose prose-slate text-xs sm:text-sm leading-relaxed text-slate-700 space-y-3">
              <p>
                현대직업전문학교는 고용노동부 및 직업능력심사평가원의 지침에 따라 국가기간·전략산업직종훈련, K-디지털 트레이닝(KDT), 신중년 재취업과정, 재직자 직무능력향상과정 등 다양한 성인 직업교육을 운영하고 있습니다. 그러나 최근 직업훈련 현장에서는 다음과 같은 중대한 현장 과제가 대두되었습니다:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>훈련생 배경의 극심한 다양성:</strong> 20대 청년 초보자부터 40~50대 중장년 경력전환자, 비전공 인문계 출신부터 이공계 실무자까지 동일한 학급에 혼재되어 단일화된 강의식 교수법으로는 개인차를 극복하기 어려움.
                </li>
                <li>
                  <strong>단기 고밀도 훈련의 조기 중도탈락 위험:</strong> 3~6개월 동안 매일 8시간에 달하는 실습과 프로젝트, 자격증 시험을 소화해야 하는 국비 훈련 특성상, 훈련 3~4주 차에 학습 정체와 슬럼프를 겪는 훈련생의 중도탈락률이 기관 평가와 취업률에 치명적인 영향을 미침.
                </li>
                <li>
                  <strong>훈련교사의 정량적 상담 도구 부재:</strong> 교사 개인의 주관적 감이나 출결만으로 학생을 파악하다 보니, 내성적이거나 체면을 중시하여 질문하지 못하는 성인 학습자의 학습 결손을 조기에 포착하지 못함.
                </li>
              </ul>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mt-4">
                <p className="font-semibold text-slate-800 mb-1">
                  💡 본 도구의 도입 기대효과
                </p>
                <p className="text-slate-600">
                  입과 첫 주 진단을 통해 훈련생 개인의 8가지 다차원 학습성향을 수치화하고, 과학적 레이더 프로파일을 산출하여 <strong>① 중도탈락 고위험군 조기 스크리닝</strong>, <strong>② 1:1 진로·학습 클리닉 맞춤 처방</strong>, <strong>③ 조별 프로젝트 팀 밸런싱</strong>을 즉시 구현합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. 이론적 근거 */}
        {activeSection === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">2.</span> 이론적 근거 (Theoretical Foundations)
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>
                본 진단도구는 현대직업전문학교의 성인 직업훈련 특수성을 반영하기 위해 현대 교육심리학 및 심리측정학의 6대 핵심 이론을 정밀하게 융합하여 설계되었습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    1. 성인학습이론 (Andragogy - Knowles)
                  </h3>
                  <p className="text-xs text-slate-600">
                    성인학습자는 아동과 달리 자율적 자기주도성과 풍부한 인생 경험을 바탕으로, 즉각적인 현실 직무 문제 해결(취업/자격증)에 직결되는 기술을 배울 때 가장 높은 학습 동기를 형성합니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    2. 자기결정성이론 (SDT - Deci & Ryan)
                  </h3>
                  <p className="text-xs text-slate-600">
                    훈련생의 자율성(Autonomy), 유능감(Competence), 관계성(Relatedness) 충족 여부가 수료 후 취업 의지와 훈련 지속성을 지탱하는 근원적 심리 기제로 작동합니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    3. 자기조절학습이론 (SRL - Zimmerman & Pintrich)
                  </h3>
                  <p className="text-xs text-slate-600">
                    계획(Forethought) → 실행/모니터링(Performance) → 자기성찰(Self-Reflection)의 3단계 순환 루프가 고난도 실기 기자재 운용 및 소프트웨어 코딩 실습의 성패를 가릅니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    4. 사회인지이론 및 자기효능감 (Bandura)
                  </h3>
                  <p className="text-xs text-slate-600">
                    "내가 이 기술을 배워 취업할 수 있다"는 구체적 직무 효능감(Vocational Self-Efficacy)과 적응적 도움요청 행동이 슬럼프와 기술 장벽을 돌파하게 만듭니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    5. 목표지향성이론 (Achievement Goal Theory - Elliot)
                  </h3>
                  <p className="text-xs text-slate-600">
                    단순히 타인과의 점수 비교(수행목표)에 매몰되기보다, 실질적 산업 기술을 깊이 있게 체득하려는 '숙달목표(Mastery Goals)' 지향 훈련생이 현장 실무형 인재로 성장합니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                    6. 성장마인드셋 (Growth Mindset - Dweck)
                  </h3>
                  <p className="text-xs text-slate-600">
                    실습 에러와 모의평가 탈락을 ‘재능의 한계’가 아닌 ‘기술 숙련을 위한 정상적인 피드백 루프’로 재해석하는 인지적 회복탄력성을 지지합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. 진단구조 표 */}
        {activeSection === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">3.</span> 진단구조 표 (8 Dimensions Specification)
            </h2>
            <p className="text-xs text-slate-600">
              현대직업전문학교 직업훈련에 최적화된 8개 하위요인의 정의, 현장 직업훈련 맥락에서의 핵심 중요성 및 학술적 기반 이론 매핑입니다.
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3.5 w-24">요인명</th>
                    <th className="py-3 px-3.5 w-56">정의</th>
                    <th className="py-3 px-3.5">현대직업전문학교 직업훈련에서 중요한 이유</th>
                    <th className="py-3 px-3.5 w-44">관련 심리이론</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {FACTORS.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-3.5 font-bold text-slate-900">
                        {f.name}
                        <span className="block text-[10px] text-slate-600 font-normal font-mono">{f.nameEn}</span>
                      </td>
                      <td className="py-3 px-3.5 leading-relaxed">{f.definition}</td>
                      <td className="py-3 px-3.5 leading-relaxed text-blue-950 bg-blue-50/20">{f.vocationalImportance}</td>
                      <td className="py-3 px-3.5 text-slate-600">{f.relatedTheory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. 문항 표 */}
        {activeSection === 4 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-blue-700">4.</span> 문항 표 (Item Inventory: 총 48문항)
              </h2>
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="문항, 요인, 측정의도 검색..."
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-700 w-56"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>총 48문항 (8개 요인 × 6문항, 정방향 32문항 / 역문항 16문항 [역문항 비율 33.3%])</span>
              <span className="font-semibold text-blue-800">6점 Likert 척도 적용</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 text-center w-12">번호</th>
                    <th className="py-3 px-4">문항 내용</th>
                    <th className="py-3 px-3 text-center w-24">요인</th>
                    <th className="py-3 px-3 text-center w-20">정/역방향</th>
                    <th className="py-3 px-4 w-64">측정 의도</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {filteredQuestions.map((q) => {
                    const factor = FACTORS.find(f => f.id === q.factorId);
                    return (
                      <tr key={q.id} className="hover:bg-slate-50/70">
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500">
                          {q.id}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-slate-900">
                          {q.text}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                            {factor?.name}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            q.isReverse 
                              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {q.isReverse ? '역방향(부정)' : '정방향'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 text-[11px]">
                          {q.intention}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. 채점방법 */}
        {activeSection === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">5.</span> 채점방법 (Scoring & Metric Standard)
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h3 className="font-bold text-slate-900 text-xs">① 응답 척도 및 역문항 변환</h3>
                  <p className="text-xs text-slate-600">
                    6점 리커트(Likert) 척도: 1점(전혀 아님) ~ 6점(매우 그러함).<br/>
                    <strong>역문항 역코딩 수식:</strong><br/>
                    <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-900 font-mono">
                      Scored_Item = 7 - Raw_Response
                    </code><br/>
                    (예: 역문항에 1점 응답 시 6점으로 자동 치환)
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h3 className="font-bold text-slate-900 text-xs">② 요인별 원점수 평균 산출</h3>
                  <p className="text-xs text-slate-600">
                    각 요인에 배정된 6문항의 점수를 합산 후 문항 수(6)로 나눔:<br/>
                    <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-900 font-mono">
                      Raw_Mean = Σ(Scored_Item) / 6
                    </code><br/>
                    (산출 범위: 1.00점 ~ 6.00점)
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h3 className="font-bold text-slate-900 text-xs">③ 규준 기반 표준화 (T점수 & 백분위)</h3>
                  <p className="text-xs text-slate-600">
                    현대직업전문학교 성인 훈련생 표본 규준(Norm) 기준:<br/>
                    <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-900 font-mono">
                      Z = (Raw_Mean - Norm_Mean) / Norm_SD
                    </code><br/>
                    <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-900 font-mono">
                      T = 50 + 10 × Z
                    </code><br/>
                    (평균 50, 표준편차 10의 표준점수 환산)
                  </p>
                </div>
              </div>

              {/* Level Benchmark Table */}
              <div className="pt-2">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  5단계 임시 해석 기준 표 (Norm-Referenced Benchmark)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">진단 수준</th>
                        <th className="py-2.5 px-4">원점수 평균 기준</th>
                        <th className="py-2.5 px-4">T점수 환산</th>
                        <th className="py-2.5 px-4">상대적 백분위 구간</th>
                        <th className="py-2.5 px-4">훈련 현장 임상적 의미</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-rose-700">매우 낮음</td>
                        <td className="py-2.5 px-4 font-mono">2.5점 미만</td>
                        <td className="py-2.5 px-4 font-mono">T &lt; 35</td>
                        <td className="py-2.5 px-4">하위 7% 이내</td>
                        <td className="py-2.5 px-4">집중 관리 및 즉각적 교사 개입 필요</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-amber-700">낮음</td>
                        <td className="py-2.5 px-4 font-mono">2.5점 ~ 3.49점</td>
                        <td className="py-2.5 px-4 font-mono">35 ≤ T &lt; 45</td>
                        <td className="py-2.5 px-4">하위 8% ~ 30%</td>
                        <td className="py-2.5 px-4">잠재적 보완 요인, 실습 가이드라인 제공</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-700">보통</td>
                        <td className="py-2.5 px-4 font-mono">3.5점 ~ 4.49점</td>
                        <td className="py-2.5 px-4 font-mono">45 ≤ T &lt; 55</td>
                        <td className="py-2.5 px-4">중위 31% ~ 69%</td>
                        <td className="py-2.5 px-4">일반적인 수준, 정규 과정 성실 이수</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-emerald-700">높음</td>
                        <td className="py-2.5 px-4 font-mono">4.5점 ~ 5.39점</td>
                        <td className="py-2.5 px-4 font-mono">55 ≤ T &lt; 65</td>
                        <td className="py-2.5 px-4">상위 70% ~ 92%</td>
                        <td className="py-2.5 px-4">우수한 잠재력, 자율 학습 및 심화 과제 부여</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-blue-700">매우 높음</td>
                        <td className="py-2.5 px-4 font-mono">5.4점 이상</td>
                        <td className="py-2.5 px-4 font-mono">T ≥ 65</td>
                        <td className="py-2.5 px-4">상위 93% 이상</td>
                        <td className="py-2.5 px-4">최상위 강점 요인, 조장/멘토 추천 및 대회 출품</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. 결과 해석 */}
        {activeSection === 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">6.</span> 결과 해석 (Individual Profile Interpretation)
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>
                훈련생의 진단 결과는 특정 요인의 단순한 고저(High/Low)보다 <strong>8개 요인 간의 상대적 프로파일 패턴과 상호작용</strong>을 종합적으로 조망해야 합니다.
              </p>

              <div className="space-y-3">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <h3 className="font-bold text-slate-900 text-xs mb-1">
                    🔍 레이더 차트의 형태학적 분석 (Morphological Analysis)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    - <strong>정팔각형 균형형:</strong> 모든 영역이 고르게 발달한 전인적 학습자. 자격증 취득과 프로젝트 모두 안정적이나, 특별한 개성을 살려 취업 포트폴리오의 엣지(Edge)를 만들어줄 필요가 있음.<br/>
                    - <strong>좌측 편향형 (개인 중심: 목표/조절/지속/실천 우수):</strong> 개인 역량과 손기술은 뛰어나나 협업과 질문이 결여되어 독선으로 흐를 수 있음. 팀워크 훈련 집중.<br/>
                    - <strong>우측 편향형 (관계 중심: 협력/도움 우수):</strong> 친화력과 팀 분위기는 좋으나 개인적인 이론 복습과 뚝심 있는 문제 해결 끈기가 부족할 수 있음. 개인 과제 집중 점검.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <h3 className="font-bold text-slate-900 text-xs mb-1">
                    ⚠️ 중장년 경력전환자 특화 해석 시 주의사항
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    40~50대 중장년 훈련생의 경우 사회적 체면과 이전 경력의 자존심으로 인해 <strong>[도움요청성]</strong>과 <strong>[자신감]</strong> 척도가 통계적으로 낮게 형성되는 '가면 증후군(Imposter Syndrome)'이 빈번히 발생합니다. 이는 실제 지적 능력이 부족한 것이 아니라 평가 불안과 세대 차이에 기인하므로, 교사가 먼저 조용히 다가가 질문을 유도하는 온정적 개입이 필수적입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. 상담 활용법 */}
        {activeSection === 7 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">7.</span> 상담 활용법 (Counseling & Teaching Intervention)
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>
                현대직업전문학교 훈련교사가 실제 상담 현장에서 본 진단 리포트를 활용하는 표준 4단계 프로토콜(GROW 모델 연계)입니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/60">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-700 text-white">
                    단계 1. 탐색 & 라포 형성 (Goal & Rapport)
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-2 mb-1">
                    강점(Top 3) 먼저 지지하기
                  </h3>
                  <p className="text-xs text-slate-600">
                    리포트를 펼치자마자 부족한 점을 지적하지 마십시오. T점수가 가장 높은 강점 요인(예: 실천성, 성찰성)을 칭찬하며 "00씨는 손기술 감각과 복습 태도가 매우 훌륭합니다"로 면담을 시작하여 심리적 안정감을 조성합니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/60">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-700 text-white">
                    단계 2. 현실 점검 (Reality Check)
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-2 mb-1">
                    훈련생 자신의 언어로 이야기하게 하기
                  </h3>
                  <p className="text-xs text-slate-600">
                    "최근 실습하면서 가장 힘든 순간이 언제였나요?", "Q32번 문항처럼 모르는 게 나왔을 때 질문하기 망설여진 적이 있나요?" 등 문항을 매개체로 솔직한 고백을 이끌어냅니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/60">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-700 text-white">
                    단계 3. 대안 탐색 (Options)
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-2 mb-1">
                    맞춤형 학습전략 공동 합의
                  </h3>
                  <p className="text-xs text-slate-600">
                    리포트에 제시된 [추천 학습전략] 중 훈련생이 이번 주에 당장 실천해볼 수 있는 1~2개 액션 플랜(예: 매일 오답 노트 3줄 쓰기, 30분 막히면 무조건 교사 부르기)을 상호 합의합니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/60">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-700 text-white">
                    단계 4. 실행 약속 및 사후관리 (Will & Follow-up)
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-2 mb-1">
                    상담 소견 메모 및 서명
                  </h3>
                  <p className="text-xs text-slate-600">
                    리포트 하단 상담 소견란에 교사의 코멘트를 작성하고 2주 뒤 마일스톤 점검 약속을 잡습니다. 이 기록은 취업지원실 취업 매칭 시 기업 추천서 근거로 유용하게 연계됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. 타당화 계획 */}
        {activeSection === 8 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">8.</span> 타당화 계획 (Psychometric Validation Strategy)
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>
                진단도구의 신뢰도와 타당도를 학술적 표준에 맞추어 검증하기 위한 5단계 연구 설계 및 현대직업전문학교의 실제 표본 확보 방안입니다.
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3.5">검토 항목</th>
                      <th className="py-2.5 px-3.5">필요 표본 수</th>
                      <th className="py-2.5 px-3.5">분석 방법 및 판정 기준</th>
                      <th className="py-2.5 px-3.5">현대직업전문학교 현실적 확보 방안</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="py-2.5 px-3.5 font-bold">내용타당도 (CVI)</td>
                      <td className="py-2.5 px-3.5">전문가 7~10인</td>
                      <td className="py-2.5 px-3.5">I-CVI &ge; 0.78, S-CVI/Ave &ge; 0.90 (4점 척도 평가)</td>
                      <td className="py-2.5 px-3.5">본교 수석 훈련교사 5인 + 외부 직업능력개발원 교수 3인 델파이 패널 구성</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-bold">안면타당도</td>
                      <td className="py-2.5 px-3.5">훈련생 20~30명</td>
                      <td className="py-2.5 px-3.5">심층 인터뷰 및 인지적 반응 인터뷰(Think-aloud)</td>
                      <td className="py-2.5 px-3.5">개강 첫 주 신입 훈련생 대상 파일럿 테스트 및 어휘 난이도 수정</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-bold">탐색적 요인분석 (EFA)</td>
                      <td className="py-2.5 px-3.5">N = 250~300명</td>
                      <td className="py-2.5 px-3.5">주축요인추출법(PAF), 사각회전(Promax), 요인적재치 &ge; 0.40</td>
                      <td className="py-2.5 px-3.5">상반기 개설 10~12개 학급 전체 훈련생 입과 전수 설문으로 수집</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-bold">확인적 요인분석 (CFA)</td>
                      <td className="py-2.5 px-3.5">N = 300~400명 (교차타당화)</td>
                      <td className="py-2.5 px-3.5">CFI, TLI &ge; 0.90, RMSEA &le; 0.08, SRMR &le; 0.08</td>
                      <td className="py-2.5 px-3.5">하반기 신규 개설 과정 훈련생 데이터를 통해 구조방정식 모형 적합도 검증</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-bold">신뢰도 계수</td>
                      <td className="py-2.5 px-3.5">N &ge; 200명</td>
                      <td className="py-2.5 px-3.5">Cronbach's α &ge; 0.70, McDonald's ω &ge; 0.75</td>
                      <td className="py-2.5 px-3.5">단위별 평가 데이터와 자동 연동하여 요인별 내적 합치도 상시 모니터링</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-bold">문항반응이론 (IRT)</td>
                      <td className="py-2.5 px-3.5">N &ge; 500명 누적</td>
                      <td className="py-2.5 px-3.5">다분문항 모델(GRM), 문항변별도(a) 및 문항난이도(b) 파라미터 산출</td>
                      <td className="py-2.5 px-3.5">2개년 누적 훈련생 빅데이터를 바탕으로 컴퓨터 적응형 단축검사(CAT) 개발 연계</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 9. 향후 개선 제안 */}
        {activeSection === 9 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="text-blue-700">9.</span> 향후 개선 제안 (Future Roadmap & Scalability)
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>
                현대직업전문학교의 지속적인 교육 품질 향상과 미래지향적 스마트 훈련 생태계 구축을 위한 3대 중장기 고도화 방향입니다.
              </p>

              <div className="space-y-3">
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs mb-1">
                      컴퓨터 적응형 단축 검사 (CAT: Computerized Adaptive Testing) 도입
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      현재 48문항은 정밀 진단에 이상적이나, 바쁜 성인 학습자를 위해 문항반응이론(IRT) 기반 알고리즘을 적용하여 15~20문항 응답만으로도 동일한 신뢰도를 도출하는 모바일 퀵(Quick) 진단 모드를 추후 개발할 것을 권장합니다.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs mb-1">
                      직종별(IT·기계·전기·사무) 차별화 규준(Norms) 분리 구축
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      현재는 직업훈련 전체 훈련생 통합 규준을 사용하고 있으나, 데이터가 누적됨에 따라 '스마트 코딩 과정', '기계·전기 실습 과정', '서비스/사무 과정' 등으로 직종별 규준 테이블을 세분화하여 직무 맞춤형 변별력을 한층 강화합니다.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs mb-1">
                      사전-사후 검사(Pre-Post Test)를 통한 역량 성장도(Growth Track) 측정
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      입과 첫 주 1차 진단에 이어, 수료 2주 전 2차 진단을 실시함으로써 훈련 기간 동안 '자기조절', '협력학습', '자신감' 등 핵심 역량이 얼마나 성장했는지를 전후 비교 리포트로 시각화하여 훈련생에게 성취감을 제공하고 훈련기관 성과 지표로 활용합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

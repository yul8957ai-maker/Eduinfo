import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Compass, 
  ShieldCheck, 
  BarChart3, 
  BookMarked, 
  FileText, 
  FileDown, 
  Users, 
  TrendingUp, 
  HelpCircle, 
  AlertTriangle,
  Lightbulb,
  Award,
  Zap,
  Clock,
  Brain,
  Layers,
  GraduationCap
} from 'lucide-react';
import { FACTORS, SAMPLE_PROFILES } from '../data/diagnosticFramework';

interface LandingPageProps {
  onStartTest: () => void;
  onViewSampleReport: (sampleId: string) => void;
  onViewGuide: () => void;
  onViewSpecs: () => void;
}

export function LandingPage({
  onStartTest,
  onViewSampleReport,
  onViewGuide,
  onViewSpecs
}: LandingPageProps) {
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState(0);

  const activePersona = SAMPLE_PROFILES[selectedPersonaIndex];

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in pb-12">
      
      {/* 1. HERO SECTION: High-Impact & Eye-Catching */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-xl">
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Top Hook Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>현대직업전문학교 독자 개발 • H-LSIT v1.0</span>
          </div>

          {/* Catchy Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            왜 어떤 훈련생은 <span className="text-rose-400 underline decoration-rose-500/50 decoration-wavy underline-offset-8">중도 포기</span>하고,<br className="hidden sm:inline" />
            어떤 훈련생은 <span className="text-blue-400">에이스로 취업</span>할까?
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            단 5분의 과학적 심리측정으로 훈련생의 숨겨진 <strong className="text-white font-semibold">학습 DNA</strong>와 
            <strong className="text-white font-semibold"> 중도탈락 위험 요인</strong>을 조기 진단하여, 
            맞춤형 지도와 취업 성공을 이끄는 현대직업전문학교 성인학습자 정밀 진단 시스템입니다.
          </p>

          {/* Key Value Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-blue-300 font-bold block uppercase tracking-wider">측정 요인</span>
              <span className="text-lg sm:text-xl font-extrabold text-white">8대 다차원 지표</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-blue-300 font-bold block uppercase tracking-wider">표준화 문항</span>
              <span className="text-lg sm:text-xl font-extrabold text-white">48개 검증 문항</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-blue-300 font-bold block uppercase tracking-wider">통계적 기준</span>
              <span className="text-lg sm:text-xl font-extrabold text-white">T-Score 50±10 규준</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-blue-300 font-bold block uppercase tracking-wider">결과 보고서</span>
              <span className="text-lg sm:text-xl font-extrabold text-white">A4 PDF / HTML 즉시 발급</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onStartTest}
              className="w-full sm:w-auto px-7 py-4 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>👉 3분 만에 내 학습성향 진단하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewSampleReport('sample-1')}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 active:scale-98 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-blue-300" />
              <span>실제 진단 결과 리포트 미리보기</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 회원가입/비용 없음
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 즉시 결과 도출
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 교사 1:1 상담 연계
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE PAIN POINTS: 직업훈련 현장의 3대 미스터리와 현실 공감 */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">직업훈련 현장의 실태</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            훈련생의 이탈과 성적 부진, 정말 의지 탓일까요?
          </h2>
          <p className="text-sm text-slate-600">
            직업훈련은 일반 학과와 다릅니다. 성인 학습자의 3대 고질적 고민 뒤에는 과학적 원인이 숨어 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                위험 신호 01
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                "열심히 듣는 것 같은데 실습 진도를 전혀 못 따라가요"
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                원인은 이해력 부족이 아닌 <strong className="text-slate-800 font-semibold">'실천성(Action)'</strong>과 <strong className="text-slate-800 font-semibold">'조력요청(Help-Seeking)'</strong>의 결여입니다. 질문을 부끄러워하여 혼자 끙끙 앓다 실습 장벽에 부딪힙니다.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>H-LSIT 솔루션: 1:1 조력 매칭 & 단계적 실습 과제 부여</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                위험 신호 02
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                "첫 모의평가에서 감점받고 다음 날 갑자기 결석해요"
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                실기 난이도의 문제가 아니라 <strong className="text-slate-800 font-semibold">'학습지속성(Persistence)'</strong>과 <strong className="text-slate-800 font-semibold">'학습자신감'</strong>이 낮아 발생하는 성인 특유의 방어기제입니다.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>H-LSIT 솔루션: 초기 작은 성공(Quick Win) 설계를 통한 회복탄력성 회복</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                위험 신호 03
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                "개인 기술은 뛰어난데 팀 프로젝트만 하면 갈등이 생겨요"
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                성인학습자의 직장 경력과 고유 고집으로 인해 <strong className="text-slate-800 font-semibold">'협동학습'</strong> 지수가 불균형할 때 나타납니다. 기업체가 가장 우려하는 조직 부적응의 전조입니다.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>H-LSIT 솔루션: 성향 보완형 역할 분담 및 팀 빌딩 가이드라인 가동</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 8 FACTORS: H-LSIT 8대 다차원 심리측정 프레임워크 쇼케이스 */}
      <section className="bg-slate-100/70 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-700 tracking-wider uppercase mb-1">
              SCIENTIFIC PSYCHOMETRICS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              8대 학습성향 핵심 진단 요인
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              인지심리학(SRL), 자기결정성이론(SDT), 안드라고지(Andragogy)에 기반하여 실무 현장에 맞춰 정밀 구조화되었습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onViewSpecs}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>학술적 개발 명세서 보기</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FACTORS.map((factor, idx) => (
            <div 
              key={factor.id}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded bg-blue-50 text-blue-700 text-xs font-bold font-mono flex items-center justify-center border border-blue-100">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-bold text-slate-500 font-mono">
                  M={factor.mean} (SD={factor.sd})
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {factor.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {factor.definition}
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-blue-700 block">
                  💡 핵심 질문:
                </span>
                <span className="text-[11px] text-slate-700 italic">
                  "{getFactorCoreQuestion(factor.id)}"
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE PERSONAS: 실제 훈련생 3대 대표 케이스 즉시 체험 */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">실제 훈련생 데이터 체험</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            클릭 한 번으로 전형적인 훈련생 리포트를 확인해보세요
          </h2>
          <p className="text-sm text-slate-600">
            현대직업전문학교 실제 훈련생의 전형적 페르소나 데이터로 즉시 분석 결과를 체험할 수 있습니다.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {SAMPLE_PROFILES.map((profile, idx) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => setSelectedPersonaIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedPersonaIndex === idx
                  ? 'bg-blue-700 text-white shadow-sm ring-2 ring-blue-700/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5 opacity-80" />
              <span>{profile.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-normal ${
                selectedPersonaIndex === idx ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {idx === 0 ? '독립실습형' : idx === 1 ? '경력전환형' : '협업탐색형'}
              </span>
            </button>
          ))}
        </div>

        {/* Active Persona Featured Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold border border-blue-100">
                {activePersona.trainee.courseName}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {activePersona.trainee.ageGroup} / {activePersona.trainee.goalType}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {activePersona.name} : {activePersona.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {getPersonaDetailedNarrative(activePersona.id)}
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>지도교사 핵심 지도 포인트:</span>
              </div>
              <p className="text-slate-600 pl-6 leading-relaxed">
                {getPersonaCounselorAdvice(activePersona.id)}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-50/70 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
              H
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                {activePersona.name} 진단 데이터 로드 완료
              </span>
              <span className="text-[11px] text-slate-500">
                8각 역량 프로파일 & 48문항 응답 준비됨
              </span>
            </div>
            <button
              type="button"
              onClick={() => onViewSampleReport(activePersona.id)}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>이 프로파일로 리포트 즉시 열람하기</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY H-LSIT: 타 일반 성격검사와 무엇이 다른가? */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">검사의 신뢰도 & 차별성</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            MBTI, 일반 인적성검사와 H-LSIT의 결정적 차이
          </h2>
          <p className="text-sm text-slate-600">
            직업훈련은 추상적인 성격이 아니라, '실습 기자재를 다루고 자격증을 취득하며 취업하는 능력'을 측정해야 합니다.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs max-w-4xl mx-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">비교 항목</th>
                <th className="py-3 px-4 text-slate-500">일반 성격/흥미 검사 (MBTI, 홀랜드 등)</th>
                <th className="py-3 px-4 text-blue-700 bg-blue-50/50">현대직업전문학교 H-LSIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">진단 목적</td>
                <td className="py-3 px-4 text-slate-500">단순 성격 유형 분류 및 선호도 파악</td>
                <td className="py-3 px-4 font-semibold text-blue-900 bg-blue-50/30">
                  직업훈련 중도탈락 방지 및 실습·자격증·취업 역량 강화
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">현장 특화 문항</td>
                <td className="py-3 px-4 text-slate-500">추상적인 일상생활 질문 중심</td>
                <td className="py-3 px-4 font-semibold text-blue-900 bg-blue-50/30">
                  실습 도구 사용, 에러 해결, 팀 프로젝트, 훈련교사 질문 등 현장 밀착 문항
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">응답 왜곡 방지</td>
                <td className="py-3 px-4 text-slate-500">사회적 바람직성 편향에 취약</td>
                <td className="py-3 px-4 font-semibold text-blue-900 bg-blue-50/30">
                  16개 부정반응 검증 역문항(Reverse Coding) 내장으로 신뢰도 확보
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">통계적 규준</td>
                <td className="py-3 px-4 text-slate-500">단순 유형 라벨링 (ENFP, ISTJ 등)</td>
                <td className="py-3 px-4 font-semibold text-blue-900 bg-blue-50/30">
                  성인 훈련생 모집단 기반 표준 T-점수(50±10) 및 백분위(Percentile) 산출
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">지도교사 활용도</td>
                <td className="py-3 px-4 text-slate-500">결과를 봐도 어떻게 지도할지 모호함</td>
                <td className="py-3 px-4 font-semibold text-blue-900 bg-blue-50/30">
                  GROW 모델 기반 4단계 면담 프로토콜 및 즉시 출력 A4 PDF/HTML 제공
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. 4-STEP PROCESS: 직관적인 4단계 활용 프로세스 */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">사용 프로세스</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            진단부터 취업 지도까지, 체계적인 4단계 운영
          </h2>
          <p className="text-sm text-slate-600">
            복잡한 설치나 번거로운 절차 없이 웹 브라우저에서 모든 과정이 즉시 진행됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              간이 진단 문항 응답
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              PC 또는 모바일에서 48개 문항에 대해 6점 리커트 척도로 솔직하게 응답합니다. (소요시간 3~5분)
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              다차원 프로파일 자동 도출
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              제출 즉시 8각 방사형 레이더 차트, T점수, 백분위, 핵심 강점 및 성장 과제가 실시간 계산됩니다.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              GROW 모델 기반 1:1 상담
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              담당 훈련교사가 표준 상담 가이드를 활용하여 훈련생의 취약점을 보완하는 실천 계획을 수립합니다.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              A4 공인 PDF & HTML 보관
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              훈련 이수자평가 및 취업 상담 이력 증빙을 위해 정밀 서식이 적용된 공식 리포트를 다운로드합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ: 자주 묻는 질문 */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 max-w-4xl mx-auto">
        <div className="space-y-1">
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">FAQ</div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            자주 묻는 질문 (FAQ)
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm divide-y divide-slate-100">
          <div className="pt-3 space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-700 font-bold">Q.</span>
              진단 결과가 훈련생의 성적이나 출결 평가에 불이익을 주나요?
            </h3>
            <p className="text-slate-600 leading-relaxed pl-5">
              전혀 아닙니다. H-LSIT는 서열화나 평가 목적의 시험이 아니며, 오직 훈련생 개개인의 학습 특성을 파악하여 훈련 중도탈락을 방지하고 효과적인 맞춤형 피드백을 제공하기 위한 <strong className="text-slate-800">성장 지원 도구</strong>입니다.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-700 font-bold">Q.</span>
              검사지를 종이나 파일로 보관할 수 있나요?
            </h3>
            <p className="text-slate-600 leading-relaxed pl-5">
              네. 진단 완료 후 결과 화면 상단에서 <strong className="text-slate-800">'A4 PDF 저장'</strong> 버튼을 클릭하면 표준 A4 규격의 다중 페이지 PDF가 자동 생성되며, <strong className="text-slate-800">'HTML 저장'</strong>을 통해 인터넷 없이도 열리는 독립 웹 리포트 파일을 다운로드할 수 있습니다.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-700 font-bold">Q.</span>
              훈련교사는 결과를 보고 어떤 방식으로 지도해야 하나요?
            </h3>
            <p className="text-slate-600 leading-relaxed pl-5">
              상단 메뉴의 <strong className="text-slate-800">'현장 활용 가이드'</strong> 탭에서 GROW 코칭 모델(목표 설정 - 현실 점검 - 대안 탐색 - 실행 의지) 기반의 구체적인 질문 스크립트와 5대 위기 훈련생 유형별 조기 감지 체크리스트를 확인하여 상담에 즉시 적용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CATCHY CTA: 최종 행동 유도 */}
      <section className="rounded-3xl bg-blue-700 text-white p-8 sm:p-12 text-center space-y-5 shadow-lg relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>지금 바로 시작할 수 있습니다</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            준비되지 않은 훈련은 방황을 낳지만,<br />
            정확한 진단은 합격과 취업을 앞당깁니다.
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            현대직업전문학교 성인학습자 진단 시스템으로 훈련생 한 명 한 명의 잠재력을 극대화하세요.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onStartTest}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 active:scale-98 text-blue-800 rounded-xl font-extrabold text-sm sm:text-base shadow-md transition-all cursor-pointer"
            >
              🚀 지금 바로 3분 진단 시작하기
            </button>
            <button
              type="button"
              onClick={onViewGuide}
              className="w-full sm:w-auto px-6 py-4 bg-blue-800/80 hover:bg-blue-800 text-white rounded-xl font-bold text-sm sm:text-base border border-blue-500/40 transition-all cursor-pointer"
            >
              📖 훈련교사용 가이드 열람
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function getFactorCoreQuestion(factorId: string): string {
  switch (factorId) {
    case 'goal':
      return '나는 왜 이 기술을 배우며 어떤 자격증/직업을 원하는가?';
    case 'regulation':
      return '작심삼일 없이 훈련 시간과 예·복습 루틴을 관리하는가?';
    case 'persistence':
      return '실습 에러와 모의평가 낙제 앞에서도 포기하지 않는가?';
    case 'action':
      return '이론 교재를 넘어 내 손으로 직접 실습 장비를 다루는가?';
    case 'collaboration':
      return '동료 훈련생과 배려하고 소통하며 팀 프로젝트를 완수하는가?';
    case 'help_seeking':
    case 'helpSeeking':
      return '모르는 기술적 장벽이 생겼을 때 교사에게 바로 질문하는가?';
    case 'confidence':
      return '나도 실무 전문가로 취업하여 당당히 일할 수 있다는 확신';
    case 'reflection':
      return '오늘 실습에서 무엇이 부족했고 어떻게 보완할지 아는가?';
    default:
      return '현장 적무 적응을 위한 핵심 학습 태도';
  }
}

function getPersonaDetailedNarrative(sampleId: string): string {
  switch (sampleId) {
    case 'sample-1':
      return '기술 습득과 3D CAD 실기 실천력, 자격증 취득 목표가 매우 확고한 모범 훈련생입니다. 다만 동료와의 협업이나 감정 교류보다는 혼자 빠르게 진도를 빼려는 경향이 있어, 향후 기업체 입사 시 조직 적응 및 팀워크 강화를 위한 상담이 요구됩니다.';
    case 'sample-2':
      return '40대 중장년 경력단절 후 웹 개발자로 재취업을 준비 중인 훈련생입니다. 높은 성찰성과 자기관리 능력을 지녔으나, 나이에 대한 심리적 위축으로 질문을 주저하고 실기 자신감이 다소 저하되어 있어 따뜻한 지지와 초기 성공 경험이 필수적입니다.';
    case 'sample-3':
      return '성격이 밝고 대인관계와 질문 요청 능력이 탁월하여 학급의 분위기 메이커 역할을 합니다. 그러나 훈련 이수 후 구체적인 취업 목표나 자격증 취득 로드맵이 다소 모호하여, 훈련 중반 이후 집중력 저하를 막기 위한 명확한 목표 설정 면담이 필요합니다.';
    default:
      return '현대직업전문학교 정규 과정 훈련생의 실제 응답 패턴입니다.';
  }
}

function getPersonaCounselorAdvice(sampleId: string): string {
  switch (sampleId) {
    case 'sample-1':
      return '팀 프로젝트 조장 역할을 부여하여 동료를 코칭하는 경험을 제공하고 협동학습 시너지를 유도하세요.';
    case 'sample-2':
      return '비공개 1:1 질문 채널을 열어주고, 작은 실습 과제를 통과할 때마다 긍정 피드백을 제공해 자신감을 고취하세요.';
    case 'sample-3':
      return '희망 취업처와 구체적 기술 스택을 매칭하는 1:1 진로 설계를 조기 실시하여 학습 몰입도를 높이세요.';
    default:
      return '개인별 강점 요인을 살리고 약점 요인을 단계적으로 보완하세요.';
  }
}

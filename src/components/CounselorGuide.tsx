import React from 'react';
import { FIELD_GUIDE_DOCS } from '../data/psychometricDocs';
import { SAMPLE_PROFILES } from '../data/diagnosticFramework';
import { FileText, Shield, Users, Compass, ArrowUpRight, HelpCircle } from 'lucide-react';

interface CounselorGuideProps {
  onSelectSample: (sampleId: string) => void;
}

export const CounselorGuide: React.FC<CounselorGuideProps> = ({ onSelectSample }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs tracking-widest uppercase mb-1">
          <span>HYUNDAI VOCATIONAL TRAINING INSTITUTE</span>
          <span>•</span>
          <span>현장 활용 매뉴얼</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          현장 활용 가이드 & 훈련교사용 상담 매뉴얼
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
          현대직업전문학교의 실제 훈련 현장(온라인 접수, 입과 오리엔테이션, 담임교사 1:1 진로면담, 조별 프로젝트 편성 등)에서 즉각 활용할 수 있는 안내문, 개인정보 동의 양식, 4대 학습자 유형별 개입 전략을 제공합니다.
        </p>
      </div>

      {/* 4 Representative Learner Archetypes Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-blue-700" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              현대직업전문학교 훈련생 4대 전형적 학습자 유형 매트릭스
            </h2>
            <p className="text-xs text-slate-500">
              학습성향 진단 결과에 따른 대표 프로파일과 훈련교사 핵심 지도 전략
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELD_GUIDE_DOCS.counselorManual.archetypes.map((arch, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl p-5 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">{arch.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  유형 {idx + 1}
                </span>
              </div>
              <div className="text-xs font-semibold text-blue-800 bg-white border border-blue-200 px-2.5 py-1.5 rounded-lg">
                패턴: {arch.profile}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>교사 개입 전략:</strong> {arch.strategy}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Simulator Launcher */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-blue-950">
              실제 훈련생 가상 프로파일로 상담 시뮬레이션 해보기
            </h4>
            <p className="text-xs text-blue-800 mt-0.5">
              각 유형별 대표 훈련생의 리포트(레이더 차트, 강점, 전략)를 원클릭으로 바로 로드합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROFILES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample.id)}
                className="px-3 py-2 bg-white hover:bg-blue-700 hover:text-white text-slate-800 border border-blue-300 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>{sample.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Online Survey Announcement (현대직업전문학교 명의) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">
            {FIELD_GUIDE_DOCS.announcement.title} (현대직업전문학교 공식 명의)
          </h2>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          발송처: {FIELD_GUIDE_DOCS.announcement.sender}
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
          {FIELD_GUIDE_DOCS.announcement.body}
        </div>
      </div>

      {/* Trainee Notice & Privacy Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trainee Explanation Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <span>{FIELD_GUIDE_DOCS.traineeNotice.title}</span>
          </div>

          <div className="space-y-3">
            {FIELD_GUIDE_DOCS.traineeNotice.points.map((p, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
                <div className="font-bold text-slate-800 mb-1">
                  {idx + 1}. {p.title}
                </div>
                <div className="text-slate-600 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Policy Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Shield className="w-4 h-4 text-blue-700" />
            <span>{FIELD_GUIDE_DOCS.privacyPolicy.title}</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
            {FIELD_GUIDE_DOCS.privacyPolicy.noticeText}
          </div>

          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-[11px] text-blue-900">
            ✓ 현대직업전문학교 개인정보 보호 규정에 따라 수집된 자료는 학습지도 및 취업 지원 이외의 용도로 절대 열람되거나 반출되지 않습니다.
          </div>
        </div>
      </div>

      {/* Counselor 4 Golden Principles */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-bold text-white">
            현대직업전문학교 훈련교사 상담 핵심 원칙 4선
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {FIELD_GUIDE_DOCS.counselorManual.principles.map((principle, idx) => (
            <div key={idx} className="bg-white/10 p-3.5 rounded-lg border border-white/15 text-xs text-slate-200 leading-relaxed">
              <span className="font-bold text-blue-300 mr-1.5">원칙 {idx + 1}.</span>
              {principle}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

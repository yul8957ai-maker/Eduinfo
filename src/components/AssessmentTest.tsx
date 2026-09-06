import React, { useState } from 'react';
import { QUESTIONS, FACTORS, LIKERT_OPTIONS, SAMPLE_PROFILES } from '../data/diagnosticFramework';
import { TraineeInfo, FactorId } from '../types';
import { CheckCircle2, AlertCircle, Sparkles, User, BookOpen, Clock, ArrowRight, RotateCcw } from 'lucide-react';

interface AssessmentTestProps {
  traineeInfo: TraineeInfo;
  setTraineeInfo: React.Dispatch<React.SetStateAction<TraineeInfo>>;
  answers: Record<number, number>;
  onAnswerChange: (questionId: number, score: number) => void;
  onSubmit: () => void;
  onLoadSample: (sampleId: string) => void;
}

export const AssessmentTest: React.FC<AssessmentTestProps> = ({
  traineeInfo,
  setTraineeInfo,
  answers,
  onAnswerChange,
  onSubmit,
  onLoadSample
}) => {
  const [activeFactorFilter, setActiveFactorFilter] = useState<FactorId | 'all'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const answeredCount = Object.keys(answers).length;
  const totalCount = QUESTIONS.length; // 48
  const progressPercent = Math.round((answeredCount / totalCount) * 100);

  const filteredQuestions = activeFactorFilter === 'all' 
    ? QUESTIONS 
    : QUESTIONS.filter(q => q.factorId === activeFactorFilter);

  const handleQuickFillAll = (presetScore = 4) => {
    QUESTIONS.forEach(q => {
      onAnswerChange(q.id, presetScore);
    });
  };

  const handleReset = () => {
    if (window.confirm('모든 문항의 응답을 초기화하시겠습니까?')) {
      QUESTIONS.forEach(q => {
        onAnswerChange(q.id, 0);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!traineeInfo.name.trim()) {
      setErrorMessage('훈련생 성명을 입력해주세요.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const missingIds = QUESTIONS.filter(q => !answers[q.id]).map(q => q.id);
    if (missingIds.length > 0) {
      setErrorMessage(`아직 응답하지 않은 문항이 ${missingIds.length}개 있습니다. (문항 번호: ${missingIds.slice(0, 5).join(', ')}${missingIds.length > 5 ? ' 등' : ''})`);
      return;
    }

    setErrorMessage(null);
    onSubmit();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Introduction Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs tracking-widest uppercase mb-1.5">
              <span>현대직업전문학교 직업훈련 표준 진단평가</span>
              <span>•</span>
              <span>6단계 심리측정 표준</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              성인학습자 학습성향 진단도구 (H-LSIT)
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              본 진단은 서열화나 줄세우기가 아니며, 훈련생 개인의 학습 강점과 보완점을 진단하여 맞춤형 자격증 취득 및 취업 전략을 수립하기 위한 전문 진단도구입니다.
            </p>
          </div>

          {/* Quick Demo Sample Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs shrink-0">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              샘플 훈련생 빠른체험:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PROFILES.map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => onLoadSample(sp.id)}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold transition-all shadow-2xs"
                >
                  {sp.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trainee Info Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-700" />
              훈련생 성명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={traineeInfo.name}
              onChange={(e) => setTraineeInfo({ ...traineeInfo, name: e.target.value })}
              placeholder="예: 김현대"
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-700" />
              훈련과정명
            </label>
            <input
              type="text"
              value={traineeInfo.courseName}
              onChange={(e) => setTraineeInfo({ ...traineeInfo, courseName: e.target.value })}
              placeholder="예: 스마트 웹개발, 기계설계 등"
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              연령대
            </label>
            <select
              value={traineeInfo.ageGroup}
              onChange={(e) => setTraineeInfo({ ...traineeInfo, ageGroup: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium"
            >
              <option value="20대">20대 (청년 구직자)</option>
              <option value="30대">30대 (재취업/경력개발)</option>
              <option value="40대">40대 (중장년 경력전환)</option>
              <option value="50대 이상">50대 이상 (신중년 재도약)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              주요 훈련 목표
            </label>
            <select
              value={traineeInfo.goalType}
              onChange={(e) => setTraineeInfo({ ...traineeInfo, goalType: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium"
            >
              <option value="신규취업">신규 취업 (첫 직장 마련)</option>
              <option value="이직/경력전환">이직 및 신기술 경력전환</option>
              <option value="자격증 취득">국가기술자격증 집중 취득</option>
              <option value="역량강화">현업 실무 스킬업 및 기술 보완</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sticky Progress & Filter Bar */}
      <div className="sticky top-16 md:top-20 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">진단 진행률</span>
            <span className="px-3 py-1 bg-slate-100 rounded text-xs font-mono text-slate-700 font-bold border border-slate-200">
              PROGRESS: {answeredCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickFillAll(5)}
              className="text-[11px] font-semibold text-slate-600 hover:text-blue-700 px-2.5 py-1 rounded-md hover:bg-blue-50 transition-colors"
              title="검사 테스트용 자동입력"
            >
              테스트 자동완성 (5점)
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-semibold text-slate-600 hover:text-rose-600 px-2.5 py-1 rounded-md hover:bg-rose-50 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              초기화
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Factor Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFactorFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
              activeFactorFilter === 'all'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 문항 (48)
          </button>
          {FACTORS.map((f, idx) => {
            const factorQs = QUESTIONS.filter(q => q.factorId === f.id);
            const factorAnswered = factorQs.filter(q => answers[q.id]).length;
            const isDone = factorAnswered === factorQs.length;

            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFactorFilter(f.id)}
                className={`px-2.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeFactorFilter === f.id
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                <span>{f.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeFactorFilter === f.id ? 'bg-blue-900/60 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {factorAnswered}/{factorQs.length}
                </span>
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale Guide Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-600 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong className="text-slate-900">6점 Likert 척도 응답:</strong> 중립을 배제하고 자신의 실제 행동과 생각을 솔직하게 선택해 주세요.
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="px-2 py-0.5 rounded bg-slate-100">1: 전혀 그렇지 않다</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">2: 그렇지 않다</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">3: 다소 그렇지 않다</span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">4: 다소 그렇다</span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">5: 그렇다</span>
          <span className="px-2 py-0.5 rounded bg-blue-600 text-white">6: 매우 그렇다</span>
        </div>
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Question Items List */}
      <div className="space-y-5">
        {filteredQuestions.map((question) => {
          const selectedScore = answers[question.id];
          const factor = FACTORS.find(f => f.id === question.factorId);

          return (
            <div
              key={question.id}
              className={`p-6 rounded-xl border bg-white shadow-xs transition-all ${
                selectedScore 
                  ? 'border-slate-200 ring-1 ring-blue-600/15' 
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5 border border-blue-100">
                  {question.id < 10 ? `0${question.id}` : question.id}
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 mr-2 tracking-wide">
                    [{factor?.name}]
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {question.text}
                  </h3>
                </div>
              </div>

              {/* 6-Point Likert Circular Options as in Professional Polish */}
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 items-center">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isChecked = selectedScore === opt.score;
                    return (
                      <div key={opt.score} className="flex flex-col items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onAnswerChange(question.id, opt.score)}
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
                            isChecked
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-600/20 scale-105'
                              : 'border-slate-300 hover:border-blue-600 bg-white text-slate-500 hover:text-blue-600'
                          }`}
                        >
                          {opt.score}
                        </button>
                        <span className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight ${
                          isChecked ? 'text-blue-700' : 'text-slate-400'
                        }`}>
                          {opt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            진단 응답 완료 ({answeredCount}/{totalCount})
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            모든 문항에 솔직하게 응답하셨다면 아래 버튼을 눌러 종합 심리측정 리포트와 8각 레이더 차트를 확인하세요.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            answeredCount === totalCount
              ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md hover:shadow-lg cursor-pointer'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>진단 결과 리포트 산출하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

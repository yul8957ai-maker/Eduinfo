import React, { useState, useMemo } from 'react';
import { TraineeInfo, DiagnosticResult } from './types';
import { calculateDiagnosticResults, SAMPLE_PROFILES } from './data/diagnosticFramework';
import { LandingPage } from './components/LandingPage';
import { AssessmentTest } from './components/AssessmentTest';
import { DiagnosticReport } from './components/DiagnosticReport';
import { CounselorGuide } from './components/CounselorGuide';
import { SpecificationDocs } from './components/SpecificationDocs';
import { 
  Home,
  ClipboardList, 
  BarChart3, 
  BookMarked, 
  FileText, 
  GraduationCap, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'test' | 'report' | 'guide' | 'specs'>('home');

  const [traineeInfo, setTraineeInfo] = useState<TraineeInfo>({
    name: '',
    courseName: '스마트 직업훈련 전문과정',
    ageGroup: '30대',
    goalType: '신규취업',
    testDate: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [savedResult, setSavedResult] = useState<DiagnosticResult | null>(null);

  const handleAnswerChange = (questionId: number, score: number) => {
    setAnswers(prev => {
      if (score === 0) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return { ...prev, [questionId]: score };
    });
  };

  const handleCalculateAndShowReport = () => {
    const result = calculateDiagnosticResults(traineeInfo, answers);
    setSavedResult(result);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_PROFILES.find(s => s.id === sampleId) || SAMPLE_PROFILES[0];
    setTraineeInfo(sample.trainee);
    setAnswers(sample.answers);
    const result = calculateDiagnosticResults(sample.trainee, sample.answers);
    setSavedResult(result);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Default demo result if user navigates to report before taking test
  const currentResult = useMemo(() => {
    if (savedResult) return savedResult;
    // Fallback to first sample
    const s = SAMPLE_PROFILES[0];
    return calculateDiagnosticResults(s.trainee, s.answers);
  }, [savedResult]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Institutional Navigation Bar - Professional Polish */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3 md:h-20 gap-3">
            {/* Brand Logo & Institution */}
            <div 
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl italic shadow-xs ring-2 ring-blue-700/20 shrink-0 group-hover:scale-105 transition-transform">
                H
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">현대직업전문학교</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-200 uppercase font-mono">
                    H-LSIT v1.0
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                  성인학습자 학습성향 진단 시스템
                </h1>
              </div>
            </div>

            {/* Right Meta & Navigation */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-4">
              {/* Specialist & System Active Badge */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex flex-col items-end text-right">
                  <span className="text-[11px] text-slate-600 font-medium">담당: 심리측정학 전문위원</span>
                  <span className="text-xs font-bold text-slate-800">교육심리학 연구개발팀</span>
                </div>
                <div className="w-px h-7 bg-slate-200"></div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded-full border border-green-200 uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>System Active</span>
                </div>
              </div>

              {/* Main Navigation Tabs */}
              <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'home'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>소개</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('test')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'test'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>진단 검사</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('report')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'report'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>결과 리포트</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('guide')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'guide'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">현장 활용 가이드</span>
                  <span className="sm:hidden">가이드</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'specs'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">심리측정 명세서</span>
                  <span className="sm:hidden">명세서</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <LandingPage
            onStartTest={() => {
              setActiveTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewSampleReport={(sampleId) => {
              handleLoadSample(sampleId);
            }}
            onViewGuide={() => {
              setActiveTab('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewSpecs={() => {
              setActiveTab('specs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        {activeTab === 'test' && (
          <AssessmentTest
            traineeInfo={traineeInfo}
            setTraineeInfo={setTraineeInfo}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleCalculateAndShowReport}
            onLoadSample={handleLoadSample}
          />
        )}

        {activeTab === 'report' && (
          <DiagnosticReport
            result={currentResult}
            onRetake={() => {
              setActiveTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'guide' && (
          <CounselorGuide onSelectSample={handleLoadSample} />
        )}

        {activeTab === 'specs' && (
          <SpecificationDocs />
        )}
      </main>

      {/* Footer - Professional Polish */}
      <footer className="px-6 sm:px-8 py-4 bg-slate-800 text-white border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center text-[11px] font-medium gap-3 print:hidden">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-slate-300">
          <span>© 2026 현대직업전문학교 All Rights Reserved.</span>
          <span className="hover:text-white cursor-pointer transition-colors">개인정보처리방침</span>
          <span className="text-slate-400">학습지원센터: 02-123-4567</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 uppercase tracking-widest text-[10px]">Technical Partnership</span>
          <div className="h-3.5 w-px bg-slate-600 mx-1"></div>
          <span className="font-bold italic text-blue-300">Psychometrics Expert Group</span>
        </div>
      </footer>
    </div>
  );
}

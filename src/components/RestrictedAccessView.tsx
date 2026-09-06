import React from 'react';
import { useApiKeyAuth } from '../context/ApiKeyContext';
import { Lock, ShieldAlert, KeyRound, ArrowRight, ExternalLink } from 'lucide-react';

interface RestrictedAccessViewProps {
  title?: string;
  description?: string;
  onGoHome?: () => void;
}

export function RestrictedAccessView({
  title = "API Key 유효성 승인이 필요합니다",
  description = "본 메뉴는 유효한 Google Gemini API Key 승인을 받은 사용자에게만 제공됩니다.",
  onGoHome
}: RestrictedAccessViewProps) {
  const { openModal } = useApiKeyAuth();

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-md text-center space-y-6 animate-fade-in">
      {/* Lock Icon */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>보안 접근 제한 (Access Restricted)</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Notice Box */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
        <span className="font-bold text-slate-800 block">
          💡 이용 제한 안내:
        </span>
        <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
          <li>진단 검사 문항 작성 및 답안 제출 차단</li>
          <li>진단 결과 리포트 및 심리측정 분석 열람 차단</li>
          <li>훈련교사 상담 가이드 및 명세서 열람 차단</li>
          <li>AI 기반 맞춤형 코칭 소견 생성 차단</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => openModal('메뉴를 이용하시려면 API Key 유효성 승인이 필요합니다.')}
          className="w-full sm:w-auto px-7 py-3.5 bg-blue-700 hover:bg-blue-800 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 transition-all cursor-pointer"
        >
          <KeyRound className="w-4 h-4" />
          <span>🔐 지금 바로 API Key 승인받기</span>
        </button>

        {onGoHome && (
          <button
            type="button"
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>소개 홈으로 돌아가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="pt-2 text-xs text-slate-400">
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 underline inline-flex items-center gap-1"
        >
          <span>Google AI Studio에서 무료 API Key 발급받는 방법</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

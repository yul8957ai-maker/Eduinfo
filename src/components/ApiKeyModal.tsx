import React, { useState } from 'react';
import { useApiKeyAuth } from '../context/ApiKeyContext';
import { 
  KeyRound, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Loader2, 
  Eye, 
  EyeOff, 
  X,
  Sparkles,
  Server,
  Lock
} from 'lucide-react';

export function ApiKeyModal() {
  const {
    isApproved,
    isValidating,
    approvedSource,
    maskedKey,
    errorMessage,
    successMessage,
    isModalOpen,
    customKey,
    setCustomKey,
    closeModal,
    modalReason,
    validateKey,
    checkServerEnvKey,
    revokeApproval
  } = useApiKeyAuth();

  const [showPassword, setShowPassword] = useState(false);

  if (!isModalOpen) return null;

  const handleSubmitCustomKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customKey.trim()) return;
    await validateKey(customKey.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-400 border border-rose-400/30'
            }`}>
              {isApproved ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-widest text-blue-300 uppercase">보안 인증 게이트</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                  isApproved 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                    : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                }`}>
                  {isApproved ? '승인 완료' : '미승인 (접근 제한)'}
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                API Key 유효성 승인 관리
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reason Alert (if triggered by blocked action) */}
        {modalReason && !isApproved && (
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>접근 제한:</strong> {modalReason}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
          {/* Main Description */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-800 font-semibold leading-relaxed">
              본 성인학습자 진단 시스템 및 AI 심층 분석 기능을 이용하시려면 <strong className="text-blue-700">Google Gemini API Key 유효성 승인</strong>이 완료되어야 합니다.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              유효성 승인을 받지 못하면 <span className="text-rose-600 font-bold">진단 검사 시작, 결과 리포트, 현장 가이드, 심리측정 명세서</span> 등의 전체 메뉴 사용이 차단됩니다.
            </p>
          </div>

          {/* Current Approval Status Banner */}
          {isApproved ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>API Key 유효성 승인이 완료되었습니다!</span>
              </div>
              <p className="text-xs text-emerald-700 pl-7">
                인증 소스: {approvedSource === 'env' ? '서버 환경변수 (GEMINI_API_KEY)' : '사용자 직접 입력 키'} ({maskedKey})
              </p>
              <div className="pt-2 pl-7 flex items-center gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  확인 완료 (메뉴 이용하기)
                </button>
                <button
                  type="button"
                  onClick={revokeApproval}
                  className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  승인 취소 / 키 변경
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Method 1: Server Env Key Check */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-800 text-xs">방법 1: 서버 등록 API Key 자동 승인 검증</span>
                  </div>
                  <span className="text-[11px] text-slate-400">환경변수 연동</span>
                </div>
                <p className="text-xs text-slate-500">
                  시스템 컨테이너나 환경변수에 설정된 <code className="text-blue-700 font-mono bg-blue-50 px-1 py-0.5 rounded">GEMINI_API_KEY</code>를 즉시 호출하여 유효성을 검증합니다.
                </p>
                <button
                  type="button"
                  onClick={() => checkServerEnvKey(true)}
                  disabled={isValidating}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span>서버 환경변수 검증 중...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>⚡ 서버 환경변수 API Key 즉시 확인 및 승인</span>
                    </>
                  )}
                </button>
              </div>

              {/* Method 2: Custom Key Direct Input */}
              <form onSubmit={handleSubmitCustomKey} className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-blue-700" />
                    <span className="font-bold text-blue-950 text-xs">방법 2: Gemini API Key 직접 입력 및 승인</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">추천</span>
                </div>
                <p className="text-xs text-slate-600">
                  Google AI Studio에서 발급받은 본인의 API Key를 입력하여 실시간 승인을 받으세요. (현재 브라우저 세션에 안전하게 인증됩니다)
                </p>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="AIzaSy..."
                    required
                    className="w-full pr-10 pl-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isValidating || !customKey.trim()}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:scale-99 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>API 유효성 호출 및 인증 확인 중...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>🔑 API Key 유효성 검증 및 승인받기</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Feedback Messages */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">유효성 승인 실패</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* External Key Acquisition Help */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>아직 API Key가 없으신가요?</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>Google AI Studio에서 무료 Key 발급받기</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            H-LSIT Security & Validation Standard
          </span>
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

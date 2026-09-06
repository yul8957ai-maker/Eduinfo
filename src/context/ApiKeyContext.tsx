import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ApiKeyContextType {
  isApproved: boolean;
  isValidating: boolean;
  approvedSource: 'env' | 'custom' | null;
  maskedKey: string | null;
  errorMessage: string | null;
  successMessage: string | null;
  isModalOpen: boolean;
  customKey: string;
  setCustomKey: (key: string) => void;
  openModal: (reason?: string) => void;
  closeModal: () => void;
  modalReason: string | null;
  validateKey: (keyToTest?: string, showFeedback?: boolean) => Promise<boolean>;
  checkServerEnvKey: (showFeedback?: boolean) => Promise<boolean>;
  revokeApproval: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const STORAGE_APPROVED_KEY = 'h_lsit_api_approved';
const STORAGE_CUSTOM_KEY = 'h_lsit_custom_key';
const STORAGE_MASKED_KEY = 'h_lsit_masked_key';

// Helper: Mask key safely
function maskKey(key: string): string {
  const clean = key.trim();
  if (clean.length <= 10) return 'AIzaSy...****';
  return `${clean.slice(0, 6)}...${clean.slice(-4)}`;
}

// Helper: Validate key directly against Google Generative Language API
// Works in any frontend environment (Vercel, Netlify, Cloud Run, Localhost)
async function validateDirectlyWithGoogle(apiKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanKey = apiKey.trim();
    if (!cleanKey) {
      return { success: false, error: 'API Key가 비어있습니다.' };
    }

    // Google API endpoint that lists models or checks key validity with CORS enabled
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(cleanKey)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.models) {
      return { success: true };
    }

    // Parse Google's error response
    if (data?.error) {
      const gMsg = data.error.message || '';
      if (gMsg.includes('API key not valid')) {
        return { success: false, error: '유효하지 않은 Google Gemini API Key입니다. 키 값을 다시 확인해주세요.' };
      }
      if (gMsg.includes('quota') || gMsg.includes('RESOURCE_EXHAUSTED')) {
        return { success: false, error: 'API Key의 사용 한도(Quota)가 초과되었습니다.' };
      }
      return { success: false, error: gMsg || 'Google API 인증에 실패했습니다.' };
    }

    return { success: false, error: `Google API 응답 오류 (상태코드: ${response.status})` };
  } catch (err: any) {
    console.error('Direct Google API validation error:', err);
    return { 
      success: false, 
      error: 'Google Gemini 서버와 직접 통신하지 못했습니다. 인터넷 연결 및 보안 브라우저 설정을 확인해주세요.' 
    };
  }
}

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [isApproved, setIsApproved] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_APPROVED_KEY) === 'true';
  });
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [approvedSource, setApprovedSource] = useState<'env' | 'custom' | null>(() => {
    const saved = sessionStorage.getItem(STORAGE_APPROVED_KEY);
    const custom = sessionStorage.getItem(STORAGE_CUSTOM_KEY);
    return saved === 'true' ? (custom ? 'custom' : 'env') : null;
  });
  const [maskedKey, setMaskedKey] = useState<string | null>(() => {
    return sessionStorage.getItem(STORAGE_MASKED_KEY);
  });
  const [customKey, setCustomKey] = useState<string>(() => {
    return sessionStorage.getItem(STORAGE_CUSTOM_KEY) || '';
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalReason, setModalReason] = useState<string | null>(null);

  // Check initial approval on mount
  useEffect(() => {
    const initCheck = async () => {
      const savedApproved = sessionStorage.getItem(STORAGE_APPROVED_KEY);
      const savedCustomKey = sessionStorage.getItem(STORAGE_CUSTOM_KEY);

      if (savedApproved === 'true') {
        if (savedCustomKey) {
          // Verify saved key quietly in background
          const directCheck = await validateDirectlyWithGoogle(savedCustomKey);
          if (directCheck.success) {
            setIsApproved(true);
            setApprovedSource('custom');
            setMaskedKey(maskKey(savedCustomKey));
            return;
          }
        } else {
          // Kept as approved from session
          setIsApproved(true);
          return;
        }
      }

      // Check server env key if no custom key saved
      try {
        const response = await fetch('/api/auth/status');
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const data = await response.json();
          if (data.approved) {
            setIsApproved(true);
            setApprovedSource('env');
            setMaskedKey('SERVER_GEMINI_KEY');
            sessionStorage.setItem(STORAGE_APPROVED_KEY, 'true');
            sessionStorage.setItem(STORAGE_MASKED_KEY, 'SERVER_GEMINI_KEY');
          }
        }
      } catch {
        // Silent catch on static platforms like Vercel
      }
    };

    initCheck();
  }, []);

  // Validate either an explicit custom key or the server-side environment key
  const validateKey = async (keyToTest?: string, showFeedback = true): Promise<boolean> => {
    setIsValidating(true);
    if (showFeedback) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }

    const targetKey = (keyToTest !== undefined ? keyToTest : customKey).trim();

    if (!targetKey) {
      setIsValidating(false);
      if (showFeedback) {
        setErrorMessage('API Key를 입력해주세요.');
      }
      return false;
    }

    try {
      // Step 1: Try server endpoint with 3.5s timeout
      let serverValidated = false;
      let serverErrorMessage: string | null = null;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch('/api/auth/validate-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: targetKey }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (response.ok && data.success) {
            serverValidated = true;
          } else if (data && data.error) {
            serverErrorMessage = data.error;
          }
        }
      } catch (serverErr) {
        // Server might be missing (e.g., static hosting on Vercel/Netlify)
        console.warn('Backend validation endpoint skipped or unavailable, falling back to direct Google API validation:', serverErr);
      }

      // Step 2: If server succeeded, approve!
      if (serverValidated) {
        const masked = maskKey(targetKey);
        setIsApproved(true);
        setApprovedSource('custom');
        setMaskedKey(masked);

        sessionStorage.setItem(STORAGE_APPROVED_KEY, 'true');
        sessionStorage.setItem(STORAGE_MASKED_KEY, masked);
        sessionStorage.setItem(STORAGE_CUSTOM_KEY, targetKey);

        if (showFeedback) {
          setSuccessMessage('Google Gemini API Key 유효성 승인이 정상 완료되었습니다.');
          setTimeout(() => {
            setIsModalOpen(false);
            setSuccessMessage(null);
          }, 1400);
        }
        return true;
      }

      // Step 3: Direct Google API validation fallback
      // This ensures 100% reliability on Vercel, Netlify, and static deployments!
      const directResult = await validateDirectlyWithGoogle(targetKey);

      if (directResult.success) {
        const masked = maskKey(targetKey);
        setIsApproved(true);
        setApprovedSource('custom');
        setMaskedKey(masked);

        sessionStorage.setItem(STORAGE_APPROVED_KEY, 'true');
        sessionStorage.setItem(STORAGE_MASKED_KEY, masked);
        sessionStorage.setItem(STORAGE_CUSTOM_KEY, targetKey);

        if (showFeedback) {
          setSuccessMessage('Google Gemini API Key 유효성 검증 성공! 모든 메뉴가 승인되었습니다.');
          setTimeout(() => {
            setIsModalOpen(false);
            setSuccessMessage(null);
          }, 1400);
        }
        return true;
      } else {
        // Real validation failure from Google
        setIsApproved(false);
        setApprovedSource(null);
        sessionStorage.removeItem(STORAGE_APPROVED_KEY);
        if (showFeedback) {
          setErrorMessage(directResult.error || serverErrorMessage || '유효하지 않은 API Key입니다. 키를 다시 확인해주세요.');
        }
        return false;
      }
    } catch (err: any) {
      console.error('Validation flow error:', err);
      setIsApproved(false);
      setApprovedSource(null);
      if (showFeedback) {
        setErrorMessage('API Key 검증 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // Check if server environment variable GEMINI_API_KEY is configured and valid
  const checkServerEnvKey = async (showFeedback = true): Promise<boolean> => {
    setIsValidating(true);
    if (showFeedback) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/auth/status', {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      
      // If deployed as static on Vercel without express server, it returns HTML index
      if (!contentType.includes('application/json')) {
        if (showFeedback) {
          setErrorMessage('Vercel 정적 배포 환경에서는 서버 환경변수 조회가 지원되지 않습니다. 아래 "방법 2: Gemini API Key 직접 입력"란에 Key를 입력하시면 즉시 승인됩니다.');
        }
        return false;
      }

      const data = await response.json();

      if (response.ok && data.approved) {
        setIsApproved(true);
        setApprovedSource('env');
        setMaskedKey('SERVER_GEMINI_KEY (승인됨)');
        sessionStorage.setItem(STORAGE_APPROVED_KEY, 'true');
        sessionStorage.setItem(STORAGE_MASKED_KEY, 'SERVER_GEMINI_KEY');
        if (showFeedback) {
          setSuccessMessage(data.message || '서버 등록 API Key 승인 완료!');
          setTimeout(() => {
            setIsModalOpen(false);
            setSuccessMessage(null);
          }, 1200);
        }
        return true;
      } else {
        setIsApproved(false);
        setApprovedSource(null);
        if (showFeedback) {
          setErrorMessage(data.message || '서버 환경변수에 유효한 GEMINI_API_KEY가 없습니다. 아래에 API Key를 직접 입력해주세요.');
        }
        return false;
      }
    } catch (err) {
      console.warn('Check server key failed:', err);
      setIsApproved(false);
      if (showFeedback) {
        setErrorMessage('현재 배포 환경(Vercel 정적 호스팅 등)에서는 서버 환경변수를 직접 읽을 수 없습니다. 아래 "방법 2: Gemini API Key 직접 입력"을 이용해주세요.');
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const revokeApproval = () => {
    setIsApproved(false);
    setApprovedSource(null);
    setMaskedKey(null);
    setCustomKey('');
    sessionStorage.removeItem(STORAGE_APPROVED_KEY);
    sessionStorage.removeItem(STORAGE_CUSTOM_KEY);
    sessionStorage.removeItem(STORAGE_MASKED_KEY);
    setSuccessMessage(null);
    setErrorMessage('API Key 승인이 취소되었습니다. 다시 승인을 받아야 이용할 수 있습니다.');
  };

  const openModal = (reason?: string) => {
    if (reason) setModalReason(reason);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalReason(null);
  };

  return (
    <ApiKeyContext.Provider
      value={{
        isApproved,
        isValidating,
        approvedSource,
        maskedKey,
        errorMessage,
        successMessage,
        isModalOpen,
        customKey,
        setCustomKey,
        openModal,
        closeModal,
        modalReason,
        validateKey,
        checkServerEnvKey,
        revokeApproval,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKeyAuth() {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKeyAuth must be used within an ApiKeyProvider');
  }
  return context;
}

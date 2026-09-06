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
  validateKey: (keyToTest?: string) => Promise<boolean>;
  checkServerEnvKey: () => Promise<boolean>;
  revokeApproval: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const STORAGE_APPROVED_KEY = 'h_lsit_api_approved';
const STORAGE_CUSTOM_KEY = 'h_lsit_custom_key';
const STORAGE_MASKED_KEY = 'h_lsit_masked_key';

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [approvedSource, setApprovedSource] = useState<'env' | 'custom' | null>(null);
  const [maskedKey, setMaskedKey] = useState<string | null>(null);
  const [customKey, setCustomKey] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalReason, setModalReason] = useState<string | null>(null);

  // Check initial approval on mount
  useEffect(() => {
    const initCheck = async () => {
      // 1. Check if session already has approval
      const savedApproved = sessionStorage.getItem(STORAGE_APPROVED_KEY);
      const savedCustomKey = sessionStorage.getItem(STORAGE_CUSTOM_KEY);
      const savedMasked = sessionStorage.getItem(STORAGE_MASKED_KEY);

      if (savedApproved === 'true') {
        if (savedCustomKey) {
          // Re-verify saved custom key
          const success = await validateKey(savedCustomKey, false);
          if (success) return;
        }
      }

      // 2. Otherwise, check if server environment key is valid
      await checkServerEnvKey(false);
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

    try {
      const response = await fetch('/api/auth/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: keyToTest || customKey }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsApproved(true);
        const source = keyToTest || customKey ? 'custom' : 'env';
        setApprovedSource(source);
        const masked = data.keyMasked || 'AIzaSy...****';
        setMaskedKey(masked);

        sessionStorage.setItem(STORAGE_APPROVED_KEY, 'true');
        sessionStorage.setItem(STORAGE_MASKED_KEY, masked);
        if (keyToTest || customKey) {
          sessionStorage.setItem(STORAGE_CUSTOM_KEY, keyToTest || customKey);
        }

        if (showFeedback) {
          setSuccessMessage(data.message || 'API Key 유효성 승인이 정상 완료되었습니다.');
          setTimeout(() => {
            setIsModalOpen(false);
            setSuccessMessage(null);
          }, 1500);
        }
        return true;
      } else {
        setIsApproved(false);
        setApprovedSource(null);
        sessionStorage.removeItem(STORAGE_APPROVED_KEY);
        if (showFeedback) {
          setErrorMessage(data.error || '유효하지 않은 API Key입니다. 다시 확인해주세요.');
        }
        return false;
      }
    } catch (err: any) {
      console.error('Validation request failed:', err);
      setIsApproved(false);
      setApprovedSource(null);
      if (showFeedback) {
        setErrorMessage('서버와의 통신에 실패했습니다. 네트워크 상태를 확인해주세요.');
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
      const response = await fetch('/api/auth/status');
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
          setErrorMessage(data.message || '서버에 등록된 유효한 API Key가 없습니다. 직접 키를 입력해주세요.');
        }
        return false;
      }
    } catch (err) {
      console.error('Check server key failed:', err);
      setIsApproved(false);
      if (showFeedback) {
        setErrorMessage('서버 상태 확인에 실패했습니다.');
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

import PrimaryModal from '@/components/Modal/PrimaryModal';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

/* 
 For API Errors, use it anyware in the app
*/
let modalQueue: ModalConfig[] = [];
let showModalFunction: ((data: ModalConfig) => void) | null = null;

export const showErrorModal = ({
  title,
  content,
  onConfirm,
  type,
}: ModalConfig) => {
  const errorDetails = { title, content, onConfirm, id: Date.now(), type };

  if (showModalFunction) {
    showModalFunction(errorDetails);
  } else {
    // Queue up if provider not mounted yet
    modalQueue.push(errorDetails);
  }
};

export interface ModalConfig {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface ModalContextType {
  isVisible: boolean;
  config: ModalConfig | null;
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

interface ModalProviderProps {
  children: ReactNode;
}

// Modal Provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<ModalConfig | null>(null);
  const [currentError, setCurrentError] = useState<ModalConfig | null>(null);
  const [queue, setQueue] = useState<ModalConfig[]>([]);

  useEffect(() => {
    showModalFunction = (errorDetails: ModalConfig) => {
      setQueue((prev) => [...prev, errorDetails]);
    };

    // Process any errors that were queued before provider mounted
    if (modalQueue.length > 0) {
      setQueue(modalQueue);
      modalQueue = [];
    }

    return () => {
      showModalFunction = null;
    };
  }, []);

  // Process queue when it changes
  useEffect(() => {
    if (queue.length > 0 && !currentError) {
      setCurrentError(queue[0]);
      showModal(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue, currentError]);

  const showModal = (modalConfig: ModalConfig): void => {
    setConfig(modalConfig);
    setIsVisible(true);
  };

  const hideModal = (): void => {
    setIsVisible(false);
    setCurrentError(null);
    setTimeout(() => setConfig(null), 300);
  };

  const value: ModalContextType = {
    isVisible,
    config,
    showModal,
    hideModal,
  };

  return (
    <ModalContext.Provider value={value}>
      <PrimaryModal />
      {children}
    </ModalContext.Provider>
  );
};

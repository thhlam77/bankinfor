import { createContext, useState, useCallback, ReactNode, memo } from 'react';
import Toast, { ToastType } from '../components/Toast';

export interface ToastOptions {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  showProgress?: boolean;
}

export interface ToastContextProps {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

// Create context with a no-op implementation to avoid null checks
export const ToastContext = createContext<ToastContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showToast: () => {/* Default implementation that does nothing */},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideToast: () => {/* Default implementation that does nothing */},
});

// Memoized Provider component to reduce re-renders
const ToastProviderComponent = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ToastOptions>({
    message: '',
    type: 'success',
    duration: 3000,
  });

  const showToast = useCallback((newOptions: ToastOptions) => {
    setOptions(newOptions);
    setOpen(true);
  }, []);

  const hideToast = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        open={open}
        onClose={hideToast}
        message={options.message}
        description={options.description}
        type={options.type}
        duration={options.duration}
        showProgress={options.showProgress}
      />
    </ToastContext.Provider>
  );
};

// Memoized to prevent unnecessary re-renders
export const ToastProvider = memo(ToastProviderComponent);
ToastProvider.displayName = 'ToastProvider';

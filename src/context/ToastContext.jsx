import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  const value = {
    toast,
    showToast,
    hideToast,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

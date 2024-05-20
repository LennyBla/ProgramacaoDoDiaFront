import React from 'react';
import { ToastContainer, toast, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertOptions {
  position?: ToastContainerProps['position'];
  autoClose?: number;
}

const useAlert = () => {
  const notify = (message: string, type: AlertType = 'success', options?: AlertOptions) => {
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'info':
        toast.info(message, options);
        break;
      default:
        toast(message, options);
        break;
    }
  };

  return { notify };
};

export default useAlert;

import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

 const ToastContext = createContext();

const ToastProvider = ({ children }) => {
    const ToastMessege = (
        message,
        position,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
        progress,
        theme,
        type
      ) => {
        switch (type) {
          case "success":
            toast.success(message, {
              position: position,
              autoClose: 2000,
              hideProgressBar: hideProgressBar,
              closeOnClick: closeOnClick,
              pauseOnHover: pauseOnHover,
              draggable: draggable,
              progress: progress,
              theme: theme,
            });
            break;
          case "error":
            toast.error(message, {
              position: position,
              autoClose: 2000,
              hideProgressBar: hideProgressBar,
              closeOnClick: closeOnClick,
              pauseOnHover: pauseOnHover,
              draggable: draggable,
              progress: progress,
              theme: theme,
            });
            break;
          case "warning":
            toast.warning(message, {
              position: position,
              autoClose: 2000,
              hideProgressBar: hideProgressBar,
              closeOnClick: closeOnClick,
              pauseOnHover: pauseOnHover,
              draggable: draggable,
              progress: progress,
              theme: theme,
            });
            break;
        case "info":
          toast.info(message, {
            position: position,
            autoClose: 2000,
            hideProgressBar: hideProgressBar,
            closeOnClick: closeOnClick,
            pauseOnHover: pauseOnHover,
            draggable: draggable,
            progress: progress,
            theme: theme,
          });
          break;
          default:
            break;
        }
      };

  return (
    <ToastContext.Provider value={{ ToastMessege }}>
      {children}
    </ToastContext.Provider>
  );
};


 const useToastMessege = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastMessage must be used within a ToastProvider");
  }
  return context;
};

export {ToastProvider, useToastMessege};
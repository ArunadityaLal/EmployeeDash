import { useToast } from '../context/ToastContext';
import { XCircle } from 'lucide-react';

const Toast = () => {
  const { toast, hideToast } = useToast();
  
  if (!toast.visible) return null;
  
  const bgColor = toast.type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center`}>
      <span>{toast.message}</span>
      <button onClick={hideToast} className="ml-2">
        <XCircle className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const getTypeStyles = () => {
    switch(type) {
      case 'error':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'info':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'success':
      default:
        return 'bg-green-50 text-green-600 border-green-100';
    }
  };
  
  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg border 
      ${getTypeStyles()} 
      transition-all duration-300 ease-in-out flex items-center gap-2
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <span>{message}</span>
      <button onClick={() => {setVisible(false); setTimeout(onClose, 300);}} className="ml-2 text-gray-500 hover:text-gray-700">
        <X size={16} />
      </button>
    </div>
  );
};
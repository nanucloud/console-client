import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'error' | 'info' | 'success';
}

export const AlertModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '알림', 
  message = '계속 진행하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소',
  type = 'warning'
}) => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      document.body.style.overflow = '';
      setAnimateIn(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const handleConfirm = () => {
    setAnimateIn(false);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 300);
  };
  
  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(onClose, 300);
  };
  
  const getTypeStyles = () => {
    switch(type) {
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-amber-200 bg-amber-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  
  const getButtonStyles = () => {
    switch(type) {
      case 'error':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'info':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white';
      default:
        return 'bg-gray-800 hover:bg-gray-900 text-white';
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          animateIn ? 'opacity-50' : 'opacity-0'
        }`} 
        onClick={handleClose}
      />
      
      {/* 모달 컨테이너 */}
      <div 
        className={`relative bg-white rounded-2xl shadow-xl border w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 ease-in-out ${
          getTypeStyles()
        } ${
          animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* 모달 내용 */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 mb-6">{message}</p>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-5 py-2 rounded-lg font-medium transition-colors ${getButtonStyles()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
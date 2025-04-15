import React, { useState, useEffect } from 'react';
import { AlertModal } from '../../components/modal/AlertModal';

const OAuthHandlerPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  
  const handleConfirm = () => {
    window.location.href = 'mailto:b2b@nanu.cc?subject=서비스 이용 문의';
  };
  
  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen">
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="접근 권한 없음"
        message="이 서비스에 접근할 권한이 없습니다. b2b@nanu.cc로 연락하여 서비스를 계약해 주셔야 합니다."
        confirmText="메일 보내기"
        cancelText="돌아가기"
        type="error"
      />
    </div>
  );
};

export default OAuthHandlerPage;
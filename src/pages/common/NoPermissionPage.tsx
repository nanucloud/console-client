import React from "react";
import { DashboardBanner } from "../../components/dashboard/TopBannerCard";

const NoPermissionPage: React.FC = () => {
  return (
    <div className="mt-5 mb-5">
      <DashboardBanner userName="홍길동"/>
      <div className="flex flex-col items-center justify-center p-8 mt-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">접근 권한이 없습니다</h2>
          <p className="text-gray-700 mb-4">
            이 페이지를 볼 수 있는 권한이 없습니다. 관리자에게 문의하세요.
          </p>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
            onClick={() => window.history.back()}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoPermissionPage;
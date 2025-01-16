import React from "react";

interface DashboardBannerProps {
  userName: string;
}

export const DashboardBanner: React.FC<DashboardBannerProps> = ({ userName }) => {
  return (
    <div className="relative h-40 w-full sm:h-48 md:h-56 lg:h-64">
      <img
        src="/dashboard_banner_img.jpg"
        alt="Dashboard Banner"
        className="h-full w-full object-cover rounded-xl sm:rounded-2xl"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans">
          반갑습니다, {userName}님.
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-sans mt-2">
          나누클라우드와 함께해주셔서 감사합니다
        </p>
      </div>
    </div>
  );
};

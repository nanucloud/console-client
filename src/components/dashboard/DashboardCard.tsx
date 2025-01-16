import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg  ${className}`}>
      {children}
    </div>
  );
};

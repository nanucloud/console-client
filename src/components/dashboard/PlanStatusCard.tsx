import React from "react";
import { DashboardCard } from "./DashboardCard";

type PlanClass = "Personal" | "Enterprise" | "Team";

const mockPlan: {
  name: string;
  price: string;
  features: string[];
  nextPaymentDate: string;
  class: PlanClass;
} = {
  name: "NANU Cloud Plus",
  price: "1,000 ₩/월",
  features: ["NANU ONE 서비스 3개", "우선 배포"],
  nextPaymentDate: "2024.12.1",
  class: "Personal",
};

export const CurrentPlanStatus: React.FC = () => {
  return (
    <DashboardCard title="현재 사용 중인 플랜">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between">
          <div className="text-center flex justify-center items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mr-2">
              {mockPlan.name}
            </h3>
            <div className="w-auto h-auto p-1 rounded bg-blue-100 flex items-center justify-center text-blue-800 text-s font-bold">
              {mockPlan.class}
            </div>
          </div>
          <span className="block text-lg text-gray-900 mt-2 text-center">
            {mockPlan.price}
          </span>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {mockPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-base font-medium text-gray-800 border-t border-gray-200 pt-4">
            <span className="text-blue-600">다음 지불일: </span>
            <span className="text-blue-600">{mockPlan.nextPaymentDate}</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

import React from 'react';
import { DashboardCard } from './DashboardCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BillingData {
  date: string;
  amount: number;
}

const mockBillingData: BillingData[] = [
  { date: '03-10', amount: 120 },
  { date: '03-11', amount: 150 },
  { date: '03-12', amount: 180 },
  { date: '03-13', amount: 140 },
  { date: '03-14', amount: 160 },
  { date: '03-15', amount: 190 },
  { date: '03-16', amount: 170 },
];

export const RecentBilling: React.FC = () => {
  return (
    <DashboardCard title="최근 결제 현황">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600">이번 달 사용 금액</p>
          <p className="text-2xl font-bold">₩1,250,000</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">전월 대비</p>
          <p className="text-green-600 font-semibold">+15%</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockBillingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};
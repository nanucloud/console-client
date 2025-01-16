import React from 'react';
import { DashboardCard } from './DashboardCard';

interface Application {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  type: string;
  lastDeployed: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Frontend Service',
    status: 'running',
    type: 'Api Service',
    lastDeployed: '2024-03-16 15:30',
  },
  {
    id: '2',
    name: 'Backend API',
    status: 'running',
    type: 'API Service',
    lastDeployed: '2024-03-15 12:45',
  },
  {
    id: '3',
    name: 'Database Service',
    status: 'stopped',
    type: 'Database',
    lastDeployed: '2024-03-14 09:20',
  },
];

const StatusBadge: React.FC<{ status: Application['status'] }> = ({ status }) => {
  const colors = {
    running: 'bg-green-100 text-green-800',
    stopped: 'bg-gray-100 text-gray-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
};

export const MyApplications: React.FC = () => {
  return (
    <DashboardCard title="나의 애플리케이션">
      <div className="divide-y">
        {mockApplications.map((app) => (
          <div key={app.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-600">{app.type}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              최근 배포: {app.lastDeployed}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
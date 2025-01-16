import React from 'react';
import { DashboardCard } from './DashboardCard';

interface Deployment {
  id: string;
  service: string;
  status: 'success' | 'in-progress' | 'failed';
  timestamp: string;
  duration: string;
}

const mockDeployments: Deployment[] = [
  {
    id: '1',
    service: 'VocaVault BE Service',
    status: 'success',
    timestamp: '10분 전',
    duration: '2분 30초',
  },
  {
    id: '2',
    service: 'DONGHYUN_CC_BE',
    status: 'in-progress',
    timestamp: '15분 전',
    duration: '진행 중',
  },
  {
    id: '3',
    service: 'Database Migration',
    status: 'failed',
    timestamp: '1시간 전',
    duration: '1분 45초',
  },
];

const StatusIcon: React.FC<{ status: Deployment['status'] }> = ({ status }) => {
  const colors = {
    'success': 'text-green-500',
    'in-progress': 'text-blue-500',
    'failed': 'text-red-500'
  };
  
  return (
    <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
  );
};

export const DeploymentStatus: React.FC = () => {
  return (
    <DashboardCard title="배포 상태">
      <div className="space-y-4">
        {mockDeployments.map((deployment) => (
          <div key={deployment.id} className="flex items-center space-x-4">
            <StatusIcon status={deployment.status} />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{deployment.service}</h3>
                <span className="text-sm text-gray-500">{deployment.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">
                소요 시간: {deployment.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
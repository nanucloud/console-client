import React from 'react';
import { DashboardCard } from './DashboardCard';

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '새로운 업데이트 발표',
    message: '새로운 기능 업데이트가 곧 적용됩니다. 자세한 내용은 공지사항을 확인하세요.',
    timestamp: '2시간 전',
  },
  {
    id: '2',
    title: '서버 점검 예정',
    message: '서버 점검이 예정되어 있습니다. 점검 시간을 확인하시고 서비스 이용에 참고하세요.',
    timestamp: '1일 전',
  },
  {
    id: '3',
    title: '서비스 정상화 완료',
    message: '서비스가 정상적으로 복구되었습니다. 이용에 불편을 드려 죄송합니다.',
    timestamp: '3시간 전',
  },
];

export const AnnouncementStatus: React.FC = () => {
  return (
    <DashboardCard title="공지 사항">
      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <div key={announcement.id} className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{announcement.title}</h3>
                <span className="text-sm text-gray-500">{announcement.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">
                {announcement.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

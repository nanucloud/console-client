import { DashboardLayout } from '../types/Dashboard';

// 임시로 로컬 변수에 저장.. 어짜피 퍼블리싱단계
let localLayoutStorage: DashboardLayout[] | null = null;

export const saveLayoutToBackend = async (layouts: DashboardLayout[]) => {
  localLayoutStorage = layouts;
  return Promise.resolve({ success: true, data: layouts });
};

export const fetchLayoutFromBackend = async () => {
  return Promise.resolve({ 
    success: true, 
    data: localLayoutStorage 
  });
};

// 레이아웃 초기화
export const resetLayout = () => {
  localLayoutStorage = null;
  return Promise.resolve({ success: true });
};

//백엔드 코드 (API연동시)
// export const saveLayoutToBackend = async (layouts: DashboardLayout[]) => {
//   try {
//     const response = await fetch('/api/dashboard/layouts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ layouts }),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to save layout');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error saving layout:', error);
//     throw error;
//   }
// };

// export const fetchLayoutFromBackend = async () => {
//   try {
//     const response = await fetch('/api/dashboard/layouts');
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch layout');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching layout:', error);
//     throw error;
//   }
// };
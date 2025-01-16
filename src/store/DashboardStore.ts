import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DashboardState, DashboardLayout } from "../types/Dashboard"

interface DashboardStore extends DashboardState {
  updateLayouts: (newLayouts: DashboardLayout[]) => void;
  resetToDefault: () => void;
}

// 각 위젯별 최소 크기 설정
const defaultLayouts: DashboardLayout[] = [
  {
    i: "billing",
    x: 0,
    y: 0,
    w: 6,
    h: 4,
    minW: 3,
    minH: 4,
  },
  {
    i: "applications",
    x: 6,
    y: 0,
    w: 6,
    h: 4,
    minW: 4,
    minH: 4,
  },
  {
    i: "deployment",
    x: 0,
    y: 4,
    w: 12,
    h: 4,
    minW: 4,
    minH: 3,
  },
];

const defaultWidgets: {
  [key: string]: {
    type: "billing" | "applications" | "deployment";
    title: string;
  };
} = {
  billing: { type: "billing", title: "최근 결제 현황" },
  applications: { type: "applications", title: "나의 애플리케이션" },
  deployment: { type: "deployment", title: "배포 상태" },
};

export const useDashboardStore = create<DashboardStore>()(
  //대시보드 커스텀 크기 관련 코드
  persist(
    (set) => ({
      layouts: defaultLayouts,
      widgets: defaultWidgets,
      updateLayouts: (newLayouts) => {
        const validatedLayouts = newLayouts.map((layout) => {
          const defaultLayout = defaultLayouts.find((d) => d.i === layout.i);
          return {
            ...layout,
            minW: defaultLayout?.minW,
            minH: defaultLayout?.minH,
            w: Math.max(layout.w, defaultLayout?.minW || 0),
            h: Math.max(layout.h, defaultLayout?.minH || 0),
          };
        });
        set({ layouts: validatedLayouts });
      },
      resetToDefault: () => set({ layouts: defaultLayouts }),
    }),
    {
      name: "dashboard-storage",
    }
  )
);

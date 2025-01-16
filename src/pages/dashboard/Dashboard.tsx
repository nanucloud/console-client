import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { RecentBilling } from "../../components/dashboard/RecentBilling";
import { DeploymentStatus } from "../../components/dashboard/DeploymentStatus";
import { MyApplications } from "../../components/dashboard/MyApplication";
import { useDashboardStore } from "../../store/DashboardStore";
import "react-toastify/dist/ReactToastify.css";
import {
  saveLayoutToBackend,
  fetchLayoutFromBackend,
} from "../../services/api";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { RefreshCcw } from "lucide-react";
import { AnnouncementStatus } from "../../components/dashboard/AnnouncementStatusCard";
import { CurrentPlanStatus } from "../../components/dashboard/PlanStatusCard";
import { DashboardBanner } from "../../components/dashboard/TopBannerCard";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard: React.FC = () => {
  const { layouts, updateLayouts } = useDashboardStore();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileLayout, setMobileLayout] = useState<any[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkMobile);

    const loadInitialLayout = async () => {
      try {
        const { data } = await fetchLayoutFromBackend();
        if (data) {
          updateLayouts(data);
        }
      } catch (error) {
        console.error("레이아웃 로드 실패:", error);
      }
    };

    loadInitialLayout();
    checkMobile();
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [updateLayouts]);

  const getWidgetComponent = (widgetId: string) => {
    switch (widgetId) {
      case "billing":
        return <RecentBilling />;
      case "applications":
        return <MyApplications />;
      case "deployment":
        return <DeploymentStatus />;
      case "announcement":
        return <AnnouncementStatus />;
      case "plan":
        return <CurrentPlanStatus />;
      default:
        return null;
    }
  };

  const handleLayoutChange = async (newLayout: any[]) => {
    if (isMobile) {
      setMobileLayout(newLayout);
    } else {
      updateLayouts(newLayout);
      try {
        await saveLayoutToBackend(newLayout);
      } catch (error) {
        console.error("레이아웃 저장 실패:", error);
      }
    }
  };

  const getCurrentLayout = () => {
    if (isMobile) {
      return layouts.map((layout) => ({
        ...layout,
        w: 1,
      }));
    }
    return layouts;
  };

  // 모바일 환경에서 cols 설정
  const getCols = () => {
    return isMobile ? 1 : 12;
  };

  const getWidgetWidth = (widget: any) => {
    return isMobile ? 1 : widget.w;
  };

  return (
    <div className="mt-5">
      <DashboardBanner userName="홍길동"/>
      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <button
          onClick={() => useDashboardStore.getState().resetToDefault()}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
      </div>

      <ReactGridLayout
        className="layout"
        layout={getCurrentLayout()}
        onLayoutChange={handleLayoutChange}
        cols={getCols()}
        rowHeight={100}
        containerPadding={[0, 0]}
        margin={[16, 16]}
        isDraggable={!isMobile}
        isResizable={!isMobile}
        draggableHandle=".widget-handle"
      >
        {getCurrentLayout().map((layout) => (
          <div
            key={layout.i}
            className="bg-white rounded-lg shadow"
            style={{ width: `${getWidgetWidth(layout)}%` }}
          >
            <div className="widget-handle p-4 border-b border-gray-200 cursor-move">
              <h2 className="text-lg font-semibold">
                {useDashboardStore.getState().widgets[layout.i]?.title ||
                  "Unknown Widget. Please Report.,"}
              </h2>
            </div>
            <div className="p-4">{getWidgetComponent(layout.i)}</div>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Dashboard;

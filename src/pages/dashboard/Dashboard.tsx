import React, { useEffect } from "react";
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

const ReactGridLayout = WidthProvider(RGL);

const Dashboard: React.FC = () => {
  const { layouts, updateLayouts } = useDashboardStore();

  useEffect(() => {
    // 초기 레이아웃 로드
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
  }, [updateLayouts]);

  const getWidgetComponent = (widgetId: string) => {
    switch (widgetId) {
      case "billing":
        return <RecentBilling />;
      case "applications":
        return <MyApplications />;
      case "deployment":
        return <DeploymentStatus />;
      default:
        return null;
    }
  };

  const handleLayoutChange = async (newLayout: any[]) => {
    updateLayouts(newLayout);
    try {
      await saveLayoutToBackend(newLayout);
    } catch (error) {
      console.error("레이아웃 저장 실패:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
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
        layout={layouts}
        onLayoutChange={handleLayoutChange}
        cols={12}
        rowHeight={100}
        containerPadding={[0, 0]}
        margin={[16, 16]}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".widget-handle"
      >
        {layouts.map((layout) => (
          <div key={layout.i} className="bg-white rounded-lg shadow">
            <div className="widget-handle p-4 border-b border-gray-200 cursor-move">
              <h2 className="text-lg font-semibold">
                {useDashboardStore.getState().widgets[layout.i].title}
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

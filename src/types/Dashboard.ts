export interface DashboardLayout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
  }
  
  export interface DashboardState {
    layouts: DashboardLayout[];
    widgets: {
      [key: string]: {
        type: 'billing' | 'applications' | 'deployment'| 'announcement';
        title: string;
      };
    };
  }
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UiState {
  sidebarOpen: boolean;
  currentPage: string;
  loading: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: number;
  }>;
}

// 初始状态
const initialState: UiState = {
  sidebarOpen: true,
  currentPage: 'dashboard',
  loading: false,
  notifications: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addNotification: (state, action: PayloadAction<{
      message: string;
      type: 'info' | 'success' | 'warning' | 'error';
    }>) => {
      const { message, type } = action.payload;
      state.notifications.push({
        id: Date.now().toString(),
        message,
        type,
        timestamp: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// 导出actions
export const {
  toggleSidebar,
  setCurrentPage,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

// 导出选择器
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectCurrentPage = (state: RootState) => state.ui.currentPage;
export const selectLoading = (state: RootState) => state.ui.loading;
export const selectNotifications = (state: RootState) => state.ui.notifications;

export default uiSlice.reducer;
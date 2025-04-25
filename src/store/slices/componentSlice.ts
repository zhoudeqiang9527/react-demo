import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// 组件库状态类型定义
export interface ComponentState {
  activeTab: string;
  themeSettings: {
    primaryColor: string;
    borderRadius: string;
    fontSize: string;
  };
  modalOpen: boolean;
  modalContent: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

// 初始状态
const initialState: ComponentState = {
  activeTab: 'buttons',
  themeSettings: {
    primaryColor: '#3b82f6',
    borderRadius: '0.25rem',
    fontSize: 'medium',
  },
  modalOpen: false,
  modalContent: null,
  loading: 'idle',
  error: null,
};

// 异步加载组件库配置
export const loadComponentSettings = createAsyncThunk(
  'components/loadSettings',
  async (_, { rejectWithValue }) => {
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 返回模拟数据
      return {
        primaryColor: '#3b82f6',
        borderRadius: '0.25rem',
        fontSize: 'medium',
      };
    } catch (error) {
      return rejectWithValue('加载组件设置失败');
    }
  }
);

// 创建组件库切片
export const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    updateThemeSetting: (state, action: PayloadAction<{
      key: keyof ComponentState['themeSettings'];
      value: string;
    }>) => {
      const { key, value } = action.payload;
      state.themeSettings[key] = value;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    setModalContent: (state, action: PayloadAction<string | null>) => {
      state.modalContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComponentSettings.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(loadComponentSettings.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.themeSettings = action.payload;
      })
      .addCase(loadComponentSettings.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

// 导出actions
export const { 
  setActiveTab, 
  updateThemeSetting, 
  toggleModal, 
  setModalContent 
} = componentSlice.actions;

// 导出选择器
export const selectActiveTab = (state: RootState) => state.components.activeTab;
export const selectThemeSettings = (state: RootState) => state.components.themeSettings;
export const selectModalState = (state: RootState) => ({
  isOpen: state.components.modalOpen,
  content: state.components.modalContent,
});

export default componentSlice.reducer;
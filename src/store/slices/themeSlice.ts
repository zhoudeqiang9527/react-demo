import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  fontSize: number;
}

// 初始状态
const initialState: ThemeState = {
  mode: 'light',
  fontSize: 16,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    increaseFontSize: (state) => {
      state.fontSize = Math.min(state.fontSize + 1, 24);
    },
    decreaseFontSize: (state) => {
      state.fontSize = Math.max(state.fontSize - 1, 12);
    },
  },
});

// 导出actions
export const { toggleTheme, setTheme, increaseFontSize, decreaseFontSize } = themeSlice.actions;

// 导出选择器
export const selectTheme = (state: RootState) => state.theme.mode;
export const selectFontSize = (state: RootState) => state.theme.fontSize;

export default themeSlice.reducer;
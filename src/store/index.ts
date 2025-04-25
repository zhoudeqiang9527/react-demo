import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';
import dataReducer from './slices/dataSlice';
import componentsReducer from './slices/componentSlice';

// 创建根reducer
const rootReducer = combineReducers({
  theme: themeReducer,
  ui: uiReducer,
  data: dataReducer,
  components: componentsReducer,
});

// 加载持久化的状态
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('加载状态失败:', err);
    return undefined;
  }
};

// 保存状态到localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    console.error('保存状态失败:', err);
  }
};

// 创建Redux store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

// 监听store变化，保存到localStorage
store.subscribe(() => {
  saveState(store.getState());
});

// 导出类型
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
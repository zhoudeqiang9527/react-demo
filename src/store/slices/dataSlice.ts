import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// 模拟API请求获取大量数据
export const fetchListData = createAsyncThunk(
  'data/fetchListData',
  async (count: number = 10000) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 生成大量模拟数据
    const items = Array.from({ length: count }, (_, index) => ({
      id: `item-${index}`,
      title: `项目 ${index}`,
      description: `这是项目 ${index} 的详细描述，包含了一些随机文本内容。`,
      timestamp: Date.now() - Math.floor(Math.random() * 10000000),
      status: Math.random() > 0.5 ? '活跃' : '非活跃',
      priority: ['低', '中', '高'][Math.floor(Math.random() * 3)],
    }));
    
    return items;
  }
);

interface DataItem {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  status: string;
  priority: string;
}

interface DataState {
  items: DataItem[];
  filteredItems: DataItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
  sortBy: 'timestamp' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
  filterStatus: string | null;
}

// 初始状态
const initialState: DataState = {
  items: [],
  filteredItems: [],
  loading: 'idle',
  error: null,
  searchTerm: '',
  sortBy: 'timestamp',
  sortDirection: 'desc',
  filterStatus: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredItems = filterAndSortItems(state);
    },
    setSortBy: (state, action: PayloadAction<'timestamp' | 'priority' | 'title'>) => {
      state.sortBy = action.payload;
      state.filteredItems = filterAndSortItems(state);
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      state.filteredItems = filterAndSortItems(state);
    },
    setFilterStatus: (state, action: PayloadAction<string | null>) => {
      state.filterStatus = action.payload;
      state.filteredItems = filterAndSortItems(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filterStatus = null;
      state.filteredItems = [...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchListData.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.loading = 'succeeded';
        state.items = action.payload;
        state.filteredItems = filterAndSortItems(state);
      })
      .addCase(fetchListData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || '获取数据失败';
      });
  },
});

// 辅助函数：过滤和排序项目
const filterAndSortItems = (state: DataState): DataItem[] => {
  let result = [...state.items];
  
  // 应用搜索过滤
  if (state.searchTerm) {
    const searchLower = state.searchTerm.toLowerCase();
    result = result.filter(
      item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
    );
  }
  
  // 应用状态过滤
  if (state.filterStatus) {
    result = result.filter(item => item.status === state.filterStatus);
  }
  
  // 应用排序
  result.sort((a, b) => {
    let comparison = 0;
    
    switch (state.sortBy) {
      case 'timestamp':
        comparison = a.timestamp - b.timestamp;
        break;
      case 'priority':
        const priorityMap: Record<string, number> = { '低': 0, '中': 1, '高': 2 };
        comparison = priorityMap[a.priority] - priorityMap[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return state.sortDirection === 'asc' ? comparison : -comparison;
  });
  
  return result;
};

// 导出actions
export const {
  setSearchTerm,
  setSortBy,
  toggleSortDirection,
  setFilterStatus,
  clearFilters,
} = dataSlice.actions;

// 导出选择器
export const selectAllItems = (state: RootState) => state.data.items;
export const selectFilteredItems = (state: RootState) => state.data.filteredItems;
export const selectDataLoading = (state: RootState) => state.data.loading;
export const selectDataError = (state: RootState) => state.data.error;
export const selectSearchTerm = (state: RootState) => state.data.searchTerm;
export const selectSortBy = (state: RootState) => state.data.sortBy;
export const selectSortDirection = (state: RootState) => state.data.sortDirection;
export const selectFilterStatus = (state: RootState) => state.data.filterStatus;

export default dataSlice.reducer;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { fetchListData } from '../store/slices/dataSlice';
import { RootState } from '../store';
import { addNotification } from '../store/slices/uiSlice';

const VirtualListDemo: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading } = useSelector((state: RootState) => state.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // 组件挂载时加载数据
  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchListData(10000) as any);
      dispatch(addNotification({
        message: '正在加载10,000条数据，请稍候...',
        type: 'info',
      }));
    }
  }, [dispatch, loading]);

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // 这里可以添加防抖逻辑
  };

  // 处理状态筛选
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterStatus(value === 'all' ? null : value);
  };

  // 列表项渲染器
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = filteredItems[index];
    if (!item) return null;
    
    return (
      <ListItem style={style}>
        <ItemHeader>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemStatus status={item.status}>{item.status}</ItemStatus>
        </ItemHeader>
        <ItemDescription>{item.description}</ItemDescription>
        <ItemFooter>
          <ItemPriority priority={item.priority}>{item.priority}优先级</ItemPriority>
          <ItemDate>{new Date(item.timestamp).toLocaleString()}</ItemDate>
        </ItemFooter>
      </ListItem>
    );
  };

  return (
    <Container>
      <PageTitle>虚拟列表 & 大数据渲染</PageTitle>
      
      <Description>
        此页面展示了使用虚拟滚动技术高效渲染大量数据的能力。
        即使有10,000条记录，页面仍然保持流畅的滚动体验和快速的响应速度。
      </Description>
      
      <ControlPanel>
        <SearchInput 
          type="text" 
          placeholder="搜索项目..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
        
        <FilterSelect value={filterStatus || 'all'} onChange={handleFilterChange}>
          <option value="all">所有状态</option>
          <option value="活跃">活跃</option>
          <option value="非活跃">非活跃</option>
        </FilterSelect>
        
        <StatsDisplay>
          {loading === 'pending' ? '加载中...' : `显示 ${filteredItems.length} 条记录`}
        </StatsDisplay>
      </ControlPanel>
      
      <ListContainer>
        {loading === 'pending' ? (
          <LoadingIndicator>加载数据中，请稍候...</LoadingIndicator>
        ) : filteredItems.length === 0 ? (
          <EmptyState>没有找到匹配的数据</EmptyState>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={filteredItems.length}
                itemSize={120} // 每个项目的高度
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </ListContainer>
      
      <PerformanceInfo>
        <InfoTitle>性能优化说明</InfoTitle>
        <InfoText>
          <p>本页面实现了以下性能优化技术：</p>
          <ul>
            <li>使用 react-window 实现虚拟滚动，只渲染可视区域内的DOM节点</li>
            <li>使用 Redux 进行状态管理，实现高效的数据过滤和排序</li>
            <li>通过 React.memo 和懒加载减少不必要的渲染</li>
            <li>使用 CSS-in-JS (styled-components) 实现样式隔离和主题切换</li>
          </ul>
        </InfoText>
      </PerformanceInfo>
    </Container>
  );
};

// 样式组件
const Container = styled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const Description = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  flex: 1;
  min-width: 200px;
  
  .light & {
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    background-color: #1e293b;
    border: 1px solid #334155;
    color: #f1f5f9;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  
  .light & {
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    background-color: #1e293b;
    border: 1px solid #334155;
    color: #f1f5f9;
  }
`;

const StatsDisplay = styled.div`
  padding: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`;

const ListContainer = styled.div`
  flex: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  min-height: 400px;
  
  .light & {
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    border: 1px solid #334155;
  }
`;

const ListItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid;
  
  .light & {
    border-color: #e5e7eb;
    background-color: white;
    &:hover {
      background-color: #f9fafb;
    }
  }
  
  .dark & {
    border-color: #334155;
    background-color: #1e293b;
    &:hover {
      background-color: #0f172a;
    }
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
`;

const ItemStatus = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  background-color: ${({ status }) => 
    status === '活跃' ? '#dcfce7' : '#f3f4f6'};
  color: ${({ status }) => 
    status === '活跃' ? '#166534' : '#4b5563'};
    
  .dark & {
    background-color: ${({ status }) => 
      status === '活跃' ? '#065f46' : '#374151'};
    color: ${({ status }) => 
      status === '活跃' ? '#d1fae5' : '#e5e7eb'};
  }
`;

const ItemDescription = styled.p`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;
`;

const ItemPriority = styled.span<{ priority: string }>`
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  
  background-color: ${({ priority }) => 
    priority === '高' ? '#fee2e2' :
    priority === '中' ? '#fef3c7' :
    '#dbeafe'};
  color: ${({ priority }) => 
    priority === '高' ? '#b91c1c' :
    priority === '中' ? '#92400e' :
    '#1e40af'};
    
  .dark & {
    background-color: ${({ priority }) => 
      priority === '高' ? '#7f1d1d' :
      priority === '中' ? '#78350f' :
      '#1e3a8a'};
    color: ${({ priority }) => 
      priority === '高' ? '#fecaca' :
      priority === '中' ? '#fef3c7' :
      '#bfdbfe'};
  }
`;

const ItemDate = styled.span`
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const EmptyState = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const PerformanceInfo = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
  
  .light & {
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    background-color: #0f172a;
    border: 1px solid #334155;
  }
`;

const InfoTitle = styled.h2`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 1rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const InfoText = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  
  ul {
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

export default VirtualListDemo;
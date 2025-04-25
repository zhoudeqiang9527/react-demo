import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../store/slices/themeSlice';
import { addNotification } from '../store/slices/uiSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const handleShowNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    dispatch(addNotification({
      message: `这是一条${type === 'info' ? '信息' : type === 'success' ? '成功' : type === 'warning' ? '警告' : '错误'}通知`,
      type,
    }));
  };

  return (
    <DashboardContainer>
      <PageTitle>仪表盘</PageTitle>
      
      <CardGrid>
        <Card>
          <CardTitle>项目概览</CardTitle>
          <CardContent>
            <p>这是一个功能丰富的React应用，展示了React生态的核心技术。</p>
            <FeatureList>
              <FeatureItem>✅ 响应式设计与主题切换</FeatureItem>
              <FeatureItem>✅ Redux状态管理与持久化</FeatureItem>
              <FeatureItem>✅ 虚拟列表与大数据渲染</FeatureItem>
              <FeatureItem>✅ 代码分割与懒加载</FeatureItem>
              <FeatureItem>✅ 可复用组件库</FeatureItem>
            </FeatureList>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>状态管理演示</CardTitle>
          <CardContent>
            <p>当前主题模式: <ThemeIndicator>{theme}</ThemeIndicator></p>
            <ButtonGroup>
              <Button onClick={() => handleShowNotification('info')}>显示信息通知</Button>
              <Button onClick={() => handleShowNotification('success')}>显示成功通知</Button>
              <Button onClick={() => handleShowNotification('warning')}>显示警告通知</Button>
              <Button onClick={() => handleShowNotification('error')}>显示错误通知</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </CardGrid>

      <Section>
        <SectionTitle>项目说明</SectionTitle>
        <p>
          本项目实现了一个功能丰富、性能优化、工程化完善的React应用，覆盖了跨端兼容、状态管理、
          性能优化、微前端等核心技术领域。通过左侧导航可以访问不同的功能演示页面。
        </p>
      </Section>
    </DashboardContainer>
  );
};

// 样式组件
const DashboardContainer = styled.div`
  padding: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .light & {
    background-color: white;
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    background-color: #1e293b;
    border: 1px solid #334155;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  padding: 1rem;
  margin: 0;
  border-bottom: 1px solid;
  
  .light & {
    background-color: #f9fafb;
    border-color: #e5e7eb;
  }
  
  .dark & {
    background-color: #0f172a;
    border-color: #334155;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const ThemeIndicator = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: bold;
  text-transform: capitalize;
  
  .light & {
    background-color: #e5e7eb;
    color: #1f2937;
  }
  
  .dark & {
    background-color: #334155;
    color: #f1f5f9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  .light & {
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
  }
  
  .dark & {
    background-color: #60a5fa;
    color: #0f172a;
    &:hover {
      background-color: #3b82f6;
    }
  }
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

export default Dashboard;
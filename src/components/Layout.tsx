import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { toggleSidebar, selectSidebarOpen } from '../store/slices/uiSlice';
import ThemeToggle from './common/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 监听窗口大小变化，实现响应式布局
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 在移动端自动关闭侧边栏
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      dispatch(toggleSidebar());
    }
  }, [isMobile, dispatch, sidebarOpen]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <LayoutContainer className={theme}>
      <Header>
        {isMobile && (
          <HamburgerButton onClick={handleToggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        )}
        <Logo>React高级应用</Logo>
        <HeaderControls>
          <ThemeToggle />
        </HeaderControls>
      </Header>

      <MainContainer>
        <Sidebar open={sidebarOpen || !isMobile}>
          <NavItem
            active={currentPage === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
          >
            仪表盘
          </NavItem>
          <NavItem
            active={currentPage === 'virtual-list'}
            onClick={() => onNavigate('virtual-list')}
          >
            虚拟列表
          </NavItem>
          <NavItem
            active={currentPage === 'component-library'}
            onClick={() => onNavigate('component-library')}
          >
            组件库
          </NavItem>
        </Sidebar>

        <Content>{children}</Content>
      </MainContainer>
    </LayoutContainer>
  );
};

// 样式组件
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease;

  &.light {
    background-color: var(--light-bg, #ffffff);
    color: var(--light-text, #333333);
  }

  &.dark {
    background-color: var(--dark-bg, #1e293b);
    color: var(--dark-text, #f8fafc);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .light & {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
  }

  .dark & {
    background-color: #0f172a;
    border-bottom: 1px solid #334155;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  flex: 1;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 1rem;

  span {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 2px;
    transition: all 0.3s ease;

    .light & {
      background-color: #333333;
    }

    .dark & {
      background-color: #f8fafc;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Sidebar = styled.nav<{ open: boolean }>`
  width: 250px;
  padding: 1rem 0;
  transition: transform 0.3s ease;

  .light & {
    background-color: #f9fafb;
    border-right: 1px solid #e5e7eb;
  }

  .dark & {
    background-color: #1e293b;
    border-right: 1px solid #334155;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 10;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const NavItem = styled.div<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  .light & {
    background-color: ${({ active }) => (active ? '#e5e7eb' : 'transparent')};
    &:hover {
      background-color: #f3f4f6;
    }
  }

  .dark & {
    background-color: ${({ active }) => (active ? '#334155' : 'transparent')};
    &:hover {
      background-color: #1f2937;
    }
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;

export default Layout;
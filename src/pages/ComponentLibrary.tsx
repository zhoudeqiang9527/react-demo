import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveTab,
  updateThemeSetting,
  toggleModal,
  setModalContent,
  loadComponentSettings,
  selectActiveTab,
  selectThemeSettings,
  selectModalState
} from '../store/slices/componentSlice';
import { addNotification } from '../store/slices/uiSlice';
import Button from '../components/ui/Button';

const ComponentLibrary: React.FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const themeSettings = useSelector(selectThemeSettings);
  const { isOpen: modalOpen, content: modalContent } = useSelector(selectModalState);

  // 组件挂载时加载设置
  useEffect(() => {
    dispatch(loadComponentSettings() as any);
    dispatch(addNotification({
      message: '组件库已加载',
      type: 'info',
    }));
  }, [dispatch]);

  // 切换标签页
  const handleTabChange = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  // 更新主题设置
  const handleThemeChange = (key: keyof typeof themeSettings, value: string) => {
    dispatch(updateThemeSetting({ key, value }));
  };

  // 打开模态框
  const handleOpenModal = (content: string) => {
    dispatch(setModalContent(content));
    dispatch(toggleModal(true));
  };

  // 关闭模态框
  const handleCloseModal = () => {
    dispatch(toggleModal(false));
  };

  // 渲染按钮组件示例
  const renderButtonsTab = () => (
    <ComponentSection>
      <SectionTitle>按钮组件</SectionTitle>
      <Description>
        按钮组件支持多种变体和尺寸，可以根据需要进行自定义。
        通过Redux状态管理，可以全局控制按钮的样式和行为。
      </Description>

      <DemoContainer>
        <DemoTitle>按钮变体</DemoTitle>
        <ButtonGroup>
          <Button variant="primary">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="text">文本按钮</Button>
        </ButtonGroup>

        <DemoTitle>按钮尺寸</DemoTitle>
        <ButtonGroup>
          <Button size="small">小按钮</Button>
          <Button size="medium">中按钮</Button>
          <Button size="large">大按钮</Button>
        </ButtonGroup>

        <DemoTitle>按钮状态</DemoTitle>
        <ButtonGroup>
          <Button>正常状态</Button>
          <Button disabled>禁用状态</Button>
          <Button fullWidth>全宽按钮</Button>
        </ButtonGroup>
      </DemoContainer>

      <CodeExample>
        <pre>
          {`<Button variant="primary" size="medium">
  按钮文本
</Button>`}
        </pre>
      </CodeExample>
    </ComponentSection>
  );

  // 渲染表单组件示例（占位，实际项目中需要实现表单组件）
  const renderFormsTab = () => (
    <ComponentSection>
      <SectionTitle>表单组件</SectionTitle>
      <Description>
        表单组件包括输入框、选择器、复选框等，支持表单验证和状态管理。
        （此部分为示例，实际项目中需要实现相应组件）
      </Description>

      <DemoContainer>
        <DemoTitle>表单示例</DemoTitle>
        <FormDemo>
          <FormGroup>
            <FormLabel>用户名</FormLabel>
            <FormInput type="text" placeholder="请输入用户名" />
          </FormGroup>
          <FormGroup>
            <FormLabel>密码</FormLabel>
            <FormInput type="password" placeholder="请输入密码" />
          </FormGroup>
          <Button>提交</Button>
        </FormDemo>
      </DemoContainer>
    </ComponentSection>
  );

  // 渲染模态框组件示例
  const renderModalsTab = () => (
    <ComponentSection>
      <SectionTitle>模态框组件</SectionTitle>
      <Description>
        模态框组件用于展示重要信息或需要用户确认的操作。
        通过Redux状态管理，可以在应用的任何位置触发模态框。
      </Description>

      <DemoContainer>
        <DemoTitle>模态框示例</DemoTitle>
        <ButtonGroup>
          <Button onClick={() => handleOpenModal('这是一个信息模态框')}>打开信息模态框</Button>
          <Button onClick={() => handleOpenModal('确认删除此项？')}>打开确认模态框</Button>
        </ButtonGroup>
      </DemoContainer>
    </ComponentSection>
  );

  return (
    <Container>
      <PageTitle>组件库</PageTitle>

      <Description>
        这个页面展示了一系列可复用的UI组件，包括按钮、表单、模态框等。
        所有组件都支持主题定制，并且有完善的TypeScript类型定义。
      </Description>

      <ThemeCustomizer>
        <CustomizerTitle>主题定制</CustomizerTitle>
        <CustomizerForm>
          <FormGroup>
            <FormLabel>主色调</FormLabel>
            <ColorPicker
              type="color"
              value={themeSettings.primaryColor}
              onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>圆角大小</FormLabel>
            <Select
              value={themeSettings.borderRadius}
              onChange={(e) => handleThemeChange('borderRadius', e.target.value)}
            >
              <option value="0">无圆角</option>
              <option value="0.125rem">小圆角</option>
              <option value="0.25rem">中圆角</option>
              <option value="0.5rem">大圆角</option>
              <option value="9999px">圆形</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel>字体大小</FormLabel>
            <Select
              value={themeSettings.fontSize}
              onChange={(e) => handleThemeChange('fontSize', e.target.value)}
            >
              <option value="small">小</option>
              <option value="medium">中</option>
              <option value="large">大</option>
            </Select>
          </FormGroup>
        </CustomizerForm>
      </ThemeCustomizer>

      <TabContainer>
        <TabList>
          <Tab
            active={activeTab === 'buttons'}
            onClick={() => handleTabChange('buttons')}
          >
            按钮
          </Tab>
          <Tab
            active={activeTab === 'forms'}
            onClick={() => handleTabChange('forms')}
          >
            表单
          </Tab>
          <Tab
            active={activeTab === 'modals'}
            onClick={() => handleTabChange('modals')}
          >
            模态框
          </Tab>
        </TabList>

        <TabContent>
          {activeTab === 'buttons' && renderButtonsTab()}
          {activeTab === 'forms' && renderFormsTab()}
          {activeTab === 'modals' && renderModalsTab()}
        </TabContent>
      </TabContainer>

      {modalOpen && (
        <Modal>
          <ModalOverlay onClick={handleCloseModal} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>提示</ModalTitle>
              <ModalCloseButton onClick={handleCloseModal}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>{modalContent}</ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={handleCloseModal}>取消</Button>
              <Button onClick={handleCloseModal}>确认</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
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

const ThemeCustomizer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
  
  .light & {
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    background-color: #1e293b;
    border: 1px solid #334155;
  }
`;

const CustomizerTitle = styled.h2`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 1rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const CustomizerForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
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

const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
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

const TabContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
  
  .light & {
    border: 1px solid #e5e7eb;
  }
  
  .dark & {
    border: 1px solid #334155;
  }
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid;
  
  .light & {
    border-color: #e5e7eb;
  }
  
  .dark & {
    border-color: #334155;
  }
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border-bottom: 2px solid;
  transition: all 0.2s ease;
  
  .light & {
    border-color: ${({ active }) => (active ? '#3b82f6' : 'transparent')};
    background-color: ${({ active }) => (active ? '#f9fafb' : 'transparent')};
  }
  
  .dark & {
    border-color: ${({ active }) => (active ? '#60a5fa' : 'transparent')};
    background-color: ${({ active }) => (active ? '#0f172a' : 'transparent')};
  }
`;

const TabContent = styled.div`
  flex: 1;
  padding: 1rem;
  overflow: auto;
`;

const ComponentSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const DemoContainer = styled.div`
  margin: 1.5rem 0;
`;

const DemoTitle = styled.h3`
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CodeExample = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  
  .light & {
    background-color: #f1f5f9;
    color: #334155;
  }
  
  .dark & {
    background-color: #0f172a;
    color: #e2e8f0;
  }
  
  pre {
    margin: 0;
  }
`;

const FormDemo = styled.div`
  max-width: 400px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 1;
  
  .light & {
    background-color: white;
  }
  
  .dark & {
    background-color: #1e293b;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid;
  
  .light & {
    border-color: #e5e7eb;
  }
  
  .dark & {
    border-color: #334155;
  }
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const ModalCloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  .light & {
    color: #6b7280;
  }
  
  .dark & {
    color: #9ca3af;
  }
`;

const ModalBody = styled.div`
  padding: 1rem;
  max-height: 60vh;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid;
  
  .light & {
    border-color: #e5e7eb;
  }
  
  .dark & {
    border-color: #334155;
  }
`;

export default ComponentLibrary;
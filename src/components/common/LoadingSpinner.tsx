import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>加载中...</LoadingText>
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 1rem;
  
  .dark & {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: #60a5fa;
  }
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: inherit;
`;

export default LoadingSpinner;
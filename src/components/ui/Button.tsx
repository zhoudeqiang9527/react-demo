import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectThemeSettings } from '../../store/slices/componentSlice';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
}) => {
  const themeSettings = useSelector(selectThemeSettings);
  
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      primaryColor={themeSettings.primaryColor}
      borderRadius={themeSettings.borderRadius}
    >
      {children}
    </StyledButton>
  );
};

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'text';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  primaryColor: string;
  borderRadius: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${props => props.borderRadius};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* 尺寸变体 */
  padding: ${props => {
    switch (props.size) {
      case 'small': return '0.375rem 0.75rem';
      case 'large': return '0.75rem 1.5rem';
      default: return '0.5rem 1rem';
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '0.75rem';
      case 'large': return '1rem';
      default: return '0.875rem';
    }
  }};
  
  /* 样式变体 */
  background-color: ${props => {
    switch (props.variant) {
      case 'primary': return props.primaryColor;
      case 'secondary': return 'transparent';
      case 'outline': return 'transparent';
      case 'text': return 'transparent';
      default: return props.primaryColor;
    }
  }};
  
  color: ${props => {
    switch (props.variant) {
      case 'primary': return 'white';
      case 'secondary': return props.primaryColor;
      case 'outline': return props.primaryColor;
      case 'text': return props.primaryColor;
      default: return 'white';
    }
  }};
  
  border: ${props => {
    switch (props.variant) {
      case 'outline': return `1px solid ${props.primaryColor}`;
      default: return 'none';
    }
  }};
  
  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'primary': return `${props.primaryColor}dd`;
        case 'secondary': return `${props.primaryColor}22`;
        case 'outline': return `${props.primaryColor}11`;
        case 'text': return `${props.primaryColor}11`;
        default: return `${props.primaryColor}dd`;
      }
    }};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .dark & {
    /* 暗色模式下的样式调整 */
    ${props => props.variant === 'secondary' && `
      background-color: rgba(255, 255, 255, 0.05);
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `}
  }
`;

export default Button;
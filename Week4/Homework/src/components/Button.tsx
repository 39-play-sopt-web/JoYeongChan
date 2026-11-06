import styled from 'styled-components';

const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'danger' }>`
  padding: 10px 18px;
  border: 1px solid
    ${({ theme, $variant = 'primary' }) => {
      if ($variant === 'outline') return theme.color.border;
      if ($variant === 'danger') return theme.color.danger;
      return theme.color.primary;
    }};
  border-radius: ${({ theme }) => theme.radius.small};
  font-weight: 600;
  color: ${({ theme, $variant = 'primary' }) =>
    $variant === 'outline' ? theme.color.text : theme.color.white};
  background-color: ${({ theme, $variant = 'primary' }) => {
    if ($variant === 'outline') return theme.color.white;
    if ($variant === 'danger') return theme.color.danger;
    return theme.color.primary;
  }};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $variant = 'primary' }) => {
      if ($variant === 'outline') return theme.color.hover;
      if ($variant === 'danger') return theme.color.dangerHover;
      return theme.color.primaryHover;
    }};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default Button;

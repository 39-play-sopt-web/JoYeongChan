import styled from 'styled-components';

export const Label = styled.label`
  font-weight: 600;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.color.danger : theme.color.border)};
  border-radius: ${({ theme }) => theme.radius.small};
  outline: none;

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.color.danger : theme.color.primary)};
  }
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 240px;
  padding: 12px 14px;
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.color.danger : theme.color.border)};
  border-radius: ${({ theme }) => theme.radius.small};
  line-height: 1.6;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.color.danger : theme.color.primary)};
  }
`;

export const HelperRow = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 20px;
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.danger};
`;

export const Counter = styled.span<{ $isOver: boolean }>`
  margin-left: auto;
  color: ${({ theme, $isOver }) => ($isOver ? theme.color.danger : theme.color.mutedText)};
`;

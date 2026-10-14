import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import { formatSeconds } from '../utils/format';

function ResultModal({ playTime, onConfirm }) {
  return createPortal(
    <Overlay>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="result-title">
        <Title id="result-title">🎉 게임 종료!</Title>
        <Message>
          기록 <strong>{formatSeconds(playTime)}초</strong>
        </Message>
        <ConfirmButton type="button" onClick={onConfirm}>
          확인
        </ConfirmButton>
      </Dialog>
    </Overlay>,
    document.body
  );
}

export default ResultModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: min(90%, 320px);
  padding: 32px 24px 24px;
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.color.background};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.subText};

  strong {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  font-weight: 700;
  color: #ffffff;
  background-color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

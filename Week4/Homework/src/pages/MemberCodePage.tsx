import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { issueAuthorizationCode } from '../apis/member';
import Button from '../components/Button';
import { Label } from '../components/FormField';
import { PARTS } from '../constants/member';
import type { Part } from '../types/member';
import { saveAuth } from '../utils/auth';

function MemberCodePage() {
  const navigate = useNavigate();
  const [part, setPart] = useState<Part | ''>('');

  const { mutate, isPending, isError } = useMutation({
    mutationFn: issueAuthorizationCode,
    onSuccess: (authorizationCode, selectedPart) => {
      saveAuth(authorizationCode, selectedPart);
      navigate('/');
    },
  });

  const handlePartChange = (value: string) => {
    const selected = PARTS.find((item) => item === value);
    setPart(selected ?? '');
  };

  const handleIssue = () => {
    if (!part) return;
    mutate(part);
  };

  return (
    <Wrapper>
      <Card>
        <Title>회원 코드 발급</Title>
        <Description>파트를 선택하면 글쓰기·수정·삭제에 필요한 회원 코드를 발급해 드려요.</Description>

        <Field>
          <Label htmlFor="part">파트</Label>
          <Select id="part" value={part} onChange={(event) => handlePartChange(event.target.value)}>
            <option value="">파트를 선택해 주세요</option>
            {PARTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>

        {isError && <ErrorText>코드 발급에 실패했어요. 잠시 후 다시 시도해 주세요.</ErrorText>}

        <Buttons>
          <Button type="button" onClick={handleIssue} disabled={!part || isPending}>
            {isPending ? '발급 중...' : '코드 발급'}
          </Button>
          <Button type="button" $variant="outline" onClick={() => navigate('/')}>
            게시판 목록 보기
          </Button>
        </Buttons>
      </Card>
    </Wrapper>
  );
}

export default MemberCodePage;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: min(100%, 420px);
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.large};
`;

const Title = styled.h1`
  font-size: 26px;
`;

const Description = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.color.subText};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Select = styled.select`
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme }) => theme.color.white};
`;

const ErrorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.danger};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

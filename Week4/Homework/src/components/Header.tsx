import { NavLink, useNavigate } from 'react-router';
import styled from 'styled-components';

import { clearAuth, getPart } from '../utils/auth';

function Header() {
  const navigate = useNavigate();
  const part = getPart();

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  return (
    <Wrapper>
      <PartBadge>{part ?? '비회원'}</PartBadge>

      <Nav>
        <Tab to="/" end>
          게시글 목록
        </Tab>
        <Tab to="/write">글쓰기</Tab>
        <LogoutButton type="button" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Nav>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.headerHeight};
  padding: 0 32px;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const PartBadge = styled.span`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.small};
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primaryLight};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Tab = styled(NavLink)`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.small};
  color: ${({ theme }) => theme.color.subText};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &.active {
    font-weight: 700;
    color: ${({ theme }) => theme.color.primary};
  }
`;

const LogoutButton = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  color: ${({ theme }) => theme.color.subText};
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;

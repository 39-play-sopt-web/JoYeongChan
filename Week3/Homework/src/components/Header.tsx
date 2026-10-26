import { Link } from 'react-router';
import styled from 'styled-components';

function Header() {
  return (
    <Wrapper>
      <Logo to="/">
        PLAY SOPT <span>MOVIE</span>
      </Logo>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.headerHeight};
  padding: 0 32px;
  background-color: ${({ theme }) => theme.color.background};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 800;

  span {
    color: ${({ theme }) => theme.color.primary};
  }
`;

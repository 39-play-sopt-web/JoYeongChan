import { Outlet } from 'react-router';
import styled from 'styled-components';

import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Layout;

const Main = styled.main`
  max-width: 880px;
  margin: 0 auto;
  padding: 40px 24px;
`;

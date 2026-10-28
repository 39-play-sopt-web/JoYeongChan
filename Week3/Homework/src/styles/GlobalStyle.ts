import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif;
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
`;

export default GlobalStyle;

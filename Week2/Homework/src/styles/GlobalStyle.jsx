import { Global, css } from '@emotion/react';

const globalStyle = (theme) => css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif;
    color: ${theme.color.text};
    background-color: ${theme.color.background};
  }

  button,
  select {
    font: inherit;
  }
`;

function GlobalStyle() {
  return <Global styles={globalStyle} />;
}

export default GlobalStyle;

const theme = {
  color: {
    background: '#ffffff',
    surface: '#ffffff',
    hover: '#f2f2f2',
    border: '#e5e5e5',
    text: '#222222',
    subText: '#777777',
    mutedText: '#999999',
    primary: '#5a9bd5',
    primaryHover: '#3f82c0',
    primaryLight: '#e8f1fa',
    danger: '#e0675a',
    dangerHover: '#c9503f',
    white: '#ffffff',
  },
  radius: {
    small: '8px',
    medium: '12px',
    large: '16px',
  },
  headerHeight: '64px',
};

export type Theme = typeof theme;

export default theme;

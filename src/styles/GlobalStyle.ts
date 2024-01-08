import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 62.5%; // 기본 폰트 크기(16px)를 62.5% 로 줄인다. 계산을 편하게 하기 위해서 
    }

    body {
        font-size: 1.6rem; // 1.6rem 은 16px 을 가리킨다.
        font-family: 'SF Pro Display', sans-serif;
        font-family: 'Bubbly', sans-serif;
        background: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
        padding-bottom: 64px;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    :lang(ko) {
        h1, h2, h3 {
            word-break: keep-all;
        }
    }
`;

export default GlobalStyle;

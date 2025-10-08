import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 62.5%; // 기본 폰트 크기(16px)를 62.5% 로 줄인다. 계산을 편하게 하기 위해서 
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-user-select: none;
        scroll-behavior: smooth;
    }

    body {
        font-size: 1.6rem; // 1.6rem 은 16px 을 가리킨다.
        font-family: 'SF Pro Display', sans-serif;
        font-family: 'Bubbly', sans-serif;
        font-family: 'SUIT', sans-serif;
        background: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
        padding-bottom: 80px;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
        
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    *::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }

    :lang(ko) {
        h1, h2, h3 {
            word-break: keep-all;
        }
    }

    @keyframes loading {
        0% {
            transform: translateX(0);
        }
        50%,
        100% {
            transform: translateX(460px);
        }
    }
`;

export default GlobalStyle;

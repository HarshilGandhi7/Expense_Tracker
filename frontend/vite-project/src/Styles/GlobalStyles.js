import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --primary-color: #222260;
        --primary-color2: rgba(34, 34, 96, .6);
        --primary-color3: rgba(34, 34, 96, .4);
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
    }

    body {
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color);
    }

    .error {
        color: red;
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(10px);
        }
        50% {
            transform: translateX(-10px);
        }
        75% {
            transform: translateX(10px);
        }
        100% {
            transform: translateX(0);
        }
    }

    @media (max-width: 768px) {
        body {
            font-size: clamp(0.9rem, 1.2vw, 1rem); // Slightly smaller font size for tablets
        }
    }

    @media (max-width: 480px) {
        body {
            font-size: clamp(0.8rem, 1vw, 0.9rem); // Further reduce font size for small screens
        }
    }
`;

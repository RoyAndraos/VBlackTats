import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  
  @font-face {
  font-family: 'EthnocentricRegular';
  src: url('/MyWebfontsKit/webFonts/font.woff2') format('woff2'),
       url('/MyWebfontsKit/webFonts/font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

  body {
    font-family: "arial", sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }
  input, textarea {
    &:focus {
      outline: none;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'EthnocentricRegular', sans-serif;
    color: #241441;
    letter-spacing: 0.3rem;
    cursor: default;
  }

  button {
    cursor: pointer;
  }

`;

export default GlobalStyles;
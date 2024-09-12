import React from "react";
import styled, { keyframes } from "styled-components";
import { ImSpinner } from "react-icons/im";
const Loader = () => {
  return <StyledLoader></StyledLoader>;
};

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const StyledLoader = styled(ImSpinner)`
  color: white;
  animation: ${spin} 1s infinite linear;
`;
export default Loader;

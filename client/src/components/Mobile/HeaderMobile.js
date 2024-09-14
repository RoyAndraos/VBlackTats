import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import newlogo from "../../assets/NewLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
const HeaderMobile = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const logoRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
      }
    );
  }, []);
  return (
    <Wrapper>
      <Logo
        ref={logoRef}
        onClick={() => {
          navigate("/");
        }}
        src={newlogo}
        alt="Initials V.B."
      ></Logo>
      {location !== "/" && (
        <Title>{location.split("/")[1].toUpperCase()}</Title>
      )}
      <Navbar />
    </Wrapper>
  );
};
const Title = styled.h1`
  font-size: 1.5rem;
  color: #241445;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: "noah-bold", sans-serif !important;
`;
const Wrapper = styled.div`
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  z-index: 2000;
  background-color: rgba(173, 153, 229, 0.8);
  position: fixed;
  top: 0;
  width: 100vw;
`;
const Logo = styled.img`
  height: 8vh;
  top: 0;
  left: 1rem;
  position: relative;
  cursor: pointer;
  z-index: 2000;
`;

export default HeaderMobile;

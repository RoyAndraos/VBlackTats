import styled, { keyframes } from "styled-components";
import logo from "../../assets/NewLogo.png";
import NavbarPC from "./NavbarPC";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import gsap from "gsap";
const HeaderPC = () => {
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        y: -100,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
      }
    );
    gsap.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.9,
      }
    );
  }, []);
  return (
    <Wrapper>
      <Left>
        <Logo
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          ref={logoRef}
        />
        <NavbarPC />
      </Left>
      <GetInked
        ref={buttonRef}
        style={{ fontFamily: "funky, sans-serif", marginRight: "5vw" }}
        onClick={() => {
          navigate("/book");
        }}
      >
        GET INKED!{" "}
        <span>
          <FaArrowRightLong style={{ fontSize: "1.5rem" }} />
        </span>
      </GetInked>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(173, 153, 229, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4vw;
`;
const Logo = styled.img`
  height: 8vh;
  margin-left: 2vw;
  cursor: pointer;
`;
export const bounce = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
`;
export const GetInked = styled.button`
  font-size: 1rem;
  color: whitesmoke;
  padding: 0.7vh 2vw;
  border: none;
  border-radius: 3px;
  background-color: #241441;
  font-family: "EthnocentricRegular", sans-serif !important;
  position: relative;
  box-shadow: #c4b6eb 5px 5px 0px -2px, #241441 5px 5px;
  display: flex;
  align-items: center;
  gap: 1vw;
  letter-spacing: 0.1rem;
  z-index: 1000;
  &:hover {
    span {
      animation: ${bounce} 0.5s ease-in-out infinite; /* Bounce effect */
    }
  }
`;
export default HeaderPC;

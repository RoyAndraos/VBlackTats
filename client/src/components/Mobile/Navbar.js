import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LanguageContext } from "../../contexts/LanguageContext";
import { GetInked } from "../PC/HeaderPC";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const burgerRef = useRef(null);
  useEffect(() => {
    console.log(burgerRef);
    gsap.fromTo(
      burgerRef.current,
      {
        opacity: 0,
        x: -100,
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
    <Container>
      <Menu $isOpen={isOpen}>
        <div
          onClick={() => {
            setIsOpen(false);
            navigate("/flashes");
          }}
        >
          Flash
        </div>
        {/* <div onClick={()=>{navigate("/")}}>About</div> */}
        <div
          onClick={() => {
            setIsOpen(false);
            navigate("/tattoos");
          }}
        >
          {language === "en" ? "Tattoos" : "Tatouages"}
        </div>
        <div
          onClick={() => {
            setIsOpen(false);
            navigate("/afterCare");
          }}
        >
          {language === "en"
            ? "After Care Instructions"
            : "Instructions Post-Tatouage"}
        </div>
        <GetInked
          onClick={() => {
            setIsOpen(false);
            navigate("/book");
          }}
        >
          <span>{language === "en" ? "GET INKED!" : "Réserver"}</span>
          <FaArrowRight />
        </GetInked>
      </Menu>
      <Wrapper
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        ref={burgerRef}
      >
        <BarTop $isOpen={isOpen} />
        <BarMiddle $isOpen={isOpen} />
        <BarBot $isOpen={isOpen} />
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  z-index: 100;
  position: relative;
  margin-right: 2rem;
`;
const Menu = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 18vh;
  align-items: center;
  color: #241441;
  background-color: ${({ $isOpen }) => ($isOpen ? "#bbabe8" : "transparent")};
  position: fixed;
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  left: 0;
  transition: 0.5s ease-in-out;
  font-family: "EthnocentricRegular", sans-serif !important;
  div {
    padding-bottom: 4vh;
    padding-top: 4vh;
    width: 60%;
    text-align: center;
    &:last-child {
      border-bottom: none;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  width: ${(props) => (props.$isOpen ? "45px" : "50px")};
  height: ${(props) => (props.$isOpen ? "27px" : "27px")};
  position: relative;
  overflow: hidden;
  z-index: 1000;
`;

const BarTop = styled.div`
  width: 50px;
  height: 6px;
  background-color: #241441;
  transition: 0.3s ease-in-out;
  transform: ${(props) =>
    props.$isOpen
      ? "rotate(45deg) translateX(5.5px) translateY(9.5px) skewX(50deg)"
      : "skewX(50deg)"};
  position: ${(props) => (props.$isOpen ? "absolute" : "relative")};
`;
const BarMiddle = styled.div`
  width: 50px;
  height: 6px;
  display: ${(props) => (props.$isOpen ? "none" : "block")};
  transition: 0.3s ease-in-out;
  background-color: #241441;
  transform: skewX(50deg);
`;
const BarBot = styled.div`
  width: 50px;
  height: 6px;
  background-color: #241441;
  transition: 0.3s ease-in-out;
  transform: ${(props) =>
    props.$isOpen
      ? "rotate(-45deg) translateX(-9.5px) translateY(5.5px) skewX(50deg)"
      : "skewX(50deg)"};
  position: ${(props) => (props.$isOpen ? "absolute" : "relative")};

  position: relative;
`;
export default Navbar;

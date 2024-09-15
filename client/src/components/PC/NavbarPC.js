import gsap from "gsap";
import { useEffect, useRef, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import LanguageToggle from "../LanguageToggle";
import { LanguageContext } from "../../contexts/LanguageContext";

const NavbarPC = () => {
  const location = useLocation();
  const linkRef = useRef([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    //animation for links to come down from top, fade in one after the other
    gsap.fromTo(
      linkRef.current,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.6,
        stagger: 0.1,
      }
    );
  }, []);
  return (
    <Wrapper>
      <StyledNavLink
        ref={(el) => (linkRef.current[0] = el)}
        $isSelected={location.pathname === "/flashes"}
        to="/flashes"
      >
        {language === "en" ? "FLASHES" : "FLASH"}
      </StyledNavLink>
      <StyledNavLink
        ref={(el) => (linkRef.current[1] = el)}
        $isSelected={location.pathname === "/tattoos"}
        to="/tattoos"
      >
        TATTOOS
      </StyledNavLink>
      <StyledNavLink
        $isSelected={location.pathname === "/afterCare"}
        to="/afterCare"
        ref={(el) => (linkRef.current[2] = el)}
      >
        {language === "en" ? "AFTER CARE" : "POST•TATOUAGE"}
      </StyledNavLink>
      <StyledNavLink
        ref={(el) => (linkRef.current[3] = el)}
        $isSelected={location.pathname === "/book"}
        style={{ textDecoration: "unset" }}
      >
        <LanguageToggle />
      </StyledNavLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 30vw;
  gap: 2vw;
  max-width: 60vw;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #241445;
  font-weight: 1000;
  font-size: 1.4rem;
  text-decoration: ${(props) => (props.$isSelected ? "underline" : "none")};
  font-family: "noah-bold", sans-serif;
  cursor: pointer;
`;
export default NavbarPC;

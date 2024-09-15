import styled from "styled-components";
import { FaInstagram } from "react-icons/fa";
import LOGO from "../../assets/NewLogo.png";
import { FaRegCopyright } from "react-icons/fa";
import gsap from "gsap";
import { useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
const FooterPC = () => {
  const wrapperRef = useRef(null);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        delay: 2,
      }
    );
  }, []);
  return (
    <Wrapper ref={wrapperRef}>
      <TopWrapper>
        <IconLabel>
          <Logo src={LOGO} alt="logo" />
        </IconLabel>
        <IconLabel>
          {" "}
          {language === "en" ? "Street Address" : "Addresse"}{" "}
          <span>
            429 Avenue Viger <br /> E, Montreal, QC
          </span>
        </IconLabel>
        <IconLabel>
          {language === "en" ? "Email Address" : "Addresse Courriel"}{" "}
          <span> V.Black.Tattoos@gmail.com</span>
        </IconLabel>
        <StyledLink href="https://www.instagram.com/v.black.tattoos/">
          Follow Me <Insta /> <span>Instagram</span>
        </StyledLink>
      </TopWrapper>
      <BottomWrapper>
        <FaRegCopyright /> 2024 Veronica Escobar. All Rights Reserved.
      </BottomWrapper>
    </Wrapper>
  );
};
const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  justify-content: baseline;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 700;
  color: #241445;
  text-decoration: none;
  cursor: pointer;
  span {
    font-weight: 400;
  }
`;
const Wrapper = styled.div`
  width: 70vw;
  height: 25vh;
  background-color: #bbabe8;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-top: 1px solid #241445;
  margin: 0 15vw;
  padding-top: 3vh;
`;
const TopWrapper = styled.div`
  height: 15vh;
  width: 70vw;
  display: flex;
  justify-content: space-between;
`;
const BottomWrapper = styled.div`
  height: 10vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #241445;
  font-weight: 700;
`;

const Logo = styled.img`
  height: 10vh;
  position: relative;
  top: -10px;
`;
const Insta = styled(FaInstagram)`
  font-size: 1.3rem;
  color: #241445;
`;

const IconLabel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  justify-content: baseline;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 700;
  color: #241445;
  span {
    font-weight: 400;
  }
`;

export default FooterPC;

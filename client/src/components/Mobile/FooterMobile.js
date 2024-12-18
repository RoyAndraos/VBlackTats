import styled from "styled-components";
import { FaRegCopyright } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { FaInstagram } from "react-icons/fa";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
const FooterMobile = () => {
  const { language } = useContext(LanguageContext);
  return (
    <Wrapper>
      <Logo src={logo} />
      <Container>
        <Bold>{language === "en" ? "Studio address" : "Addresse"}</Bold>
        <span>
          429 Avenue Viger E <br /> Montreal, QC, H2L 2N9
        </span>
      </Container>
      <Container>
        <Bold>{language === "en" ? "Email address" : "Addresse Courriel"}</Bold>
        <span> V.Black.Tattoos@gmail.com</span>
      </Container>

      <StyledLink
        href="https://www.instagram.com/v.black.tattoos/"
        style={{ textDecoration: "none", color: "whitesmoke" }}
      >
        <Bold>Follow me</Bold>
        <span>
          <FaInstagram /> Instagram
        </span>
      </StyledLink>

      <Copy>
        <FaRegCopyright /> 2024 Veronica Escobar. All Rights Reserved.
      </Copy>
    </Wrapper>
  );
};
const Bold = styled.span`
  font-weight: 700;
`;
const Copy = styled.a`
  font-weight: 700;
  color: whitesmoke;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 3px;
  left: 50%;
  font-family: "lora", sans-serif;
  font-size: 13px;
  transform: translateX(-50%);
`;
const Container = styled.div`
  display: grid;
  font-size: 14px;
  grid-template-columns: 32vw 50vw;
  padding-left: 5vw;
  color: whitesmoke;
  span {
    color: whitesmoke;
  }
`;
const StyledLink = styled.a`
  display: grid;
  font-size: 14px;
  grid-template-columns: 32vw 50vw;
  padding-left: 5vw;
  span {
    color: whitesmoke;
  }
`;
const Logo = styled.img`
  height: 10vh;
  width: auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  background-color: #241445;
  position: relative;
  height: 45vh;
  padding: 3vh 0 0 5vw;
  top: 10vh;
  width: 95vw;
  bottom: 0;
  border-top: 1px solid #241445;
`;

export default FooterMobile;

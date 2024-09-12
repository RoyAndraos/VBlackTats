import styled from "styled-components";
import { FaRegCopyright } from "react-icons/fa6";
import logo from "../../assets/NewLogo.png";
import { FaInstagram } from "react-icons/fa";
const FooterMobile = () => {
  return (
    <Wrapper>
      <Logo src={logo} />
      <Container>
        <Bold>Studio address</Bold>
        <span>
          429 Avenue Viger E <br /> Montreal, QC, H2L 2N9
        </span>
      </Container>
      <Container>
        <Bold>Email address</Bold>
        <span> V.Black.Tattoos@gmail.com</span>
      </Container>

      <StyledLink
        href="https://www.instagram.com/v.black.tattoos/"
        style={{ textDecoration: "none", color: "#241445" }}
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
  color: #241445;
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
  color: #241445;
  span {
    color: #241445;
  }
`;
const StyledLink = styled.a`
  display: grid;
  font-size: 14px;
  grid-template-columns: 32vw 50vw;
  padding-left: 5vw;
  span {
    color: #241445;
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
  background-color: #bbabe8;
  position: relative;
  height: 45vh;
  padding-top: 13vh;
  padding: 13vh 0 0 5vw;
`;

export default FooterMobile;

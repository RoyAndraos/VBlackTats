import styled, { keyframes } from "styled-components";
import logo from "../../assets/LOGO.svg";
import NavbarPC from "./NavbarPC";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
const HeaderPC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Left>
        <Logo src={logo} alt="logo" onClick={() => navigate("/")} />
        <NavbarPC />
      </Left>
      <GetInked
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
  gap: 2vw;
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

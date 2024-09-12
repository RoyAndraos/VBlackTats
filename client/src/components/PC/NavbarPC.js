import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
const NavbarPC = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <StyledNavLink
        $isSelected={location.pathname === "/flashes"}
        to="/flashes"
      >
        FLASHES
      </StyledNavLink>
      <StyledNavLink
        $isSelected={location.pathname === "/tattoos"}
        to="/tattoos"
      >
        TATTOOS
      </StyledNavLink>
      <StyledNavLink
        $isSelected={location.pathname === "/afterCare"}
        to="/afterCare"
      >
        AFTER CARE
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
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: ${(props) => (props.$isSelected ? "underline" : "none")};
  letter-spacing: 0.2rem;
  font-family: "EthnocentricRegular", sans-serif;
  cursor: pointer;
`;
export default NavbarPC;

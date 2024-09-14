import styled from "styled-components";
import LandingPage from "./LandingPage";
import FeaturedWork from "./FeaturedWork";
import BookingFormPC from "./BookingFormPC";

const HomePagePC = () => {
  return (
    <Wrapper>
      <LandingPage />
      <FeaturedWork />
      <BookingFormPC book={false} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 5vh 0;
  background-color: #bbabe8;
  top: 10vh;
  gap: 10vh;
`;

export default HomePagePC;

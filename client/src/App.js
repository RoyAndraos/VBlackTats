import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { IsMobileContext } from "./contexts/IsMobileContext";
import HomePageMobile from "./components/Mobile/HomePageMobile";
import HeaderMobile from "./components/Mobile/HeaderMobile";
import HeaderPC from "./components/PC/HeaderPC";
import HomePagePC from "./components/PC/HomePagePC";
import FooterMobile from "./components/Mobile/FooterMobile";
import FooterPC from "./components/PC/FooterPC";
import styled from "styled-components";
import BookingForm from "./components/BookingForm";
import AfterCare from "./components/AfterCare";
import FlashesMobile from "./components/Mobile/FlashesMobile";
import Login from "./components/Login";
import BookingFormFlash from "./components/BookingFormFlash";
import TattoosMobile from "./components/Mobile/TattoosMobile";
import TattoosPC from "./components/PC/TattoosPC";
import FlashesPC from "./components/PC/FlashesPC";
import BookingFormPC from "./components/PC/BookingFormPC";
import BookingFormFlashPC from "./components/PC/BookingFormFlashPC";
import TransitionComponent from "./components/TransitionComponent";
import Thanks from "./components/Thanks";
const App = () => {
  const { isMobile } = useContext(IsMobileContext);
  const location = useLocation();
  return (
    <Wrapper>
      {isMobile ? (
        <Routes>
          <Route
            path="/admin"
            element={
              <TransitionComponent>
                <Login />
              </TransitionComponent>
            }
          />
          <Route
            path="/afterCare"
            element={
              <TransitionComponent>
                <AfterCare />
              </TransitionComponent>
            }
          />
          <Route
            path="/book"
            element={
              <TransitionComponent>
                <BookingForm />
              </TransitionComponent>
            }
          />
          <Route
            path="/book/:id"
            element={
              <TransitionComponent>
                <BookingFormFlash />
              </TransitionComponent>
            }
          />
          <Route
            path="/tattoos"
            element={
              <TransitionComponent>
                <TattoosMobile />
              </TransitionComponent>
            }
          />
          <Route
            path="/flashes"
            element={
              <TransitionComponent>
                <FlashesMobile />
              </TransitionComponent>
            }
          />
          <Route
            path="/"
            element={
              <TransitionComponent>
                <HomePageMobile />
              </TransitionComponent>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/admin"
            element={
              <TransitionComponent>
                <Login />
              </TransitionComponent>
            }
          />
          <Route
            path="/afterCare"
            element={
              <TransitionComponent>
                <AfterCare />
              </TransitionComponent>
            }
          />
          <Route
            path="/book"
            element={
              <TransitionComponent>
                <BookingFormPC book={true} />
              </TransitionComponent>
            }
          />
          <Route
            path="/bookFlash/:id"
            element={
              <TransitionComponent>
                <BookingFormFlashPC />
              </TransitionComponent>
            }
          />
          <Route
            path="/tattoos"
            element={
              <TransitionComponent>
                <TattoosPC />
              </TransitionComponent>
            }
          />
          <Route
            path="/flashes"
            element={
              <TransitionComponent>
                <FlashesPC />
              </TransitionComponent>
            }
          />
          <Route
            path="/"
            element={
              <TransitionComponent>
                <HomePagePC />
              </TransitionComponent>
            }
          />
          <Route
            path="/thankyou"
            element={
              <TransitionComponent>
                <Thanks />
              </TransitionComponent>
            }
          />
        </Routes>
      )}
      {isMobile ? <HeaderMobile /> : <HeaderPC />}

      {isMobile ? (
        location.pathname === "/book" || location.pathname === "/admin" ? (
          <></>
        ) : (
          <FooterMobile></FooterMobile>
        )
      ) : location.pathname === "/book" || location.pathname === "/admin" ? (
        <></>
      ) : (
        <FooterPC />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #bbabe8;
  min-height: 100vh;
`;

export default App;

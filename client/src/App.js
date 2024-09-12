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

const App = () => {
  const { isMobile } = useContext(IsMobileContext);
  const location = useLocation().pathname;
  return (
    <Wrapper>
      {isMobile ? (
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/afterCare" element={<AfterCare />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/book/:id" element={<BookingFormFlash />} />
          <Route path="/tattoos" element={<TattoosMobile />} />
          <Route path="/flashes" element={<FlashesMobile />} />
          <Route path="/" element={<HomePageMobile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/afterCare" element={<AfterCare />} />
          <Route path="/book" element={<BookingFormPC book={true} />} />
          <Route path="/book/:id" element={<BookingFormFlashPC />} />
          <Route path="/tattoos" element={<TattoosPC />} />
          <Route path="/flashes" element={<FlashesPC />} />
          <Route path="/" element={<HomePagePC />} />
        </Routes>
      )}
      {isMobile ? <HeaderMobile /> : <HeaderPC />}

      {isMobile ? (
        location === "/book" || location === "/admin" ? (
          <></>
        ) : (
          <FooterMobile></FooterMobile>
        )
      ) : location === "/book" || location === "/admin" ? (
        <></>
      ) : (
        <FooterPC />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default App;

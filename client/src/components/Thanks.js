import styled from "styled-components";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useContext } from "react";
import { IsAdminContext } from "../contexts/IsAdminContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { useRef } from "react";
import gsap from "gsap";

const Thanks = () => {
  const { language } = useContext(LanguageContext);
  const { setIsAdmin } = useContext(IsAdminContext);
  const [image, setImage] = useState("");
  const overLayRef = useRef(null);
  const imageRightRef = useRef(null);
  const imageLeftRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
    fetch("https://vblacktats.onrender.com/getLandingPageImagePC")
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data[0]);
      });
  }, [setIsAdmin]);
  useEffect(() => {
    gsap.fromTo(
      overLayRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 1.5,
      }
    );
    gsap.fromTo(
      imageLeftRef.current,
      {
        width: "52vw",
      },
      {
        width: "0",
        duration: 1,
        delay: 1.5,
      }
    );
    gsap.fromTo(
      imageRightRef.current,
      {
        width: "16vw",
      },
      {
        width: "0",
        duration: 1,
        delay: 1.5,
      }
    );
  }, []);

  return (
    <Wrapper>
      <ImageWrap>
        <LeftOverLayer ref={imageLeftRef} />
        <RightOverLayer ref={imageRightRef} />
        <OverLay ref={overLayRef} />
        <Line />
        <StyledImage src={image.url} alt="artist portrait" />
      </ImageWrap>
      <Info>
        {language === "en"
          ? "Thank you for your submission! We will be in touch with you in the next 2 days, please check your junk emails."
          : "Merci pour votre soumission! Nous vous contacterons dans les 2 prochains jours, veuillez vérifier vos courriels indésirables."}
      </Info>
    </Wrapper>
  );
};
const Info = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin: 10vh auto;
  width: 50vw;
  line-height: 2.5rem;
  color: #241441;
  font-weight: 700;
`;
const Wrapper = styled.div`
  height: 92vh;
  position: relative;
  top: 15vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
`;

const LeftOverLayer = styled.div`
  background-color: #bbabe8;
  height: 51vh;
  position: absolute;
  z-index: 1010;
  right: 33vw;
`;
const RightOverLayer = styled.div`
  background-color: #bbabe8;
  position: absolute;
  z-index: 1010;
  height: 51vh;
  left: 69vw;
`;

export const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Line = styled.div`
  position: absolute;
  height: 50vh;
  width: 3vw;
  background-color: #bbabe8;
  right: 30vw;
`;
export const OverLay = styled.div`
  background-color: rgba(66, 0, 255, 0.3);
  width: 70%;
  height: 50vh;
  position: absolute;
`;

export const StyledImage = styled.img`
  object-fit: cover;
  width: 70%;
  height: 50vh;
`;

export default Thanks;

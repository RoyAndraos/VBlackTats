import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import Cookies from "js-cookie";
import ButtonLoader from "../PC/ButtonLoader";
import { FaArrowRight } from "react-icons/fa6";
import { bounce } from "../PC/HeaderPC";
import { MdOutlineCameraswitch } from "react-icons/md";
import BookingForm from "../BookingForm";
import FeaturedWork from "../PC/FeaturedWork";
import gsap from "gsap";
import { LanguageContext } from "../../contexts/LanguageContext";
import sticker from "../../assets/stickerVeroSmall.png";
const HomePageMobile = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState("");
  const [oldImageId, setOldImageId] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const { setIsAdmin, isAdmin } = useContext(IsAdminContext);
  const imgWrapRef = useRef(null);
  const secondImgWrapRef = useRef(null);
  const handleAddClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };
  useEffect(() => {
    gsap.fromTo(
      imgWrapRef.current,
      {
        height: "19vh",
      },
      {
        height: "0",
        duration: 1,
        delay: 1.5,
      }
    );
    gsap.fromTo(
      secondImgWrapRef.current,
      {
        height: "51vh",
      },
      {
        height: "0",
        duration: 1,
        delay: 1.5,
      }
    );
  }, []);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
    fetch("https://vblacktats.onrender.com/getLandingPageImage")
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data[0]);
        setOldImageId(data.data[0].public_id);
      });
  }, [setIsAdmin]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the selected file in state
      setImage({ url: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("oldImage", oldImageId);
      setLoading(true);
      fetch("https://vblacktats.onrender.com/uploadLandingPageImage", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setSelectedFile(null); // Clear the selected file after submission
            setImage(data.data);
            setOldImageId("");
            setLoading(false);
            // Optionally refresh the images list here
          } else {
            console.error("Failed to upload image:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  return (
    <Wrapper>
      <ImageWrap>
        <SlidingOverlay ref={imgWrapRef} />
        <SlidingOverlayTwo ref={secondImgWrapRef} />
        <OverLay />
        <Sticker src={sticker} alt="flash sticker" />

        {isAdmin && (
          <>
            <AddButton onClick={handleAddClick}>
              <MdOutlineCameraswitch style={{ fontSize: "1.5rem" }} />
            </AddButton>
            <FileInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <SubmitButton
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? (
                  <ButtonLoader style={{ transform: "scale(0.5)" }} />
                ) : (
                  "Submit"
                )}
              </SubmitButton>
            )}
          </>
        )}
        <Greetings>I'M VERONICA.</Greetings>

        <StyledImage src={image.url} alt="artist portrait" />
        <GetInked
          onClick={() => {
            navigate("/book");
          }}
        >
          {language === "en" ? "GET INKED!" : "ENCRE TON STYLE!"}
          <span>
            <FaArrowRight />
          </span>
        </GetInked>
      </ImageWrap>
      <FeaturedWork />
      <BookingForm />
    </Wrapper>
  );
};
const Sticker = styled.img`
  position: absolute;
  width: 20vw;
  height: auto;
  bottom: 10vh;
  right: 15vw;
  opacity: 0.9;
`;
const SlidingOverlay = styled.div`
  background-color: #241441;
  position: absolute;
  top: 51vh;
  z-index: 10000;
  width: 91%;
`;

const SlidingOverlayTwo = styled.div`
  background-color: #241441;
  position: absolute;
  bottom: 19vh;
  z-index: 10000;
  width: 91%;
`;

const GetInked = styled.button`
  font-size: 1rem;
  color: whitesmoke;
  padding: 0.7vh 2vw;
  border: none;
  position: absolute;
  border-radius: 3px;
  background-color: #241441;
  font-family: "EthnocentricRegular", sans-serif !important;
  box-shadow: #c4b6eb 5px 5px 0px -2px, #241441 5px 5px;
  display: flex;
  align-items: center;
  gap: 1vw;
  letter-spacing: 0.1rem;
  bottom: -60px;
  right: 5vw;
  &:hover {
    span {
      animation: ${bounce} 0.5s ease-in-out infinite; /* Bounce effect */
    }
  }
`;
const SubmitButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  position: absolute;
  bottom: -150px;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 5px;
  left: 0;
  min-width: 120px; /* Set a minimum width for the button */
  min-height: 40px; /* Set a minimum height for the button */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  position: absolute;
  bottom: -80px;
  left: 5vw;
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px;
`;
const Wrapper = styled.div`
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3vh 0;
  position: relative;
  background-color: #bbabe8;
  top: 8vh;
`;
const Greetings = styled.h1`
  color: black;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  position: absolute;
  font-family: "Lora", sans-serif;
  left: 10vw;
  top: 6vh;
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const Line = styled.div`
//   position: absolute;
//   height: 70vh;
//   width: 3vw;
//   background-color: #bbabe8;
//   right: 30vw;
// `;
// const LineTwo = styled.div`
//   position: absolute;
//   height: 3vw;
//   width: 90vw;
//   background-color: #bbabe8;
//   left: 5vw;
//   top: 50vh;
// `;

const FileInput = styled.input`
  display: none;
`;
export const OverLay = styled.div`
  background-color: rgba(66, 0, 255, 0.3);
  width: 90%;
  height: 70vh;
  position: absolute;
`;

export const StyledImage = styled.img`
  object-fit: cover;
  width: 90%;
  height: 70vh;
  object-position: 40% 0;
`;

export default HomePageMobile;

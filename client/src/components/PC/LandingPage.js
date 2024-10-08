import styled from "styled-components";
import { GetInked } from "./HeaderPC";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import Cookies from "js-cookie";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import { FileInput } from "./TattoosPC";
import ButtonLoader from "./ButtonLoader";
import gsap from "gsap";
import { LanguageContext } from "../../contexts/LanguageContext";
import stickerVeroSmall from "../../assets/stickerVeroSmall.png";
const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState("");
  const [oldImageId, setOldImageId] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { setIsAdmin, isAdmin } = useContext(IsAdminContext);
  const { language } = useContext(LanguageContext);
  const overLayRef = useRef(null);
  const imageRightRef = useRef(null);
  const imageLeftRef = useRef(null);
  const greetingsRef = useRef(null);
  const buttonRef = useRef(null);
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
        width: "53vw",
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
        width: "18vw",
      },
      {
        width: "0",
        duration: 1,
        delay: 1.5,
      }
    );
    gsap.fromTo(
      greetingsRef.current,
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
      buttonRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 2.5,
        y: 0,
      }
    );
  }, []);
  const handleAddClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
    fetch("https://vblacktats.onrender.com/getLandingPageImagePC")
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
      fetch("https://vblacktats.onrender.com/uploadLandingPageImagePC", {
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
    <Container>
      <ImageWrap>
        {isAdmin && (
          <>
            <AddButton onClick={handleAddClick}>+</AddButton>
            <FileInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
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
          </>
        )}{" "}
        <LeftOverLayer ref={imageLeftRef} />
        <RightOverLayer ref={imageRightRef} />
        <Greetings ref={greetingsRef}>I'M VERONICA.</Greetings>
        <OverLay ref={overLayRef} />
        <Sticker src={stickerVeroSmall} alt="flash sticker" />
        <StyledImage src={image.url} alt="artist portrait" />
      </ImageWrap>
      <GetInked
        style={{ left: "25vw", marginTop: "30px", zIndex: "0" }}
        onClick={() => {
          navigate("/book");
        }}
        ref={buttonRef}
      >
        {language === "en" ? "GET INKED!" : "ENCRE TON STYLE!"}{" "}
        <span>
          <FaArrowRightLong style={{ fontSize: "1.5rem" }} />
        </span>
      </GetInked>
    </Container>
  );
};

const Sticker = styled.img`
  position: absolute;
  width: 5vw;
  bottom: 5vh;
  right: 20vw;
  opacity: 0.9;
`;
const LeftOverLayer = styled.div`
  background-color: #bbabe8;
  height: 51vh;
  position: absolute;
  z-index: 1010;
  right: 32vw;
`;
const RightOverLayer = styled.div`
  background-color: #bbabe8;
  position: absolute;
  z-index: 1010;
  height: 51vh;
  left: 68vw;
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
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  width: 100%;
`;
const Greetings = styled.h1`
  color: transparent;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0;
  position: absolute;
  font-family: "Lora", sans-serif;
  top: 30px;
  left: 18vw;
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
export default LandingPage;

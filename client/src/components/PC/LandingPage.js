import styled from "styled-components";
import { GetInked } from "./HeaderPC";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import Cookies from "js-cookie";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import { FileInput } from "./TattoosPC";
import ButtonLoader from "./ButtonLoader";
const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState("");
  const [oldImageId, setOldImageId] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { setIsAdmin, isAdmin } = useContext(IsAdminContext);
  const handleAddClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };
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
        )}
        <Greetings>I'M VERONICA.</Greetings>
        <OverLay />
        <Line />
        <StyledImage src={image.url} alt="artist portrait" />
      </ImageWrap>
      <GetInked
        style={{ left: "25vw", marginTop: "30px", zIndex: "0" }}
        onClick={() => {
          navigate("/book");
        }}
      >
        GET INKED!{" "}
        <span>
          <FaArrowRightLong style={{ fontSize: "1.5rem" }} />
        </span>
      </GetInked>
    </Container>
  );
};

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
  object-position: 0 80%;
`;
export default LandingPage;

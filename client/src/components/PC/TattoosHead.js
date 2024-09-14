import { useState, useContext, useRef, useEffect } from "react";
import { OverLay, Line, StyledImage, ImageWrap } from "./LandingPage";
import styled from "styled-components";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import ButtonLoader from "./ButtonLoader";
import { MdOutlineCameraswitch } from "react-icons/md";
import gsap from "gsap";

const TattoosHead = () => {
  const [oldImageId, setOldImageId] = useState("");
  const [selectedFileForHead, setSelectedFileForHead] = useState();
  const [headImage, setHeadImage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { isAdmin } = useContext(IsAdminContext);
  const overLayRef = useRef(null);
  const imageRightRef = useRef(null);
  const imageLeftRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      overLayRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 1,
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
        delay: 1,
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
        delay: 1,
      }
    );
  }, []);
  useEffect(() => {
    fetch("https://vblacktats.onrender.com/getTattoosPageImage")
      .then((res) => res.json())
      .then((data) => {
        setHeadImage(data.data[0]);
        setOldImageId(data.data[0].public_id);
      });
  }, []);

  const handleAddClick = () => {};
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileForHead(file);
      setHeadImage({ url: URL.createObjectURL(file) });
    }
  };
  const handleSubmit = () => {
    if (selectedFileForHead) {
      const formData = new FormData();
      formData.append("file", selectedFileForHead);
      formData.append("oldImage", oldImageId);
      setLoading(true);
      fetch("https://vblacktats.onrender.com/uploadTattoosImage", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setSelectedFileForHead(null);
            setHeadImage(data.data);
            setOldImageId("");
            setLoading(false);
          } else {
            console.error("Failed to upload image:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <Wrapper>
      <ImageWrap>
        <LeftOverLayer ref={imageLeftRef} />
        <RightOverLayer ref={imageRightRef} />
        <OverLay ref={overLayRef} />
        <Line />
        <StyledImage src={headImage.url} alt="artist portrait" />
      </ImageWrap>
      {isAdmin && (
        <div style={{ position: "relative", left: "20vw" }}>
          <AddButton onClick={handleAddClick}>
            <MdOutlineCameraswitch />
          </AddButton>
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
        </div>
      )}
    </Wrapper>
  );
};
const LeftOverLayer = styled.div`
  background-color: #bbabe8;
  width: 51.5vw;
  height: 51vh;
  position: absolute;
  z-index: 1010;
  right: 33vw;
`;
const RightOverLayer = styled.div`
  background-color: #bbabe8;
  position: absolute;
  width: 15vw;
  z-index: 1010;
  height: 51vh;
  left: 69vw;
`;
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 5vh;
`;
const SubmitButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  position: absolute;
  bottom: -150px;
  padding: 10px 20px;
  border-radius: 5px;
  min-width: 120px; /* Set a minimum width for the button */
  min-height: 40px; /* Set a minimum height for the button */
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
`;
const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  position: absolute;
  bottom: -80px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
`;

const FileInput = styled.input`
  display: none;
`;

export default TattoosHead;

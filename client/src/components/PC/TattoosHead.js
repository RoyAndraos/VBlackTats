import { useState, useContext, useRef, useEffect } from "react";
import { OverLay, Line, StyledImage, ImageWrap } from "./LandingPage";
import styled from "styled-components";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import ButtonLoader from "./ButtonLoader";
import { MdOutlineCameraswitch } from "react-icons/md";
const TattoosHead = () => {
  const [oldImageId, setOldImageId] = useState("");
  const [selectedFileForHead, setSelectedFileForHead] = useState();
  const [headImage, setHeadImage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { isAdmin } = useContext(IsAdminContext);

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
        <OverLay />
        <Line />
        <StyledImage src={headImage.url} alt="artist portrait" />
      </ImageWrap>
      {isAdmin && (
        <div style={{ position: "relative" }}>
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
const Wrapper = styled.div`
  height: 70vh;
  width: 100%;
  position: relative;
  padding: 50px 0 30px 0;
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

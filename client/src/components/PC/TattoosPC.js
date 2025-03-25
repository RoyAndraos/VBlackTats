import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import ConfirmationModal from "../ConfirmationModal";
import Cookies from "js-cookie";
import TattoosHead from "./TattoosHead";
import { TimelineLite } from "gsap";
import { LanguageContext } from "../../contexts/LanguageContext";
const TattoosPC = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);
  const { language } = useContext(LanguageContext);
  const fileInputRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const titleRefTwo = useRef(null);

  useLayoutEffect(() => {
    if (!loading && images.length > 0) {
      const tl = new TimelineLite();
      tl.fromTo(
        titleRefTwo.current,
        { opacity: 0, y: 40 },
        { opacity: 1, duration: 1, y: 0 },
        "+=2"
      );
      tl.fromTo(
        contentWrapperRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, duration: 1, y: 0 },
        "-=1"
      );
    }
  }, [loading, images]);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
    setLoading(true);
    fetch("https://vblacktats.onrender.com/getTattoos")
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No images found") {
          setImages([]);
          setLoading(false);
          return;
        }
        setImages(data.data);
        setLoading(false);
      });
  }, [setIsAdmin]);

  const handleAddClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the selected file in state
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("https://vblacktats.onrender.com/uploadTattoo", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setSelectedFile(null); // Clear the selected file after submission
            setImages([...images, data.data]);
            // Optionally refresh the images list here
          } else {
            console.error("Failed to upload image:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    fetch(`https://vblacktats.onrender.com/deleteTattoo/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setImages(
            images.filter((img) => {
              return img.public_id.split("Tattoo/")[1] !== deleteId;
            })
          );
        } else {
          console.error("Failed to delete image:", data.message);
        }
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsModalVisible(false);
      });
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <Wrapper></Wrapper>;
  } else if (images.length === 0) {
    return (
      <Wrapper>
        <TattoosHead />
        {language === "en" ? "No images found" : "Aucune image trouvée"}
        {isAdmin && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddButton onClick={handleAddClick}>
              {language === "en" ? "Add Tattoo" : "Ajouter Un Tattoo"}
            </AddButton>
            <FileInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <>
                <PreviewImage
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                />

                <SubmitButton onClick={handleSubmit}>
                  {language === "en" ? "Submit" : "Soumettre"}
                </SubmitButton>
              </>
            )}
          </div>
        )}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Title style={{ alignSelf: "center", marginLeft: "0" }}>TATTOOS</Title>
      <TattoosHead />
      <Title ref={titleRefTwo}>
        {" "}
        {language === "en" ? "Featured work" : "Nos Réalisations"}
      </Title>
      {isAdmin && (
        <>
          <AddButton onClick={handleAddClick}>
            {language === "en" ? "Add A Tattoo" : "Ajouter Un Tattoo"}
          </AddButton>
          <FileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <>
              <PreviewImage
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
              />

              <SubmitButton onClick={handleSubmit}>
                {language === "en" ? "Submit" : "Soumettre"}
              </SubmitButton>
            </>
          )}
        </>
      )}
      <ImagesWrapper ref={contentWrapperRef}>
        {images.map((img) => {
          return (
            <Flash key={img.asset_id}>
              {isAdmin && (
                <Delete
                  onClick={() =>
                    confirmDelete(img.public_id.split("Tattoo/")[1])
                  }
                >
                  X
                </Delete>
              )}
              <OverLay></OverLay>
              <FlashImage src={img.url} alt={"flash tattoo"} />
            </Flash>
          );
        })}
      </ImagesWrapper>

      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Wrapper>
  );
};

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust the spacing between images */
  justify-content: space-between;
  align-items: center;
  margin: 0 100px;
  width: 70vw;
  border-top: 1px solid #241441;
  padding-top: 20px;
`;
const Title = styled.h1`
  letter-spacing: -0.5rem;
  font-family: "noah-bold", sans-serif;
  /* text-shadow: 3px 3px 0px #c4b6eb, 6px 6px 0px #241441; */
  color: #241441;
  letter-spacing: 0.5rem;
  font-size: 3rem;
  align-self: flex-start;
  padding: 0;
  margin-left: 15vw;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  top: 10vh;
  background-color: #bbabe8;
  padding-bottom: 10vh;
  margin-bottom: 10vh;
`;
const Delete = styled.button`
  background-color: #c90000;
  border: none;
  font-size: 1.5rem;
  color: whitesmoke;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-family: "roboto", sans-serif;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1000;
`;

const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  padding: 10px 20px;
  font-family: "lora", sans-serif;
  border-radius: 3px;
  margin: 20px;
`;

export const FileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 30vw;
  height: auto;
  margin: 20px;
`;

const SubmitButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 5px;
`;

const FlashImage = styled.img`
  width: 20vw;
  aspect-ratio: 4/5;
  object-fit: cover;
  cursor: pointer;
`;

const OverLay = styled.div`
  background-color: rgba(66, 0, 255, 0.3);
  width: 20vw;
  aspect-ratio: 4/5;
  position: absolute;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: transparent;
  }
`;
const Flash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 20vw;
  position: relative;
`;
export default TattoosPC;

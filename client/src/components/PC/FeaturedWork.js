import styled from "styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import ConfirmationModal from "../ConfirmationModal";
import Cookies from "js-cookie";
import Loader from "./Loader";
import gsap from "gsap";
import { LanguageContext } from "../../contexts/LanguageContext";

const FeaturedWork = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);
  const { language } = useContext(LanguageContext);
  const fileInputRef = useRef(null);
  const wrapperRef = useRef(null);
  const isMobile = window.innerWidth < 1000;
  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        delay: 2.6,
      }
    );
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
    setLoading(true);
    fetch("https://vblacktats.onrender.com/getFeatured")
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

      fetch("https://vblacktats.onrender.com/uploadFeatured", {
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
    fetch(`https://vblacktats.onrender.com/deleteFeatured/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setImages(
            images.filter((img) => {
              return img.public_id.split("Featured/")[1] !== deleteId;
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
    return isMobile ? (
      <div style={{ height: "90vh", position: "relative", width: "100vw" }}>
        <Loader />
      </div>
    ) : (
      <Wrapper>
        <Title>
          {language === "en" ? "Featured Work" : "Nos Réalisations"}
        </Title>
        <Loader />
      </Wrapper>
    );
  } else if (images.length === 0) {
    return (
      <Wrapper ref={wrapperRef}>
        <Title>
          {language === "en" ? "Featured Work" : "Nos Réalisations"}
        </Title>
        {language === "en" ? "No images found" : "Aucune image trouvée"}
        {isAdmin && (
          <>
            <AddButton onClick={handleAddClick}>
              {language === "en"
                ? "Add Featured Image"
                : "Ajouter aux réalisations"}
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

                <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
              </>
            )}
          </>
        )}
      </Wrapper>
    );
  }
  return (
    <Wrapper ref={wrapperRef}>
      <Title>{language === "en" ? "Featured Work" : "Nos Réalisations"}</Title>
      {isAdmin && (
        <>
          <AddButton onClick={handleAddClick}>
            {" "}
            {language === "en"
              ? "Add Featured Image"
              : "Ajouter aux réalisations"}
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
                {language === "en" ? "Submit" : "Envoyer"}
              </SubmitButton>
            </>
          )}
        </>
      )}
      <ImagesWrapper>
        {images.map((img) => {
          return (
            <Flash key={img.asset_id}>
              {isAdmin && (
                <Delete
                  onClick={() =>
                    confirmDelete(img.public_id.split("Featured/")[1])
                  }
                >
                  X
                </Delete>
              )}
              <ImageWrap $images={images.length}>
                <OverLay />
                <FlashImage src={img.url} alt={"featured tattoo"} />
              </ImageWrap>
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
const Title = styled.h1`
  font-size: 2rem;
  position: absolute;
  top: -10vh;
  left: 0;
  font-family: "noah-bold", sans-serif;
  background-color: #bbabe8;
  @media (max-width: 1000px) {
    position: relative;
    top: 0;
    font-size: 1.5rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 70vw;
  top: 10vh;
  min-height: 20vh;
  background-color: #bbabe8;
  margin-bottom: 10vh;
  @media (max-width: 1000px) {
    width: 100vw;
    top: 0;
    overflow-y: hidden;
  }
`;
const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    overflow-y: hidden;
  }
`;
const ImageWrap = styled.div`
  position: relative;
  width: ${(props) => `calc(65vw / ${props.$images})`};
  height: 30vw;
  @media (max-width: 1000px) {
    width: 80vw;
    height: unset;
    aspect-ratio: 4/5;
  }
`;
const OverLay = styled.div`
  background-color: rgba(66, 0, 255, 0.38);
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: transparent;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Delete = styled.button`
  background-color: #930000;
  border: none;
  font-size: 1rem;
  color: whitesmoke;
  border-radius: 50%;
  font-weight: 700;
  width: 30px;
  font-family: "roboto", sans-serif;
  height: 30px;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1;
`;

const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  border-radius: 3px;
  padding: 10px 20px;
  font-family: "lora", sans-serif;
  margin: 20px;
`;

const FileInput = styled.input`
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
  @media (max-width: 1000px) {
    border: 3px solid #241441;
  }
`;
const Flash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

export default FeaturedWork;

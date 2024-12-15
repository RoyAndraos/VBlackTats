import React, { useContext, useEffect, useState, useRef } from "react";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import { GetInked } from "../PC/HeaderPC";
import Loader from "../PC/Loader";
import { LanguageContext } from "../../contexts/LanguageContext";
import FooterMobile from "./FooterMobile";
const FlashesMobile = () => {
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState({
    name: "",
    price: "",
    size: "",
  });
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useContext(IsAdminContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    // https://vblacktats.onrender.com
    fetch("https://vblacktats.onrender.com/getFlash")
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
  }, []);
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
      formData.append("price", formDataInfo.price);
      formData.append("artSize", formDataInfo.size);

      if (formDataInfo.name !== "") {
        formData.append("artName", formDataInfo.name);
      }

      fetch("https://vblacktats.onrender.com/uploadFlashImage", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setSelectedFile(null); // Clear the selected file after submission
            let newData = data.data;
            newData.price = formDataInfo.price;
            newData.size = formDataInfo.size;
            newData.name = formDataInfo.name;
            setImages([...images, newData]);
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
    fetch(`https://vblacktats.onrender.com/deleteFlash/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setImages(
            images.filter((img) => {
              return img.public_id.split("Flash/")[1] !== deleteId;
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
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (images.length === 0) {
    return (
      <Wrapper>
        {language === "en" ? "No images found" : "Aucune image trouvée"}
        {isAdmin && (
          <>
            <AddButton onClick={handleAddClick}>+</AddButton>
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
                <input
                  type="text"
                  placeholder="name"
                  onChange={(e) => {
                    setFormDataInfo({ ...formDataInfo, name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="price"
                  required
                  onChange={(e) => {
                    setFormDataInfo({ ...formDataInfo, price: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="size"
                  required
                  onChange={(e) => {
                    setFormDataInfo({ ...formDataInfo, size: e.target.value });
                  }}
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
    <Wrapper>
      {isAdmin && (
        <>
          <AddButton onClick={handleAddClick}>+</AddButton>
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
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setFormDataInfo({ ...formDataInfo, name: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="price"
                required
                onChange={(e) => {
                  setFormDataInfo({ ...formDataInfo, price: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="size"
                required
                onChange={(e) => {
                  setFormDataInfo({ ...formDataInfo, size: e.target.value });
                }}
              />
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </>
          )}
        </>
      )}
      <FlashesWrapper>
        {images.map((img) => {
          return (
            <Flash key={img.asset_id}>
              {isAdmin && (
                <Delete
                  onClick={() =>
                    confirmDelete(img.public_id.split("Flash/")[1])
                  }
                >
                  X
                </Delete>
              )}
              <FlashImage src={img.url} alt={"flash tattoo"} />
              <BottomWrapp>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  <Info style={{ fontWeight: "700" }}>
                    {language === "en" ? "price" : "prix"}{" "}
                  </Info>{" "}
                  <Info>{img.price}</Info>{" "}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Info style={{ fontWeight: "700" }}>
                    {language === "en" ? "size" : "taille"}{" "}
                  </Info>
                  <Info>{img.size}</Info>
                </div>
              </BottomWrapp>
              <GetInked
                style={{ padding: "10px 25px" }}
                onClick={() => {
                  navigate(`/book/${img.public_id.split("Flash/")[1]}`);
                }}
              >
                {language === "en" ? "Book" : "Réserver"}
              </GetInked>
            </Flash>
          );
        })}
      </FlashesWrapper>
      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <FooterMobile />
    </Wrapper>
  );
};
const FlashesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  top: 8vh;
  padding-top: 40px;
  min-height: 100vh;
  background-color: #bbabe8;
`;

const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1.2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  z-index: 100;
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 85vw;
  height: auto;
  margin: 20px;
`;

const SubmitButton = styled.button`
  background-color: #f9a109;
  border: none;
  margin-bottom: 20px;
`;

const BottomWrapp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Info = styled.p`
  font-size: 1.2rem;
  margin: 5px;
  color: #241441;
`;
const FlashImage = styled.img`
  width: 85vw;
  max-width: 500px;
  aspect-ratio: 4/5;
  object-fit: cover;
`;

const Flash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  &:last-child {
    margin-bottom: 20vh;
  }
`;

const Delete = styled.button`
  background-color: #c90000;
  border: none;
  font-size: 1.2rem;
  color: whitesmoke;
  border-radius: 50%;
  font-family: "roboto", sans-serif;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 100;
`;
export default FlashesMobile;

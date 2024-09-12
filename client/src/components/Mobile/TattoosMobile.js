import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import ConfirmationModal from "../ConfirmationModal";
import Loader from "../PC/Loader";
const TattoosMobile = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useContext(IsAdminContext);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/getTattoos")
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

      fetch("http://localhost:5000/uploadTattoo", {
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
    fetch(`http://localhost:5000/deleteTattoo/${deleteId}`, {
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
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (images.length === 0) {
    return (
      <Wrapper>
        No images found
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
                    confirmDelete(img.public_id.split("Tattoo/")[1])
                  }
                >
                  X
                </Delete>
              )}
              <OverLay> </OverLay>
              <FlashImage src={img.url} alt={"flash tattoo"} />
            </Flash>
          );
        })}
      </FlashesWrapper>
      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Wrapper>
  );
};

const FlashesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
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
  font-size: 2rem;
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

const FlashImage = styled.img`
  width: 85vw;
  aspect-ratio: 4/5;
  object-fit: cover;
`;
const OverLay = styled.div`
  background-color: rgba(66, 0, 255, 0.3);
  width: 85vw;
  aspect-ratio: 4/5;
  position: absolute;
  top: 0;
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
  position: relative;
  &:last-child {
    margin-bottom: 20vh;
  }
`;

const Delete = styled.button`
  background-color: #c90000;
  border: none;
  font-size: 1.5rem;
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
export default TattoosMobile;

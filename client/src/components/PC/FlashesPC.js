import React, { useContext, useEffect, useState, useRef } from "react";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import Cookies from "js-cookie";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GetInked } from "./HeaderPC";
import Loader from "./Loader";
import FlashesHead from "./FlashesHead";
const FlashesPC = () => {
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState({
    name: "",
    price: "",
    size: "",
  });
  const [openImage, setOpenImage] = useState();
  const [loading, setLoading] = useState(false);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
    setLoading(true);
    fetch("http://localhost:5000/getFlash")
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
  const handlePrevious = () => {
    const currentIndex = images.findIndex((img) => img.url === openImage);
    if (currentIndex === 0) {
      setOpenImage(images[images.length - 1].url);
    } else {
      setOpenImage(images[currentIndex - 1].url);
    }
  };
  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.url === openImage);
    if (currentIndex === images.length - 1) {
      setOpenImage(images[0].url);
    } else {
      setOpenImage(images[currentIndex + 1].url);
    }
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  if (loading) {
    return (
      <Wrapper>
        <Title style={{ position: "absolute", top: "0" }}>FLASHES</Title>
        <Loader />
      </Wrapper>
    );
  } else if (images.length === 0) {
    return (
      <Wrapper>
        <Title>FLASHES</Title>
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
              <StyledForm>
                <PreviewImage
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                />

                <LabelInput>
                  Name
                  <StyledInput
                    type="text"
                    onChange={(e) => {
                      setFormDataInfo({
                        ...formDataInfo,
                        name: e.target.value,
                      });
                    }}
                  />
                </LabelInput>
                <LabelInput>
                  Price
                  <StyledInput
                    type="text"
                    required
                    onChange={(e) => {
                      setFormDataInfo({
                        ...formDataInfo,
                        price: e.target.value,
                      });
                    }}
                  />
                </LabelInput>
                <LabelInput>
                  Size
                  <StyledInput
                    type="text"
                    required
                    onChange={(e) => {
                      setFormDataInfo({
                        ...formDataInfo,
                        size: e.target.value,
                      });
                    }}
                  />
                </LabelInput>
                <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
              </StyledForm>
            )}
          </>
        )}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Title>FLASHES</Title>
      <FlashesHead />

      {isAdmin && (
        <>
          <AddButton onClick={handleAddClick}>+</AddButton>
          <FileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <StyledForm>
              <PreviewImage
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
              />

              <LabelInput>
                Name
                <StyledInput
                  type="text"
                  onChange={(e) => {
                    setFormDataInfo({
                      ...formDataInfo,
                      name: e.target.value,
                    });
                  }}
                />
              </LabelInput>
              <LabelInput>
                Price
                <StyledInput
                  type="text"
                  required
                  onChange={(e) => {
                    setFormDataInfo({
                      ...formDataInfo,
                      price: e.target.value,
                    });
                  }}
                />
              </LabelInput>
              <LabelInput>
                Size
                <StyledInput
                  type="text"
                  required
                  onChange={(e) => {
                    setFormDataInfo({
                      ...formDataInfo,
                      size: e.target.value,
                    });
                  }}
                />
              </LabelInput>
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </StyledForm>
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
                    confirmDelete(img.public_id.split("Flash/")[1])
                  }
                >
                  X
                </Delete>
              )}
              <FlashImage
                src={img.url}
                alt={"flash tattoo"}
                onClick={() => {
                  setOpenImage(img.url);
                }}
              />
              <OverLay
                onClick={() => {
                  setOpenImage(img.url);
                }}
              ></OverLay>
              <BottomWrapp>
                <Info>price: {img.price}</Info> <Info>size: {img.size}</Info>
              </BottomWrapp>
              <GetInked
                onClick={() => {
                  navigate(`/book/${img.public_id.split("Flash/")[1]}`);
                }}
              >
                Book
              </GetInked>
            </Flash>
          );
        })}
      </ImagesWrapper>
      {openImage && (
        <AllScreen>
          <Left onClick={() => handlePrevious()} />
          <BigImage src={openImage} alt={"big tattoo"} />
          <CloseButton onClick={() => setOpenImage(null)}>X</CloseButton>
          <Right onClick={() => handleNext()} />
        </AllScreen>
      )}
      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Wrapper>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  min-height: 70vh;
  width: 70vw;
  border: 2px solid #f9a109;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #f9a109;
`;
const LabelInput = styled.label`
  font-size: 1.5rem;
  margin-bottom: 10px;
  width: 30%;
`;

const BottomWrapp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Info = styled.p`
  font-size: 1.2rem;
  margin: 5px;
  cursor: default;
`;

const Left = styled(FaChevronLeft)`
  position: absolute;
  top: 50%;
  left: 10vw;
  font-size: 4rem;
  color: whitesmoke;
  cursor: pointer;
  z-index: 1010;
  transition: opacity 0.3s;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Right = styled(FaChevronRight)`
  position: absolute;
  top: 50%;
  right: 10vw;
  font-size: 4rem;
  color: whitesmoke;
  cursor: pointer;
  opacity: 0.7;
  z-index: 1010;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const AllScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1010;
`;
const BigImage = styled.img`
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 100px;
  right: 100px;
  font-size: 4rem;
  color: whitesmoke;
  border: none;
  opacity: 0.5;
  background-color: transparent;
  width: 30px;
  font-family: "roboto", sans-serif;
  height: 30px;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust the spacing between images */
  justify-content: center;
  align-items: center;
  margin: 0 100px;
  width: 70vw;
  border-top: 1px solid #241441;
  padding-top: 20px;
`;
const Title = styled.h1`
  letter-spacing: -0.1rem;
  font-family: "EthnocentricRegular", sans-serif;
  text-shadow: 3px 3px 0px #c4b6eb, 6px 6px 0px #241441;
  color: #241441;
  letter-spacing: 0.5rem;
  font-size: 3rem;
  padding: 0;
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
`;
const Delete = styled.button`
  background-color: #c90000;
  border: none;
  font-size: 1rem;
  color: whitesmoke;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 30px;
  right: 30px;
  text-align: center;
  line-height: 30px; /* Aligns text vertically */
  font-family: "roboto", sans-serif;
`;
const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
  width: 20vw;
  position: relative;
  padding-right: 2vw;
  border-right: 1px solid #241441;
  padding-left: 1vw;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
    padding-right: 0;
  }
`;
export default FlashesPC;

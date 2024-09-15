import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { IsAdminContext } from "../../contexts/IsAdminContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import Cookies from "js-cookie";
import { GetInked } from "./HeaderPC";
import FlashesHead from "./FlashesHead";
import { TimelineLite } from "gsap";
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
  const [loading, setLoading] = useState(false);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();
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

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <Wrapper></Wrapper>;
  } else if (images.length === 0) {
    return (
      <Wrapper>
        <Title style={{ alignSelf: "center" }}>FLASHES</Title>
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
      <Title
        style={{
          alignSelf: "center",
          marginLeft: "0",
        }}
      >
        FLASHES
      </Title>
      <FlashesHead />
      <Title ref={titleRefTwo}>Featured work</Title>
      {isAdmin && (
        <>
          <AddButton onClick={handleAddClick}>Add A Flash</AddButton>
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
      <ImagesWrapper ref={contentWrapperRef}>
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
              <OverLay />
              <BottomWrapp>
                <Info>price: {img.price}</Info> <Info>size: {img.size}</Info>
              </BottomWrapp>
              <GetInked
                onClick={() => {
                  navigate(`/bookFlash/${img.public_id.split("Flash/")[1]}`);
                }}
              >
                Book
              </GetInked>
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

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
  justify-content: center;
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
  font-weight: 700;
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
  z-index: 1000;
`;
const AddButton = styled.button`
  background-color: #241441;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  border-radius: 3px;
  font-family: "lora", sans-serif;
  padding: 10px 20px;
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
`;
export default FlashesPC;

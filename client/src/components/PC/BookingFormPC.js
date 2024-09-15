import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import styled, { keyframes } from "styled-components";
import Cookies from "js-cookie";
import { IsAdminContext } from "../../contexts/IsAdminContext";

import { FaArrowRightLong } from "react-icons/fa6";
import formImg from "../../assets/formImg.jpg";
const BookingFormPC = ({ book }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
    placement: "",
    size: "",
    description: "",
    files: {
      tattooRef: [],
      placementRef: [],
    },
  });
  const [numbeAlert, setNumberAlert] = useState(false);
  const [ageAlert, setAgeAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
  const [filePreviews, setFilePreviews] = useState({
    tattooRef: [],
    placementRef: [],
  });
  const { language } = useContext(LanguageContext);
  const { setIsAdmin } = useContext(IsAdminContext);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
  }, [setIsAdmin]);
  useEffect(() => {
    return () => {
      // Revoke object URLs when component unmounts
      filePreviews.tattooRef.forEach((url) => URL.revokeObjectURL(url));
      filePreviews.placementRef.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviews]);
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const fileNames = Array.from(selectedFiles)
      .map((file) => file.name)
      .join(", ");

    // Update formData with files
    setFormData((prev) => ({
      ...prev,
      files: { ...prev.files, [name]: selectedFiles },
    }));

    // Create object URLs for previews
    const filePreviews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setFilePreviews((prev) => ({
      ...prev,
      [name]: filePreviews,
    }));

    // Find the file input label
    const fileInputLabel = document.getElementById(`${name}-label`);

    if (fileInputLabel) {
      fileInputLabel.textContent = fileNames ? fileNames : "No file chosen";
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fname", formData.fname);
    formDataToSend.append("lname", formData.lname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("placement", formData.placement);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("budget", formData.budget);

    Array.from(formData.files.tattooRef).forEach((file) => {
      formDataToSend.append("tattooRef", file);
    });

    Array.from(formData.files.placementRef).forEach((file) => {
      formDataToSend.append("placementRef", file);
    });
    try {
      const response = await fetch(
        "https://vblacktats.onrender.com/submitBooking",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Success", result);
      } else {
        console.log("Failed", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const validateInput = (name, value) => {
    if (["phone", "age", "budget"].includes(name) && isNaN(value)) {
      if (name === "phone") setNumberAlert(true);
      if (name === "age") setAgeAlert(true);
      if (name === "budget") setBudgetAlert(true);
      return false;
    } else {
      setNumberAlert(false);
      setAgeAlert(false);
      setBudgetAlert(false);
      return true;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (validateInput(name, value)) {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <Container $bookingPage={book} className="book">
      <Title style={{ letterSpacing: "0" }}>
        {language === "en" ? "LET'S GET YOU INKED" : "ENCRE TON STYLE!"}
      </Title>
      <FormImageWrapper>
        <StyledForm onSubmit={onSubmit}>
          <StyledLabel>
            <div>
              {language === "en" ? "First Name" : "Prénom"}{" "}
              <Required>*</Required>
            </div>
            <StyledInput
              type="text"
              name="fname"
              onChange={(e) => handleChange(e)}
              required
            />
          </StyledLabel>
          <StyledLabel>
            <div>
              {language === "en" ? "Last Name" : "Nom De Famille"}{" "}
              <Required>*</Required>
            </div>
            <StyledInput
              type="text"
              name="lname"
              onChange={(e) => handleChange(e)}
              required
            />
          </StyledLabel>
          <StyledLabel>
            <div>
              {language === "en" ? "Email" : "Courriel"} <Required>*</Required>
            </div>
            <StyledInput
              type="text"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </StyledLabel>
          <StyledLabel>
            <div>
              {language === "en" ? "Phone Number" : "Téléphone"}{" "}
              <Required>*</Required>
            </div>
            <StyledInput
              $numbealert={numbeAlert}
              type="text"
              name="phone"
              onChange={(e) => handleChange(e)}
              required
            />
            {numbeAlert ? (
              <Alert>
                {language === "en"
                  ? "Phone number must be a number"
                  : "Numéro de téléphone doit être un nombre"}
              </Alert>
            ) : null}
          </StyledLabel>
          <StyledLabel>
            <div>
              {language === "en" ? "Age" : "Âge"} <Required>*</Required>
            </div>
            <StyledInput
              $agealert={ageAlert}
              type="text"
              name="age"
              onChange={(e) => handleChange(e)}
              required
            />
            {ageAlert ? (
              <Alert>
                {language === "en"
                  ? "Age must be a number"
                  : "L'age doit être un nombre"}
              </Alert>
            ) : null}
          </StyledLabel>
          <StyledLabel>
            <div>
              Placement <Required>*</Required>
            </div>
            <StyledInput
              type="text"
              name="placement"
              onChange={(e) => handleChange(e)}
              required
            />
          </StyledLabel>
          <StyledLabel>
            <div>
              {language === "en" ? "Size (in inches)" : "Taille (en pouces)"}{" "}
              <Required>*</Required>
            </div>
            <StyledInput
              type="text"
              name="size"
              onChange={(e) => handleChange(e)}
              required
            />
          </StyledLabel>
          <StyledLabel>
            <div>
              {language === "en" ? "Budget (in CAD)" : "Budget (en CAD)"}
            </div>
            <StyledInput
              type="text"
              name="budget"
              onChange={(e) => handleChange(e)}
            />
            {budgetAlert ? (
              <Alert>
                {language === "en"
                  ? "Budget must be a number"
                  : "Le budget doit être un nombre"}
              </Alert>
            ) : null}
          </StyledLabel>
          <StyledLabel $fullwidth>
            Description
            <StyledTextArea
              type="textarea"
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </StyledLabel>
          <StyledLabel>
            {language === "en"
              ? "Tattoo Reference Image(s)"
              : "Image(s) De Référence Du Tatouage"}
            <FileInputWrapper>
              <CustomButton htmlFor="tattooRef">
                {language === "en" ? "Choose Images" : "Choisir Les Images"}
              </CustomButton>
              <FileInputLabel id="tattooRef-label">
                {filePreviews.tattooRef.length > 0
                  ? filePreviews.tattooRef.map((src, index) => (
                      <div key={src}>
                        {index <= 1 && (
                          <div
                            style={{
                              position: "absolute",
                              left: `${index * 60}px` /* Adjust as needed */,
                              top: "50px",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={src}
                              alt={`preview-${index}`}
                              style={{
                                width: "50px",
                                height: "auto",
                                marginRight: "5px",
                              }}
                            />
                          </div>
                        )}
                        {index > 1 && (
                          <div
                            style={{
                              position: "absolute",
                              left: `${index * 60}px` /* Adjust as needed */,
                              top: "50px",
                              display: "inline-block",
                            }}
                          >
                            {language === "fr" && "+"}
                            {filePreviews.tattooRef.length - index}{" "}
                            {language === "en" && "more"}
                          </div>
                        )}
                      </div>
                    ))
                  : "No file chosen"}
              </FileInputLabel>
              <HiddenFileInput
                type="file"
                name="tattooRef"
                id="tattooRef"
                multiple
                onChange={handleFileChange}
              />
            </FileInputWrapper>
          </StyledLabel>

          <StyledLabel>
            {language === "en" ? "Placement Image(s)" : "Image(s) De Placement"}
            <FileInputWrapper>
              <CustomButton htmlFor="placementRef">
                {language === "en" ? "Choose Images" : "Choisir Les Images"}
              </CustomButton>
              <FileInputLabel id="placement-label">
                {filePreviews.placementRef.length > 0
                  ? filePreviews.placementRef.map((src, index) => (
                      <div key={src}>
                        {index <= 1 && (
                          <div
                            style={{
                              position: "absolute",
                              right: `${
                                (index + 0.5) * 60
                              }px` /* Adjust as needed */,
                              top: "50px",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={src}
                              alt={`preview-${index}`}
                              style={{
                                width: "50px",
                                height: "auto",
                                marginRight: "5px",
                              }}
                            />
                          </div>
                        )}
                        {index > 1 &&
                          index === filePreviews.placementRef.length - 2 && (
                            <div
                              style={{
                                position: "absolute",
                                right: `0` /* Adjust as needed */,
                                top: "50px",
                                display: "inline-block",
                              }}
                            >
                              {language === "fr" && "+"}
                              {filePreviews.placementRef.length - index}{" "}
                              {language === "en" && "more"}
                            </div>
                          )}
                      </div>
                    ))
                  : "No file chosen"}
              </FileInputLabel>
              <HiddenFileInput
                type="file"
                name="placementRef"
                id="placementRef"
                multiple
                onChange={handleFileChange}
              />
            </FileInputWrapper>
          </StyledLabel>
          <GetInked
            disabled={ageAlert || numbeAlert || budgetAlert}
            type="submit"
          >
            {language === "en" ? "SUBMIT" : "SOUMETTRE"}
            <span>
              <FaArrowRightLong style={{ fontSize: "1.5rem" }} />
            </span>
          </GetInked>
        </StyledForm>
        <ImgWrap>
          <Overlay />
          <BeautyImage alt="cool man" src={formImg} />
        </ImgWrap>
      </FormImageWrapper>
    </Container>
  );
};
export const bounce = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
`;
const FormImageWrapper = styled.div`
  display: flex;
  width: 70vw;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2rem;
  position: relative;
  font-family: "noah-bold", sans-serif;
  background-color: #bbabe8;
  width: ${(props) => (props.$bookingPage ? "100%" : "unset")};
  text-align: ${(props) =>
    props.$bookingPage
      ? "center"
      : "left"}; /* Center when booking page is true */
  margin: ${(props) =>
    props.$bookingPage
      ? "0 auto"
      : "unset"}; /* Only apply auto margin when booking page is true */
`;
export const ImgWrap = styled.div`
  position: relative;
`;
export const Overlay = styled.div`
  background-color: rgba(66, 0, 255, 0.3);
  width: 100%;
  height: 70vh;
  z-index: 100;
  position: absolute;
`;
export const BeautyImage = styled.img`
  width: 30vw;
  height: 70vh;
  object-fit: cover;
`;
const Container = styled.div`
  width: ${(props) => (props.$bookingPage ? "100%" : "70vw")};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.$bookingPage ? "center" : "flex-start"}; /* Conditional centering */
  align-items: ${(props) =>
    props.$bookingPage
      ? "center"
      : "flex-start"}; /* Conditional horizontal centering */
  background-color: #bbabe8;
  position: relative;
  height: ${(props) => (props.$bookingPage ? "90vh" : "unset")};
  margin-bottom: ${(props) => (props.$bookingPage ? "0" : "15vh")};
  top: ${(props) => (props.$bookingPage ? "10vh" : "0")};
`;
export const FileInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const HiddenFileInput = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const CustomButton = styled.label`
  background-color: transparent;
  border: 3px solid #241441;
  color: #241441;
  padding: 5px 30px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  text-align: center;
`;

export const FileInputLabel = styled.span`
  margin-left: 10px;
`;

export const Required = styled.span`
  color: red;
  margin-right: 10px;
`;
export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 3%;
  min-height: 70vh;
  margin-right: 3vw;
  width: 100%;
  position: relative;
`;
export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  grid-column: ${(props) => (props.$fullwidth ? "1 / -1" : "auto")};
`;
export const StyledInput = styled.input`
  outline: 1px solid
    ${(props) => (props.$numbealert || props.$agealert ? "red" : "transparent")};
  border: none;
  background-color: transparent;
  border: 2px solid #241441;
  border-radius: 4px;
  padding: 5px 15px;
`;

export const StyledTextArea = styled.textarea`
  border-radius: 4px;
  border: 2px solid #241441;
  padding: 10px;
  background-color: transparent;
`;

export const Alert = styled.p`
  color: red;
`;

const GetInked = styled.button`
  font-size: clamp(0.5rem, 1vw, 1rem);
  color: whitesmoke;
  padding: 0.7vh 2vw;
  border: none;
  border-radius: 3px;
  background-color: #241441;
  font-family: "EthnocentricRegular", sans-serif;
  box-shadow: #c4b6eb 5px 5px 0px -2px, #241441 5px 5px;
  display: flex;
  align-items: center;
  grid-column: 1 / -1;
  min-width: 40%;
  max-width: 50%;
  align-self: center;
  justify-self: center;
  justify-content: center;
  gap: 1vw;
  letter-spacing: 0.1rem;
  z-index: 1000;
  &:hover {
    span {
      animation: ${bounce} 0.5s ease-in-out infinite; /* Bounce effect */
    }
  }
`;
export default BookingFormPC;

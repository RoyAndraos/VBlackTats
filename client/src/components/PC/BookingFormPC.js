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
    availability: [],
    files: {
      tattooRef: [],
      placementRef: [],
    },
  });
  const [numbeAlert, setNumberAlert] = useState(false);
  const [ageAlert, setAgeAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
  const { language } = useContext(LanguageContext);
  const { setIsAdmin } = useContext(IsAdminContext);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
  }, [setIsAdmin]);
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFormData((prev) => ({
      ...prev,
      files: { ...prev.files, [name]: selectedFiles },
    }));
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
    formData.availability.forEach((item, index) =>
      formDataToSend.append(`availability[${index}]`, item)
    );
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

  const hangleChange = (e) => {
    if (e.target.name === "phone") {
      if (isNaN(e.target.value)) {
        setNumberAlert(true);
        return;
      } else {
        setNumberAlert(false);
      }
    } else if (e.target.name === "age") {
      if (isNaN(e.target.value)) {
        setAgeAlert(true);
        return;
      } else {
        setAgeAlert(false);
      }
    } else if (e.target.name === "budget") {
      if (isNaN(e.target.value)) {
        setBudgetAlert(true);
        return;
      } else {
        setBudgetAlert(false);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container $bookingPage={book}>
      <Title style={{ letterSpacing: "0" }}>LET'S GET YOU INKED</Title>
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
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
              onChange={(e) => hangleChange(e)}
            />
          </StyledLabel>
          <StyledLabel>
            {language === "en"
              ? "Tattoo Reference Image(s)"
              : "Image(s) De Référence Du Tatouage"}
            <FileInputWrapper>
              <CustomButton htmlFor="tattooRef">Choose Files</CustomButton>
              <FileInputLabel id="file-name-label">
                No file chosen
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
            {language === "en"
              ? "Placement Image(s) (body part)"
              : "Image(s) de référence (partie du corps)"}{" "}
            <FileInputWrapper>
              <CustomButton htmlFor="placementRef">Choose Files</CustomButton>
              <FileInputLabel id="file-name-label">
                No file chosen
              </FileInputLabel>
              <HiddenFileInput
                type="file"
                name="placementRef"
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
  width: 100%;
  text-align: ${(props) => (props.$bookingPage ? "center" : "left")};
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
export const Container = styled.div`
  width: ${(props) => (props.$bookingPage ? "100%" : "70vw")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding: 5px 15px;
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

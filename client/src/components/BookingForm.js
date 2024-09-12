import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import styled from "styled-components";
import Cookies from "js-cookie";
import { IsAdminContext } from "../contexts/IsAdminContext";
import {
  HiddenFileInput,
  FileInputLabel,
  FileInputWrapper,
  CustomButton,
} from "./PC/BookingFormPC";
const BookingForm = () => {
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
    <Wrapper onSubmit={onSubmit}>
      <Title>LET'S GET YOU INKED</Title>
      <StyledLabel>
        <div>
          {language === "en" ? "First Name" : "Prénom"} <Required>*</Required>
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
        <div>{language === "en" ? "Budget (in CAD)" : "Budget (en CAD)"}</div>
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
      <StyledLabel>
        Description
        <textarea
          type="textarea"
          name="description"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #241441",
            padding: "5px 15px",
          }}
          onChange={(e) => hangleChange(e)}
        />
      </StyledLabel>
      <StyledLabel>
        {language === "en"
          ? "Tattoo Reference Image(s)"
          : "Image(s) De Référence Du Tatouage"}
        <FileInputWrapper>
          <CustomButton htmlFor="tattooRef">Choose Files</CustomButton>
          <FileInputLabel id="file-name-label">No file chosen</FileInputLabel>
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
          <FileInputLabel id="file-name-label">No file chosen</FileInputLabel>
          <HiddenFileInput
            type="file"
            name="placementRef"
            multiple
            onChange={handleFileChange}
          />
        </FileInputWrapper>
      </StyledLabel>
      <ButtonWrapper>
        <GetInked
          disabled={ageAlert || numbeAlert || budgetAlert}
          type="submit"
        >
          {language === "en" ? "Submit" : "Soumettre"}
        </GetInked>
      </ButtonWrapper>
    </Wrapper>
  );
};
const GetInked = styled.button`
  font-size: 1rem;
  color: whitesmoke;
  padding: 15px 30px;
  border-radius: 3px;
  background-color: #241441;
  font-family: "EthnocentricRegular", sans-serif !important;
  box-shadow: #c4b6eb 5px 5px 0px -2px, #241441 5px 5px;
  letter-spacing: 0.1rem;
  z-index: 1000;
  position: absolute;
  right: 10vw;
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  justify-content: flex-end;
  position: relative;
`;
export const Required = styled.span`
  color: red;
  margin-right: 10px;
`;
export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5vh;
  min-height: 92vh;
  padding: 5vh 0 15vh 0;
  align-items: center;
  position: relative;
  background-color: #bbabe8;
  top: 8vh;
  width: 100%;
`;
export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;
export const StyledInput = styled.input`
  border-radius: 2px;
  background-color: transparent;
  outline: 1px solid
    ${(props) => (props.$numbealert || props.$agealert ? "red" : "transparent")};
  border: 1px solid #241441;
  padding: 5px 15px;
`;
export const Alert = styled.p`
  color: red;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  letter-spacing: 0rem;
  font-family: "EthnocentricRegular", sans-serif;
  background-color: #bbabe8;
  text-align: center;
`;
export default BookingForm;

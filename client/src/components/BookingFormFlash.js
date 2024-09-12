import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  Wrapper,
  StyledLabel,
  StyledInput,
  Required,
  Alert,
} from "./BookingForm";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetInked } from "./PC/HeaderPC";
const BookingFormFlash = () => {
  const [ageAlert, setAgeAlert] = useState(false);
  const [image, setImage] = useState("");
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
    tattooRef: {},
  });
  const params = useParams();
  const [numbeAlert, setNumberAlert] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetch(`http://localhost:5000/getFlashById/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        const imageData = data.data[0];
        setImage(imageData);
        fetch(imageData.url)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], imageData.name, { type: blob.type });
            setFormData((prev) => ({
              ...prev,
              tattooRef: file,
            }));
          });
      });
  }, [params.id]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fname", formData.fname);
    formDataToSend.append("lname", formData.lname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("placement", formData.placement);
    formData.availability.forEach((item, index) =>
      formDataToSend.append(`availability[${index}]`, item)
    );
    formDataToSend.append("tattooRef", formData.tattooRef);

    try {
      const response = await fetch("http://localhost:5000/submitBookingFlash", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.success) {
        alert("Booking submitted successfully");
      } else {
        alert("Failed to submit booking");
      }
    } catch (error) {
      console.error("Failed to submit booking:", error);
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
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (image.length === 0) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    <Wrapper onSubmit={onSubmit}>
      <StyledLabel>
        <StyledPreview src={image.url} alt={image.name} />
      </StyledLabel>

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

      <GetInked disabled={ageAlert || numbeAlert} type="submit">
        {language === "en" ? "Submit" : "Soumettre"}
      </GetInked>
    </Wrapper>
  );
};

const StyledPreview = styled.img`
  width: 100%;
  height: auto;
  margin: 0 auto;
  @media (min-width: 1000px) {
    max-width: 30vw;
    max-height: 50vh;
    height: auto;
    width: auto;
  }
`;

export default BookingFormFlash;

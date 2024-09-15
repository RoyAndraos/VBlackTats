import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetInked } from "./HeaderPC";
import { StyledTextArea } from "./BookingFormPC";
import { FaArrowRight } from "react-icons/fa6";
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
    fetch(`https://vblacktats.onrender.com/getFlashById/${params.id}`)
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
      const response = await fetch(
        "https://vblacktats.onrender.com/submitBookingFlash",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
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
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <Title style={{ letterSpacing: "0", gridColumn: "1 / -1" }}>
          LET'S GET YOU INKED
        </Title>
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
        <StyledLabel style={{ gridColumn: "1 / -1" }}>
          <div>Notes</div>
          <StyledTextArea
            type="text"
            name="notes"
            onChange={(e) => hangleChange(e)}
          />
        </StyledLabel>

        <GetInked
          disabled={ageAlert || numbeAlert}
          style={{
            width: "50%",
            gridColumn: "1 / -1",
            margin: "10px auto",
            fontSize: "1rem",
            justifyContent: "center",
            gap: "1vw",
            padding: "10px",
          }}
          type="submit"
        >
          {language === "en" ? "Submit" : "Soumettre"}
          <span>
            <FaArrowRight />
          </span>
        </GetInked>
      </StyledForm>
      {/* <ImgWrap>
        <Overlay />
        <BeautyImage alt="cool man" src={formImg} />
      </ImgWrap> */}
      <StyledPreview src={image.url} alt={image.name} />
    </Container>
  );
};

const StyledInput = styled.input`
  outline: 1px solid
    ${(props) => (props.$numbealert || props.$agealert ? "red" : "transparent")};
  border: none;
  background-color: transparent;
  border: 2px solid #241441;
  border-radius: 4px;
  padding: 10px;
`;
const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5vw;
  align-items: flex-start;
  background-color: #bbabe8;
  padding-top: 5vh;
  position: relative;
  top: 10vh;
  min-height: 80vh;
`;

const StyledForm = styled.form`
  display: grid;
  height: 80%;
  gap: 20px; /* Space between form fields */
  grid-template-columns: 50% 50%;
  margin: 5vh 0;
`;

const StyledPreview = styled.img`
  width: 25vw;
  height: auto;
`;

const Required = styled.span`
  color: red;
  margin-right: 10px;
`;
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5vh;
  background-color: #bbabe8;
  min-height: 92vh;
  padding: 5vh 0;
  align-items: center;
  position: relative;
  top: 10vh;
`;
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;

const Alert = styled.p`
  color: red;
`;
export const Title = styled.h1`
  font-size: 2rem;
  left: 0;
  font-family: "noah-bold", sans-serif;
  background-color: #bbabe8;
`;

export default BookingFormFlash;

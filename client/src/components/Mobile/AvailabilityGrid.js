import React from "react";
import styled from "styled-components";
const AvailabilityGrid = ({ setFormData }) => {
  const handleCheck = (e) => {
    const day = e.target.name;
    setFormData((prev) => {
      if (prev.availability.includes(day)) {
        return {
          ...prev,
          availability: prev.availability.filter((d) => d !== day),
        };
      } else {
        return {
          ...prev,
          availability: [...prev.availability, day],
        };
      }
    });
  };

  return (
    <Wrapper>
      <StyledLabel>
        Monday
        <input
          type="checkbox"
          name="Monday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
      <StyledLabel>
        Tuesday
        <input
          type="checkbox"
          name="Tuesday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
      <StyledLabel>
        Wednesday
        <input
          type="checkbox"
          name="Wednesday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
      <StyledLabel>
        Thursday
        <input
          type="checkbox"
          name="Thursday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
      <StyledLabel>
        Friday
        <input
          type="checkbox"
          name="Friday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
      <StyledLabel>
        Saturday
        <input
          type="checkbox"
          name="Saturday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
      <StyledLabel>
        Sunday
        <input
          type="checkbox"
          name="Sunday"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </StyledLabel>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 2vh 15vw;
  input {
    margin-bottom: 2vh;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default AvailabilityGrid;

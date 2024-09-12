// ConfirmationModal.js
import React from "react";
import styled from "styled-components";

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>Are you sure you want to delete this image?</p>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>Yes</ConfirmButton>
          <CancelButton onClick={onCancel}>No</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: #241441;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #930000;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
`;

export default ConfirmationModal;

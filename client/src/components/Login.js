import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IsAdminContext } from "../contexts/IsAdminContext";
import Cookies from "js-cookie";
import { StyledInput } from "./PC/BookingFormPC";
import { GetInked } from "./PC/HeaderPC";
const Login = () => {
  const [formData, setFormData] = useState("");
  const { setIsAdmin, isAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAdmin(true);
    }
  }, [setIsAdmin, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://vblacktats.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          Cookies.set("token", data.token, {
            expires: 1,
            sameSite: "strict",
          });
          setIsAdmin(true);
          navigate("/");
        }
      });
  };
  return (
    <Wrapper>
      {!isAdmin ? (
        <>
          <Label>
            Username
            <StyledInput
              type="text"
              name="username"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
            />
          </Label>
          <Label>
            Password
            <StyledInput
              type="password"
              name="password"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
            />
          </Label>
          <GetInked
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Log in
          </GetInked>
        </>
      ) : (
        <GetInked
          onClick={() => {
            Cookies.remove("token");
            setIsAdmin(false);
            navigate("/");
          }}
        >
          Log out
        </GetInked>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 5vh;
  background-color: #bbabe8;
  min-height: 90vh;
  position: relative;
  top: 10vh;
  @media (max-width: 1000px) {
    min-height: 92vh;
    top: 8vh;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #241441;
  font-size: 1.2rem;
`;

export default Login;

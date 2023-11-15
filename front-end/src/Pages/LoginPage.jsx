import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const postDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          { Email: email, Password: password }
        );

        if (response.data.success) {
          const userTkn = response.data.token;
          localStorage.setItem("token", userTkn);
          toast.success("Login Success!");
          navigate("/");
        }
      } catch (error) {
        // console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };

    if (email !== "" || password !== "") {
      postDetails();
    } else {
      toast.error("Email and Password feild needs to be fill");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: "white" }}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "white" }}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn
                onClick={handleLogin}
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
              >
                Login
              </MDBBtn>

              <div>
                <p className="mt-5">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-white-50 fw-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default LoginPage;

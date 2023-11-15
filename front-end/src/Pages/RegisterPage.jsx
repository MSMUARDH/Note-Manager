import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (emptyFields.includes("firstname")) {
      toast.error("First Name required...");
    }
    if (emptyFields.includes("lastname")) {
      toast.error("Last Name required...");
    }
    if (emptyFields.includes("email")) {
      toast.error("Email required...");
    }
    if (emptyFields.includes("password")) {
      toast.error("Password required...");
    }
  }, [emptyFields]);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/", {
        First_name: firstName,
        Last_name: lastName,
        Email: email,
        Password: password,
      });

      if (response.status == 200) {
        setError(null);
        setEmptyFields([]);
        toast.success("Register Success!");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.error);
      setEmptyFields(error.response.data.emptyFields);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow style={{ display: "flex", justifyContent: "center" }}>
        <MDBCol
          md="6"
          style={{ maxWidth: "500px" }}
          className="position-relative "
        >
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-6-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <h3 className="text-center">Register User</h3>
            <MDBCardBody className="p-5">
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    onChange={(e) => setFirstName(e.target.value)}
                    wrapperClass="mb-4"
                    label="First name"
                    id="form1"
                    type="text"
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    onChange={(e) => setLastName(e.target.value)}
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form2"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                onChange={(e) => setEmail(e.target.value)}
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
              />
              <MDBInput
                onChange={(e) => setPassword(e.target.value)}
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
              />

              <MDBBtn onClick={handleSignup} className="w-100 mb-4" size="md">
                Sign up
              </MDBBtn>

              <p className="mt-2">
                Do you have an account?{" "}
                <Link to="/login" className=" fw-bold">
                  Login
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterPage;

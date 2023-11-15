import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/Users/userSlice";

export default function NavBar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <MDBNavbar dark bgColor="black">
      <MDBContainer fluid>
        <MDBNavbarBrand>{`hi! ${user}`}</MDBNavbarBrand>
        <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
          <input
            className="form-control"
            placeholder="Type query"
            aria-label="Search"
            type="Search"
          />
          <MDBBtn outline>Search</MDBBtn>
        </MDBInputGroup>
        <MDBBtn onClick={handleLogout} className="m-2">
          Logout
        </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}

import React, {  useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBadge,
} from "mdb-react-ui-kit";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";


// App.js

import NavBar from "../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  getAllNote,
  createNote,
} from "../features/Notes/noteSlice";

import { Link } from "react-router-dom";


function HomePage() {
  const { notes } = useSelector((state) => state.Notes);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");



  useEffect(() => {
    dispatch(getAllNote(token));
  }, []);

  const handleDelete = (id) => {
    const data = { id, token };
    dispatch(deleteNote(data));
  };

  return (
    <>
      <NavBar />

      <MDBContainer className="App">
        <Link to="/create-note">
          <MDBBtn className="my-3" toggle>
            Add Note
          </MDBBtn>
        </Link>

        <div className="container">
          <div className="row">
            {notes.map((note, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <MDBCard className="shadow-5-strong ">
                  <MDBCardBody className="cardhvr">
                    <MDBContainer>
                      <MDBBadge className="mb-3" pill color="success" light>
                        {note.Catogory}
                      </MDBBadge>
                    </MDBContainer>
                    <Link to={`/view-note/${note._id}`}>
                      <MDBCardTitle>
                        {" "}
                        {note.Note_Title && note.Note_Title.length > 20
                          ? note.Note_Title.slice(0, 20) + "..."
                          : note.Note_Title}
                      </MDBCardTitle>
                      <MDBCardText>
                        {note.Note_Text && note.Note_Text.length > 30
                          ? note.Note_Text.slice(0, 30) + "..."
                          : note.Note_Text}
                      </MDBCardText>
                    </Link>

                    <div className="mt-4 d-flex justify-content-between">
                      <Link to={`/update-note/${note._id}`}>
                        <MDBBtn color="success">Update</MDBBtn>
                      </Link>

                      <MDBBtn
                        onClick={() => handleDelete(note._id)}
                        color="danger"
                      >
                        Delete
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))}
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default HomePage;

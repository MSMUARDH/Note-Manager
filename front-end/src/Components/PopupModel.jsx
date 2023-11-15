import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRadio,
} from "mdb-react-ui-kit";
import { MDBContainer, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { createNote, getAllNote } from "../features/Notes/noteSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PopupModel() {
  const [centredModal, setCentredModal] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for form
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rdovalue, setRdovalue] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title == "" || text == "" || rdovalue == "") {
      toast.error("Please provide all the details");
    } else {
      try {
        const data = { rdovalue, title, text, token };
        dispatch(createNote(data));
        dispatch(getAllNote(token));
        toast.success("Note saved successfully...");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      ></div>
      {/*  */}

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="text-center">
                Add your Note
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <div className="row justify-content-center">
                  <div className="">
                    <form>
                      <MDBContainer className="mb-3">
                        <MDBRadio
                          name="inlineRadio"
                          id="inlineRadio1"
                          onChange={(e) => setRdovalue(e.target.value)}
                          value="Work"
                          label="Work"
                          inline
                        />
                        <MDBRadio
                          onChange={(e) => setRdovalue(e.target.value)}
                          name="inlineRadio"
                          id="inlineRadio2"
                          value="Personal"
                          label="Personal"
                          inline
                        />
                        <MDBRadio
                          onChange={(e) => setRdovalue(e.target.value)}
                          name="inlineRadio"
                          id="inlineRadio3"
                          value="Education"
                          label="Education"
                          inline
                        />
                        <MDBRadio
                          onChange={(e) => setRdovalue(e.target.value)}
                          name="inlineRadio"
                          id="inlineRadio3"
                          value="Financial"
                          label="Financial"
                          inline
                        />
                      </MDBContainer>
                      <MDBContainer className="mb-3">
                        <MDBInput
                          onChange={(e) => setTitle(e.target.value)}
                          label="Note Title"
                          id="typeText"
                          type="text"
                        />
                      </MDBContainer>

                      <MDBContainer className="mb-3">
                        <MDBTextArea
                          onChange={(e) => setText(e.target.value)}
                          label="Message"
                          id="textAreaExample"
                          rows={4}
                        />
                      </MDBContainer>
                    </form>
                  </div>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={handleClose} color="secondary">
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

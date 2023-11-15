import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBRadio,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePage = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rdobtnvalue, setRdobtnvalue] = useState("");

  const id = param.id;

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title == "" || text == "" || rdobtnvalue == "") {
      toast.error("Please provide all the details");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/note/${id}`,
          {
            Catogory: rdobtnvalue,
            Note_Title: title,
            Note_Text: text,
          }
        );

        if (response.status == 200) {
          toast.success("Update Success!");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getNote = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/note/${param.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        setTitle(response.data.Note_Title);
        setText(response.data.Note_Text);
        setRdobtnvalue(response.data.Catogory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h3 className="mt-4 mb-3 text-center">Update Note</h3>
          <form onSubmit={handleSubmit}>
            <MDBContainer className="mb-3">
              <MDBRadio
                checked={rdobtnvalue === "Work"}
                name="inlineRadio"
                id="inlineRadio1"
                onChange={(e) => setRdobtnvalue(e.target.value)}
                label="Work"
                value="Work"
                inline
              />
              <MDBRadio
                checked={rdobtnvalue === "Personal"}
                onChange={(e) => setRdobtnvalue(e.target.value)}
                name="inlineRadio"
                id="inlineRadio2"
                value="Personal"
                label="Personal"
                inline
              />
              <MDBRadio
                checked={rdobtnvalue === "Education"}
                onChange={(e) => setRdobtnvalue(e.target.value)}
                name="inlineRadio"
                id="inlineRadio3"
                value="Education"
                label="Education"
                inline
              />
              <MDBRadio
                checked={rdobtnvalue === "Financial"}
                onChange={(e) => setRdobtnvalue(e.target.value)}
                name="inlineRadio"
                id="inlineRadio3"
                value="Financial"
                label="Financial"
                inline
              />
            </MDBContainer>
            <MDBContainer className="mb-3">
              <MDBInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Note Title"
                id="typeText"
                type="text"
              />
            </MDBContainer>

            <MDBContainer className="mb-3">
              <MDBTextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Message"
                id="textAreaExample"
                rows={4}
              />
            </MDBContainer>

            <MDBBtn
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </MDBBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;

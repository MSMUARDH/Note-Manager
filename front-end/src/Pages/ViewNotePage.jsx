import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewNotePage = () => {
  const [notes, setNotes] = useState("");
  const param = useParams();
  const token = localStorage.getItem("token");

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
        setNotes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <MDBContainer>
      <h3 className="text-center mt-5">{notes.Note_Title}</h3>
      <p className="text-center">{notes.Note_Text}</p>
    </MDBContainer>
  );
};

export default ViewNotePage;

import axios from "axios";

const createNote = async (itemData) => {

  const response = await axios.post(
    "http://localhost:5000/api/note/",
    {
      Catogory: itemData.rdovalue,
      Note_Title: itemData.title,
      Note_Text: itemData.text,
    },
    {
      headers: {
        Authorization: `Bearer ${itemData.token}`,
      },
    }
  );

  return response.data;
};

const getAllNotes = async (token) => {
  const response = await axios.get("http://localhost:5000/api/note", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteNote = async (data) => {
  const response = await axios.delete(
    `http://localhost:5000/api/note/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return response.data;
};

const updateNote = async (noteData) => {
  const id = noteData.id;
  const data = { Note_Title: noteData.title, Note_Text: noteData.text };


  const response = await axios.put(
    `http://localhost:5000/api/note/${id}`,
    data
  );


  // return response.data;
};

const notesService = {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
};

export default notesService;

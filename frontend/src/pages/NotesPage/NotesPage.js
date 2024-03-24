import React, { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard/NoteCard";
import NavBar from "../../components/NavBar/NavBar";
import "./NotesPage.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { createNotes, getNotes } from "../../redux/notes/noteAction";

Modal.setAppElement("#root");

export default function NotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState([]);
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNote = () => {
    if (!title.trim() || !body.trim()) {
      alert("Please enter both title and body for the note.");
      return;
    }
    dispatch(createNotes({ title, body }));
    setTitle("");
    setBody("");
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div className="all_notes">
        <div className="note_container">
          {notes?.map((el) => (
            <NoteCard {...el} />
          ))}
        </div>
      </div>
      <div onClick={() => setIsModalOpen(true)}>
        <img
          className="circle"
          src="https://static-00.iconduck.com/assets.00/plus-circle-icon-1024x1024-gnvr84m5.png"
          alt="Add Note"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Note Modal"
        className="create-note-modal"
      >
        <h2>Create New Note</h2>
        <hr />
        <input
          type="text"
          placeholder="Enter Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Please enter note description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div>
          <button onClick={createNote}>Create</button>
          <button className="cancel_btn" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

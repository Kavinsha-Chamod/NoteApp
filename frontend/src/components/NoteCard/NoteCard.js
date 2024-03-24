import React, { useState, useRef } from "react";
import "./NoteCard.css";
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../redux/notes/noteAction";
import Modal from "react-modal";

export default function NoteCard({ title, body, _id }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempBody, setTempBody] = useState(body);

  const handleUpdate = () => {
    if (!tempTitle.trim()) {
      alert("Note title cannot be empty.");
    } else if (!tempBody.trim()) {
      alert("Note body cannot be empty.");
    } else {
      dispatch(updateNotes(_id, { title: tempTitle, body: tempBody }));
      setIsModalOpen(false);
    }
  };
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (isConfirmed) {
      dispatch(deleteNotes(_id));
    }
  };

  return (
    <div className="note-card-container">
      <div className="note">
        <div className="container" style={{ backgroundColor: "white" }}>
          <h2>
            <b>{title}</b>
          </h2>
        </div>
        <div className="container">
          <p className="promo">{body}</p>
        </div>
        <div className="container_btn">
          <button onClick={() => setIsModalOpen(true)} className="note_btn">
            Edit
          </button>
          <button onClick={handleDelete} className="note_btn_delete">
            Delete
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Note Modal"
        className="create-note-modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <h2>Edit Note</h2>
        <hr />
        <input
          type="text"
          placeholder="Enter Note Title"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
        <textarea
          placeholder="Please enter note description"
          value={tempBody}
          onChange={(e) => setTempBody(e.target.value)}
        />
        <div>
          <button onClick={handleUpdate}>Save Edit</button>
          <button className="cancel_btn" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

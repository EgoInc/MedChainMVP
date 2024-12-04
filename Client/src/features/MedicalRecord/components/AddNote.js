import React, { useState } from "react";
import "../css/AddNote.css";
import { ReactComponent as DoctorAvatar } from "../../../shared/Avatar.svg";
import DoctorCard from "../../FromDoctor/components/DoctorCard";
const AddNote = ({ onAddNote, closeForm }) => {
  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      avatar: <DoctorAvatar />,
      doctorLastName: "Новиков",
      doctorName: "Николай",
      doctorSecondName: "Александрович",
      location: "Городская больница №5",
      type,
      text,
    };

    onAddNote(newNote);
    closeForm();

    setType("");
    setText("");
  };

  return (
    <div className="add-note">
      <div className="add-note-box">
        <form onSubmit={handleSubmit} className="add-note-form">
          <div className="select-and-submit">
            <div className="select-box">
              <h3>Выберите вид изменений:</h3>
              <div className="labes-box">
                <label>
                  <input
                    type="radio"
                    name="noteType"
                    value="Анализы"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "Анализы"}
                  />
                  Анализы
                </label>
                <label>
                  <input
                    type="radio"
                    name="noteType"
                    value="Диагноз"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "Диагноз"}
                  />
                  Диагноз
                </label>
                <label>
                  <input
                    type="radio"
                    name="noteType"
                    value="Выписанное лечение"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "Выписанное лечение"}
                  />
                  Выписанное лечение
                </label>
                <label>
                  <input
                    type="radio"
                    name="noteType"
                    value="Осмотр"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "Осмотр"}
                  />
                  Осмотр
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="save-button"
              disabled={!type || !text}
            >
              Добавить запись
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => closeForm()}
            >
              Отмена
            </button>
          </div>

          <h4>Запишите изменения:</h4>

          <textarea
            className="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Тут пишутся внесенные изменения"
          ></textarea>
        </form>
      </div>
    </div>
  );
};

export default AddNote;

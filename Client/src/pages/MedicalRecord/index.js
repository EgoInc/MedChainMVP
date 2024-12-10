import React, { useEffect, useState } from "react";
import "./index.css";
import Logo from "../../shared/FromDoctor/images/Logo.png";
import MedicalRecordFilter from "../../features/MedicalRecord/components/MedicalRecordFilter";
import AddNote from "../../features/MedicalRecord/components/AddNote";
import Note from "../../features/MedicalRecord/components/Note";
import { ReactComponent as PatientAvatar } from "../../shared/Avatar.svg";
import NavPanel from "../../features/NavPanel/NavPanel";
import { useParams } from "react-router-dom";

function MedicalRecord() {
  const { doctorId } = useParams();
  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/patients`,
    logout: "/",
  };
  const mockBackendNotes = [
    {
      id: 1,
      avatar: <PatientAvatar />,
      doctorLastName: "Иванов",
      doctorName: "Иван",
      doctorSecondName: "Иванович",
      location: "Городская поликлиника №2",
      type: "Анализы",
      text: "Результаты анализа крови.",
    },
    {
      id: 2,
      avatar: <PatientAvatar />,
      doctorLastName: "Петров",
      doctorName: "Петр",
      doctorSecondName: "Петрович",
      location: "Городская больница №2",
      type: "Диагноз",
      text: "Диагноз: ОРВИ.",
    },
  ];

  const [existingNotes, setExistingNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    setExistingNotes(mockBackendNotes);
    setFilteredNotes(mockBackendNotes); // Изначально показываем все записи
  }, []);

  // Фильтрация записей при изменении фильтров
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredNotes(existingNotes); // Если фильтры пустые, показываем все
    } else {
      setFilteredNotes(
        existingNotes.filter((note) => selectedFilters.includes(note.type))
      );
    }
  }, [selectedFilters, existingNotes]);

  const handleAddNote = (newNote) => {
    setExistingNotes((prevNotes) => [...prevNotes, newNote]);
    setSelectedFilters([]); // Сбросить фильтры при добавлении новой записи
  };

  const [isFormOpen, setFormOpen] = useState(false);

  const toggleFormOpen = () => {
    setFormOpen(true);
  };

  return (
    <div className="medical-record">
      <NavPanel routes={routes} />
      <img src={Logo} alt="Logo" className="logo" />
      <h2>Медицинская карта</h2>
      <div className="medical-record-menu">
        <MedicalRecordFilter
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
        />
        {!isFormOpen && (
          <button onClick={toggleFormOpen} className="add-note-button">
            Добавить запись
          </button>
        )}
      </div>

      <div className="notes-list">
        {isFormOpen && (
          <AddNote
            onAddNote={handleAddNote}
            closeForm={() => setFormOpen(false)}
          />
        )}

        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            avatar={note.avatar}
            doctorLastName={note.doctorLastName}
            doctorName={note.doctorName}
            doctorSecondName={note.doctorSecondName}
            location={note.location}
            type={note.type}
            text={note.text}
          />
        ))}
      </div>
    </div>
  );
}

export default MedicalRecord;
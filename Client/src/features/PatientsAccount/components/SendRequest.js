import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/SendRequest.css";

const SendRequest = ({ onSubmit }) => {
  const [checkboxes, setCheckboxes] = useState({
    accessRequest: false,
    studyHistory: false,
    editHistory: false,
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const isAnyChecked = Object.values(checkboxes).some((checked) => checked);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [requestData, setRequestData] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setIsSubmitted(true); // Обновляем состояние на "отправлено"
    onSubmit(); // Вызываем функцию, переданную из родительского компонента
  };

  if (isSubmitted) {
    return <p className="send-request submitted">Заявка отправлена</p>;
  }
  return (
    <div
      className={`send-request ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <p>Отправить заявку</p>
      {isExpanded && (
        // предотвращаем кликабельность внутри формы
        <div className="request-menu" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <div className="send-request-labels">
              <label>
                <input
                  type="checkbox"
                  value={requestData}
                  onChange={handleCheckboxChange}
                  id="accessRequest"
                  checked={checkboxes.accessRequest}
                />
                Запрос доступа
              </label>
              <label>
                <input
                  type="checkbox"
                  value={requestData}
                  onChange={handleCheckboxChange}
                  id="studyHistory"
                  checked={checkboxes.studyHistory}
                />
                Изучение мед карты
              </label>
              <label>
                <input
                  type="checkbox"
                  value={requestData}
                  onChange={handleCheckboxChange}
                  id="editHistory"
                  checked={checkboxes.editHistory}
                />
                Изменение мед карты
              </label>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={!isAnyChecked}
            >
              Отправить
            </button>
          </form>
        </div>
      )}
      <button
        onClick={toggleExpand}
        className={`toggle-button ${isExpanded ? "expanded" : ""}`}
      >
        <Toggle />
      </button>
    </div>
  );
};

export default SendRequest;

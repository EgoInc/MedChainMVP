import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/SendRequest.css";

const SendRequest = ({ onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [requestData, setRequestData] = useState("");

  const handleInputChange = (e) => {
    setRequestData(e.target.value);
  };

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
    <div className={`send-request ${isExpanded ? "expanded" : ""}`}>
      <p>Отправить заявку</p>
      {isExpanded && (
        <div className="request-menu">
          <form onSubmit={handleSubmit}>
            <div className="send-request-labels">
              <label>
                <input
                  type="checkbox"
                  value={requestData}
                  onChange={handleInputChange}
                  id="access-request"
                />
                Запрос доступа
              </label>
              <label>
                <input
                  type="checkbox"
                  value={requestData}
                  onChange={handleInputChange}
                  id="study-history"
                />
                Изучение мед карты
              </label>
              <label>
                <input
                  type="checkbox"
                  value={requestData}
                  onChange={handleInputChange}
                  id="edit-history"
                />
                Изменение мед карты
              </label>
            </div>
            <button type="submit" className="submit-button">
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

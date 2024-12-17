import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/SendRequest.css";
import { useParams } from "react-router-dom";

const SendRequest = ({ onSubmit }) => {
  const { doctorId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [requestData, setRequestData] = useState(""); // Тип заявки
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Для состояния загрузки
  const [error, setError] = useState(null); // Для отображения ошибок

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionChange = (e) => {
    setRequestData(e.target.value); // Устанавливаем выбранный тип заявки
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/doctor/${doctorId}/request-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании заявки");
      }

      const data = await response.json(); // Получаем ID заявки из ответа
      setIsSubmitted(true);
      onSubmit(data.request_id); // Передаём ID заявки в родительский компонент
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="send-request submitted">
        <p>Заявка отправлена</p>
      </div>
    );
  }

  return (
    <div
      className={`send-request ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <div className="med-card-request-inner-container">
        <p>Отправить заявку</p>
        {isExpanded && (
          <div className="request-menu" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div className="send-request-labels">
                <label>
                  <input
                    type="radio"
                    value="accessRequest"
                    onChange={handleOptionChange}
                    checked={requestData === "accessRequest"}
                  />
                  Запрос доступа
                </label>
                <label>
                  <input
                    type="radio"
                    value="studyHistory"
                    onChange={handleOptionChange}
                    checked={requestData === "studyHistory"}
                  />
                  Изучение мед карты
                </label>
                <label>
                  <input
                    type="radio"
                    value="editHistory"
                    onChange={handleOptionChange}
                    checked={requestData === "editHistory"}
                  />
                  Изменение мед карты
                </label>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={!requestData || isLoading}
              >
                {isLoading ? "Отправка..." : "Отправить"}
              </button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        )}
        <button
          onClick={toggleExpand}
          className={`toggle-button ${isExpanded ? "expanded" : ""}`}
        >
          <Toggle />
        </button>
      </div>
    </div>
  );
};

export default SendRequest;

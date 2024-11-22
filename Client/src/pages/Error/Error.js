import React, { useState } from "react";
import { formatPhone } from "../../features/RegistrationFormAndLoginForm/formatPhone";
import "./Error.css";
const ErrorForm = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    problem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "emailOrPhone") {
      if (value.startsWith("+7")) {
        setFormData({
          ...formData,
          [name]: formatPhone(value),
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let errorMessages = "";

    if (!formData.emailOrPhone) {
      errorMessages += "Email/Телефон обязателен для ввода.\n";
    } else if (
      !formData.emailOrPhone.startsWith("+7") &&
      !formData.emailOrPhone.includes("@")
    ) {
      errorMessages += "Введите корректный номер телефона или email.\n";
    }
    return errorMessages;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMessages = validate();

    if (errorMessages) {
      alert(`Пожалуйста, исправьте следующие ошибки:\n\n${errorMessages}`);
    } else {
      alert("Данные для входа отправлены успешно!");
    }
  };

  return (
    <div className="error">
      <div className="error-content">
        <form onSubmit={handleSubmit} className="error-content_form">
          <h2>Возникли проблемы?</h2>
          <p>
            Возникли проблемы со входом?
            <br />
            Отправьте обращение с подробным описанием проблемы:
          </p>
          <div className="error-content_inputs">
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Введите Email/Номер телефона"
              required
              className="phoneEmail"
            />
            <textarea
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Опишите проблему"
              required
              className="discribing"
            />
          </div>

          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ErrorForm;

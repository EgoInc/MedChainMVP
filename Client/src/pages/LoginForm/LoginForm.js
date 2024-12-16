import React, { useState } from "react";
import "./LoginForm.css";
import { formatPhone } from "../../features/RegistrationFormAndLoginForm/formatPhone";
import UserInfo from "../../features/UsersInfo/UserInfo.json";
import { useNavigate } from "react-router-dom";

console.log(UserInfo);

const LoginForm = ({ errorText, setError }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate();
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

    if (!formData.password) {
      errorMessages += "Пароль обязателен для ввода.\n";
    }

    if (!formData.userType) {
      errorMessages += "Выберите тип пользователя (врач/пациент).\n";
    }

    return errorMessages;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMessages = validate();

    if (errorMessages) {
      alert(`Пожалуйста, исправьте следующие ошибки:\n\n${errorMessages}`);
    } else {
      // Проверка данных с файлом JSON
      checkUserCredentials(formData);
    }
  };

  const checkUserCredentials = (formData) => {
    fetch(UserInfo)
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) =>
            (user.emailOrPhone === formData.emailOrPhone ||
              user.phone === formData.emailOrPhone) &&
            user.password === formData.password &&
            user.userType === formData.userType
        );

        if (user) {
          if (user.userType === "patient") {
            navigate("/patient/:patientId/"); // Перенаправление на страницу пациента
          } else if (user.userType === "doctor") {
            navigate("/doctor/:doctorId"); // Перенаправление на страницу врача
          }
        } else {
          setError(true);
          alert("Неверные данные для входа.");
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователей:", error);
        setError(true);
        alert("Произошла ошибка при проверке данных.");
      });
  };

  return (
    <div className="login">
      <div className="login-content">
        <form onSubmit={handleSubmit} className="login-content_form">
          <h2>Данные для входа</h2>

          <div className="login-content_inputs">
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Введите Email/Номер телефона"
              required
              className="input_text"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
              className="input_text"
            />
          </div>

          <div className="user-type-selection">
            <label className="user-type_label">
              Врач
              <input
                type="radio"
                name="userType"
                value="doctor"
                checked={formData.userType === "doctor"}
                onChange={handleChange}
              />
            </label>
            <label className="user-type_label">
              Пациент
              <input
                type="radio"
                name="userType"
                value="patient"
                checked={formData.userType === "patient"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="login-content-button">
            <p>{errorText}</p>
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

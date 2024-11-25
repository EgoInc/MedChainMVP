import React, { useState } from "react";
import "./RegistrationForm.css";
import { formatPassport } from "../../features/RegistrationForm/formatPassport";
import { formatSnils } from "../../features/RegistrationForm/formatSnils";
import { formatInsuranceNumber } from "../../features/RegistrationForm/formatInsurance";
import { formatPhone } from "../../features/RegistrationFormAndLoginForm/formatPhone";
import { validate } from "../../features/RegistrationForm/validation";
const RegistrationForm = ({ onButtonClick, onSuccess }) => {
  const [formData, setFormData] = useState({
    fio: "",
    dob: "",
    passport: "",
    snils: "",
    insuranceNumber: "",
    phone: "",
    email: "",
    polyclinic: "",
    password: "",
    passwordRepeat: "",
    accept: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;
    if (name === "passport") {
      formattedValue = formatPassport(value);
    } else if (name === "snils") {
      formattedValue = formatSnils(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    } else if (name === "insuranceNumber") {
      formattedValue = formatInsuranceNumber(value);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : formattedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errorMessages } = validate(formData);

    if (isValid) {
      alert("Форма успешно отправлена");
      onSuccess();
      //Здесь отправка формы на бэк(?)
    } else {
      alert(`Пожалуйста, исправьте следующие ошибки:\n\n${errorMessages}`);
    }
  };

  //Верстка
  return (
    <div className="singup">
      <div className="singup-content">
        <form onSubmit={handleSubmit} className="signup-content_form">
          <h2 className="singup-content-text">Данные для регистрации</h2>
          <div className="singup-content-flex">
            {/* Левая часть формы */}
            <div className="singup-content-left">
              <input
                type="text"
                id="fio"
                name="fio"
                value={formData.fio}
                onChange={handleChange}
                placeholder="ФИО"
                required
                className="input_text"
              />

              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Дата рождения"
                required
                className="input_text"
              />

              <input
                type="text"
                id="passport"
                name="passport"
                value={formData.passport}
                onChange={handleChange}
                placeholder="Серия и номер паспорта"
                maxLength="11"
                required
                className="input_text"
              />

              <input
                type="text"
                id="snils"
                name="snils"
                value={formData.snils}
                onChange={handleChange}
                placeholder="Номер СНИЛС"
                required
                className="input_text"
              />

              <input
                type="text"
                id="insuranceNumber"
                name="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={handleChange}
                placeholder="Номер страхового полиса"
                required
              />
            </div>

            {/* Правая */}
            <div className="singup-content-right">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Введите номер телефона"
                required
                className="input_text"
              />

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Введите Email"
                required
              />

              <input
                type="text"
                id="polyclinic"
                name="polyclinic"
                value={formData.polyclinic}
                onChange={handleChange}
                placeholder="Введите Вашу поликлинику"
                required
                className="input_text"
              />

              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                required
                className="input_text"
              />

              <input
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                value={formData.passwordRepeat}
                onChange={handleChange}
                placeholder="Повторите пароль"
                required
                className="input_text"
              />
            </div>
          </div>

          {/* Чекбокс и кнопка */}
          <div className="checkbox-container">
            {/*Левая часть нижней части */}
            <div className="checkbox-container-left">
              <label htmlFor="accept">
                Соглашаюсь на обработку персональных данных
              </label>
              <input
                type="checkbox"
                id="accept"
                name="accept"
                checked={formData.accept}
                onChange={handleChange}
                required
              />
            </div>
            {/*Правая часть нижней части */}
            <div className="checkbox-container-right">
              <button type="submit" onClick={onButtonClick}>
                Отправить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

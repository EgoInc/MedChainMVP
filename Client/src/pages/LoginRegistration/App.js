import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../../features/HeaderRegLogin/Header.js";
import RegistrationForm from "../RegistrationForm/RegistrationForm.js";
import LoginForm from "../LoginForm/LoginForm.js";
import { useState } from "react";
import Error from "../Error/Error.js";
const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasError, setHasError] = useState(false);
  const togleForm = () => {
    setIsLogin(!isLogin);
    setHasError(false);
  };
  return (
    <div className="App">
      <Header
        title={isLogin ? "Вход в аккаунт" : "Регистрация"}
        nearButtonText={isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
        buttonText={isLogin ? "Регистрация" : "Вход"}
        buttonClass={isLogin ? "registration-button" : "login-button"}
        onButtonClick={togleForm}
      />
      <div className="bottom">
        {hasError && <Error />}
        {isLogin ? (
          <LoginForm
            setError={setHasError}
            errorText={hasError ? "Не удалось войти" : ""}
          />
        ) : (
          <RegistrationForm onSuccess={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default App;

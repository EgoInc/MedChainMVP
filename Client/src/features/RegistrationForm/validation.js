export const validate = (formData) => {
  let isValid = true;
  let errorMessages = "";

  // Валидация ФИО
  if (!formData.fio) {
    errorMessages += "ФИО: Это поле обязательно\n";
    isValid = false;
  }

  // Валидация даты рождения
  if (!formData.dob) {
    errorMessages += "Дата рождения: Это поле обязательно\n";
    isValid = false;
  }

  // Валидация паспорта
  const passportRegex = /^\d{4} \d{6}$/;
  const passportNoSpaceRegex = /^\d{10}$/;
  if (
    !passportRegex.test(formData.passport) &&
    !passportNoSpaceRegex.test(formData.passport)
  ) {
    errorMessages += "Паспорт: Неверный формат паспорта\n";
    isValid = false;
  }

  // Валидация номера телефона
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  if (!phoneRegex.test(formData.phone)) {
    errorMessages += "Телефон: Неверный формат номера телефона\n";
    isValid = false;
  }

  // Валидация СНИЛС
  const snilsRegex = /^\d{3}-\d{3}-\d{3} \d{2}$/;
  if (!snilsRegex.test(formData.snils)) {
    errorMessages += "СНИЛС: Неверный формат СНИЛС\n";
    isValid = false;
  }
  //Валидация Полиса
  const insuranceNumberRegex = /^\d{11}$/; // Формат XXX-XXX-XXX-XX
  if (!insuranceNumberRegex.test(formData.insuranceNumber)) {
    errorMessages += "Полис: Неверный формат номера страхового полиса\n";
    isValid = false;
  }
  // Валидация других полей
  if (!formData.email) {
    errorMessages += "Email: Email обязателен\n";
    isValid = false;
  }

  if (!formData.password || formData.password.length < 6) {
    errorMessages += "Пароль: Пароль должен быть не менее 6 символов\n";
    isValid = false;
  }

  if (formData.password !== formData.passwordRepeat) {
    errorMessages += "Пароль: Пароли не совпадают\n";
    isValid = false;
  }

  return { isValid, errorMessages };
};

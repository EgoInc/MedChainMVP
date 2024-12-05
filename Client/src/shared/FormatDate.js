import React from "react";

// перевод даты с формата ISO на формат для отображения
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default formatDate;

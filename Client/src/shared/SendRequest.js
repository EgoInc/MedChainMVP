import React from "react";

export const sendRequest = async (url) => {
  let headers = new Headers();
  headers.append("Origin", "http://localhost:3000");
  return await fetch(url, { headers: headers }).then((response) => {
    return response.json();
  });
};
export default sendRequest;

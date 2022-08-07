import React, { useState } from "react";

import axios from "axios";

import "./App.css";

const App = () => {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const options = {
    method: "GET",
    url: "https://og-link-preview.p.rapidapi.com/",
    params: {
      url: "https://dribbble.com/shots/15197978-Credit-Card-UI-challenge",
    },
    headers: {
      "X-RapidAPI-Key": "bbc8ff2f91mshff933d9b5af0c6ap10faeejsn4278437b2a98",
      "X-RapidAPI-Host": "og-link-preview.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const result = response.data;
      setImg(result.cover);
      setTitle(result.title);
      setDesc(result.description);
    })
    .catch(function (error) {
      console.error(error);
    });
  return (
    <div className="card">
      <img src={img} />
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default App;

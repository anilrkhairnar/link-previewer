import React, { useState } from "react";

import VanillaTilt from "vanilla-tilt";

import axios from "axios";

import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");

  const options = {
    method: "GET",
    url: "https://og-link-preview.p.rapidapi.com/",
    params: {
      url: input,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": "og-link-preview.p.rapidapi.com",
    },
  };

  const clicked = () => {
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
    setLink(input);
    setInput("");
  };
  const openLink = () => {
    window.open(link, "_blank");
  };
  VanillaTilt.init(document.querySelector(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });

  //It also supports NodeList
  VanillaTilt.init(document.querySelectorAll(".card"));

  return (
    // <div className="card">
    //   <img src={img} />
    //   <h1>{title}</h1>
    //   <p>{desc}</p>
    // </div>
    <>
      <nav>
        <img className="logo" src={require("./assets/logo.png")} alt="logo" />
        <div className="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className="container">
        {img ? (
          <div className="card" onClick={openLink}>
            <div className="card-top">
              <img src={img} alt="link-image" />
            </div>
            <div className="card-content">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ) : (
          <div>
            <img
              className="illustration"
              src={require("./assets/Illustration.png")}
              alt="illustration"
            />
          </div>
        )}

        <div className="form">
          <h1>Have a look of your link...</h1>
          <div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter link..."
            />
          </div>
          <button onClick={clicked}>Preview</button>
        </div>
      </div>
    </>
  );
};

export default App;

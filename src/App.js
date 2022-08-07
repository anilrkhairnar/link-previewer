import React, { useState } from "react";

import VanillaTilt from "vanilla-tilt";

import axios from "axios";

import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  const [img, setImg] = useState("This is an Image");
  const [title, setTitle] = useState("Title here");
  const [desc, setDesc] = useState("Paragraph here...");

  // API key here
  const key = "bbc8ff2f91mshff933d9b5af0c6ap10faeejsn4278437b2a98";

  const options = {
    method: "GET",
    url: "https://og-link-preview.p.rapidapi.com/",
    params: {
      url: input,
    },
    headers: {
      "X-RapidAPI-Key": key,
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
        console.log("working", img, title, desc);
      })
      .catch(function (error) {
        console.error(error);
      });
    setInput("");
  };
  VanillaTilt.init(document.querySelector(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    axis: "x",
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
        {!img ? (
          <div>
            <img
              className="illustration"
              src={require("./assets/Illustration.png")}
              alt="illustration"
            />
          </div>
        ) : (
          <div className="card">
            <div className="card-top">
              <img src={img} alt="link-image" />
            </div>
            <div className="card-content">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
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

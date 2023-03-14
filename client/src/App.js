import React from "react";
import language from "./language.js";
import Home from "./components/Home.jsx";
import "./style.css";

function App() {
  const keys = Object.keys(language);
  const values = Object.values(language);

  return (
    <div className="font-sans">
      <Home keys={keys} values={values} />
    </div>
  );
}

export default App;

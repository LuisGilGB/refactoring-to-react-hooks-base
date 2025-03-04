import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import { loadMirageInDev } from "./mocks/loadMirageServer";

loadMirageInDev().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

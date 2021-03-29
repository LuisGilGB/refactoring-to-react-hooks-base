import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { loadMirageInDev } from "./mocks/loadMirageServer";

loadMirageInDev().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { createServer } from "miragejs";
import {sales, subscriptions} from './mocks';
import { addLabelToResponseItemsBySerializing } from "./common/utils/mockups";

createServer ({
  routes() {
    this.get("/sales/", () => addLabelToResponseItemsBySerializing(sales));
    this.get("/subscriptions/", () => addLabelToResponseItemsBySerializing(subscriptions));
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

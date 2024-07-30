import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { FirebaseProvider } from "./Firebase/firebaseConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <FirebaseProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose="2000" />
        <App />
      </BrowserRouter>
    </FirebaseProvider>
  </Provider>
);

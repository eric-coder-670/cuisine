import React, { Suspense } from "react";
import "./assets/scss/style.scss";
import ReactDOM from "react-dom/client"; // Utilisez "react-dom/client" pour createRoot
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Loader from "./layouts/loader/Loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loader />}>
    <Router>
      <App />
    </Router>
  </Suspense>
);

// Le reste de votre code demeure inchangé
reportWebVitals();

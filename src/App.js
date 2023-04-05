import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import RoutePage from "./component/route";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <RoutePage />
    </div>
  );
}

export default App;

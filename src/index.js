import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <Suspense fallback={<LoadingPage />}>
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  <Router>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Router>
  // </PersistGate>
  //   {/* </Provider>
  // </Suspense> */}
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

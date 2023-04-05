import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SidebarComponent from "./SidebarComponent";

export default function Layout({ children }) {
  const styles = {
    display: "flex",
    flexDirection: "row",
  };
  return (
    <>
        <Header />
        <main style={styles} className="main">
          <SidebarComponent />
          {children}
        </main>
        <Footer />
    </>
  );
}

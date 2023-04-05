import React from "react";

export default function Footer() {
  const styles = {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    width: "100%",
  };
  return (
    <footer style={styles} className="bg-dark text-light p-2">
      footer
    </footer>
  );
}

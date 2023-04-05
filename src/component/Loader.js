import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loader({ color, size }) {
  return (
    <Spinner animation="border" size={size} variant={color} />
  );
}

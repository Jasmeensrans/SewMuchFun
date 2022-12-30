import React from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import './common.css'

export const CustomButton = (props: {
  color: ("black" | "neon" | "green" | "none" | "no-outline");
  text: string;
}) => {
  let buttonClass = "custom-button-black";

  switch(props.color) {
    case "neon":
      buttonClass="custom-button-neon"
      break;
    case "green":
      buttonClass="custom-button-green"
      break;
    case "no-outline":
      buttonClass="no-outline-button"
      break;
    case "none":
      buttonClass="custom-button-none"
      break;
    default:
      buttonClass = "custom-button-black";
      break;
  }
  return (
    <>
      <Button
        className={buttonClass}
      >
        {props.text}
      </Button>
    </>
  );
};

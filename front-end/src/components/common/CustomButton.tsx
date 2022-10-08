import React from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import './common.css'

export const CustomButton = (props: {
  color: ("black" | "neon" | "green" | "none");
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
        style={{paddingLeft: '25px', paddingRight:'25px'}}
      >
        {props.text}
      </Button>
    </>
  );
};

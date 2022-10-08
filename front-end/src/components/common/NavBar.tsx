import { IconButton } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const NavBar = (props: { isLoggedIn: boolean }) => {
  return (
    <div className="nav">
      <p className="nav-header">Sew Much Fun</p>
      {props.isLoggedIn ? (
        <>
          <div className="nav-button">
            <Link to="/profile">
              <IconButton className="account-icon">
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </div>
          <div className="nav-button">
            <CustomButton color="none" text="Settings" />
          </div>
          <div className="nav-button">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <CustomButton color="none" text="Home" />
            </Link>
          </div>
          <div className="nav-button">
            <Link to="/create" style={{ textDecoration: "none" }}>
              <CustomButton color="neon" text="Create" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="nav-button">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <CustomButton text="Log In" color="black" />
            </Link>
          </div>
          <div className="nav-button">
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <CustomButton text="Sign Up" color="neon" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

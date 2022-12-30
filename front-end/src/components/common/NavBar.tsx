import { IconButton } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./common.css";

export const NavBar = (props: { isLoggedIn: boolean; username?: string }) => {
  return (
    <div className="nav">
      <p className="nav-header">Sew Much Fun</p>
      {props.isLoggedIn ? (
        <>
          <div className="nav-button">
            <Link to={`/profile/${props.username}`}>
              <IconButton className="account-icon">
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </div>
          <div className="nav-button">
            <Link to="/settings">
              <CustomButton color="none" text="Settings" />
            </Link>
          </div>
          <div className="nav-button">
            <Link to="/home">
              <CustomButton color="none" text="Home" />
            </Link>
          </div>
          <div className="nav-button">
            <Link to="/create">
              <CustomButton color="black" text="Create" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="nav-button">
            <Link to="/signup">
              <CustomButton text="Sign Up" color="black" />
            </Link>
          </div>
          <div className="nav-button">
            <Link to="/login">
              <CustomButton text="Log In" color="none" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

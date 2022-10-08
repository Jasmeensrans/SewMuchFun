import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "./authorize.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import agent from "../../api/agent";
import { UserFormValues } from "../../models/user";
import { useStore } from "../../App";

export default function Authorize(props: { isLogin: boolean }) {
  const [isLogin, setLogIn] = useState(props.isLogin);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  let buttonText = isLogin ? "Login" : "Signup";
  let linkText = isLogin
    ? "Don't have an account? Signup"
    : "Already have an account? Login";

  const navigate = useNavigate();

  const {addUsername, addToken} = useStore()

  const loginMutatation = useMutation((user: UserFormValues):any =>
    agent.Account.login(user),
    {
      onError: () => setErrorText("Invalid email or password"),
      onSuccess: (data: any) => {
        addUsername(data.username);
        addToken(data.token)
        window.localStorage.setItem("jwt", data.token);
        navigate('/create')
      }
    }
  );
  const signupMutation = useMutation(
    (user: UserFormValues):any => agent.Account.register(user),
    {
      onError: (error: any) => setErrorText(error.response.data),
      onSuccess: (data: any) => {
        addUsername(data.username);
        addToken(data.token)
        window.localStorage.setItem("jwt", data.token);
        navigate('/create')
      },
      mutationKey: 'hello'
    }
  );

  // password must contain uppercase, lowercase, must be 8+ and a alphanumeric charactor
  const onClick = async () => {
    if (isLogin) {
      if (email !== "" && password !== "") {
        await loginMutatation.mutateAsync({
          email: email,
          password: password,
        });

      } else {
        setErrorText("you are missing some fields");
      }
    } else {
      if (email !== "" && password !== "" && username !== "") {
        // check password complexity
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (regex.test(password)) {
          await signupMutation.mutateAsync({
            email: email,
            username: username,
            password: password,
          });

        } else {
          setErrorText(
            "password must be 8+ characters, contain a non-alphanumeric character, an uppercase letter and a number"
          );
        }
      } else {
        setErrorText("you are missing some fields");
      }
    }
  };
  useEffect(() => {
    setErrorText("");
  }, [isLogin]);

  return (
    <div className="login-modal">
      <p className="login-title">Welcome to Sew Much Fun</p>
      <div className="login-input-div">
        <p className="login-text">Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        ></input>
      </div>
      {!isLogin && (
        <div className="login-input-div">
          <p className="login-text">Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          ></input>
        </div>
      )}
      <div className="login-input-div">
        <p className="login-text">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          name="username"
        ></input>
        <Button
          className="login-button"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
          onClick={onClick}
        >
          {buttonText}
        </Button>
        <Button
          className="login-link"
          onClick={() => setLogIn((prev) => !prev)}
          component="button"
        >
          {linkText}
        </Button>
        <p
          style={{
            color: "red",
            fontFamily: "Open Sans, sans-serif",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "300",
          }}
        >
          {errorText}
        </p>
      </div>
    </div>
  );
};

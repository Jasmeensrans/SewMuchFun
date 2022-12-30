import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import "./authorize.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import agent from "../../api/agent";
import { UserAuthInfo, UserFormValues } from "../../models/user";

export default function Authorize(props: { isLogin: boolean }) {
  const [isLogin, setLogIn] = useState(props.isLogin);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  let buttonText = isLogin ? "Login" : "Signup";
  let linkText = isLogin
    ? "Don't have an account? Signup"
    : "Already have an account? Login";

  const navigate = useNavigate();

  const loginMutation = useMutation(
    (user: UserFormValues) => {
      return agent.Account.login(user);
    },
    {
      onError: () => setErrorText("Invalid email or password"),
      onSuccess: async (data: UserAuthInfo) => {
        window.localStorage.setItem("jwt", data.token);
        navigate("/home");
      },
    }
  );
  const signupMutation = useMutation(
    (user: UserFormValues) => agent.Account.register(user),
    {
      onError: (error: {response: {data: string}}) => {
        setErrorText(error.response.data);
      },
      onSuccess: (data: UserAuthInfo) => {
        window.localStorage.setItem("jwt", data.token);
        navigate("/discover");
      },
    }
  );

  // password must contain uppercase, lowercase, must be 8+ and a alphanumeric charactor
  const onClick = async () => {
    setLoading(true);
    if (isLogin) {
      if (email !== "" && password !== "") {
        loginMutation.mutate({
          email: email,
          password: password,
        });
      } else {
        setErrorText("you are missing some fields");
      }
    } else {
      if (
        email !== "" &&
        password !== "" &&
        username !== "" &&
        password === retypedPassword
      ) {
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
      } else if (retypedPassword !== password) {
        setErrorText("Passwords must match!");
      } else {
        setErrorText("you are missing some fields");
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    setErrorText("");
  }, [isLogin]);

  return (
    <div className={isLogin ?"login-modal": "signup-modal"}>
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
        {!isLogin && (
          <>
            <p className="login-text">Retype Password</p>
            <input
              type="password"
              value={retypedPassword}
              onChange={(e) => setRetypedPassword(e.target.value)}
              className="login-input"
              name="username"
            ></input>
          </>
        )}
        {loading ? (
          <>
            <CircularProgress className="login-loader"></CircularProgress>
          </>
        ) : (
          <Button
            className="login-button"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}

        <Button
          className="login-link"
          onClick={() => setLogIn((prev) => !prev)}
          component="button"
        >
          {linkText}
        </Button>
        <p className="login-error-text">
          {errorText}
        </p>
      </div>
    </div>
  );
}

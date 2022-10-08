import { NavBar } from "../components/common/NavBar";
import { observer } from "mobx-react-lite";
import Authorize from "../components/authorize/Authorize";

export default function Login() {
  return (
    <div style={{ height: "100vh" }}>
      <NavBar isLoggedIn={false} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "60%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Authorize isLogin={true} />
      </div>
    </div>
  );
}

import { NavBar } from "../components/common/NavBar";
import Authorize from "../components/authorize/Authorize";

export default function Login() {
  return (
    <div className="page-container blue-pink">
      <NavBar isLoggedIn={false} />
      <div className="centered-form">
        <Authorize isLogin={true} />
      </div>
    </div>
  );
}

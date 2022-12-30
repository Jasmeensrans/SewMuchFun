import Authorize from "../components/authorize/Authorize";
import { NavBar } from "../components/common/NavBar";

export const Register = () => {
  return (
    <div className="page-container blue-pink">
      <NavBar isLoggedIn={false} />
      <div className="centered-form">
        <Authorize isLogin={false} />
      </div>
    </div>
  );
};

import Authorize from "../components/authorize/Authorize";
import { NavBar } from "../components/common/NavBar";

export const Register = () => {
  return (
    <div style={{height: '100vh'}}>
      <NavBar isLoggedIn={false} />
      <div style={{position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)'}}>
        <Authorize isLogin={false} />
      </div>
    </div>
  );
};

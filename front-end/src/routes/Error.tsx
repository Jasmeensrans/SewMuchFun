import { NavBar } from "../components/common/NavBar";
import { TextBox } from "../components/common/TextBox";
import { useGetUserQuery } from "../queries/useGetUserQuery"

export const Error = () => {
    // try to get user
    const user = useGetUserQuery();
    return <div className="custom-grad page-container" style={{ backgroundImage: "url(/grad.png)" }}>
    <NavBar isLoggedIn={user.data?.username ? true: false} username={user.data?.username}></NavBar>
    <TextBox text="We're really sorry but this page doesn't exist :("/>
    </div>
}
import { NavBar } from "../components/common/NavBar"
import { Post } from "../components/post/Post";
import { useGetUserFeedQuery } from "../queries/useGetUserFeedQuery";
import { useGetUserQuery } from "../queries/useGetUserQuery";

export const Home = () => {
    const userData = useGetUserQuery()
    const username = userData.data?.username;
    const token = userData.data?.token;

    const feedInfo = useGetUserFeedQuery(username, token);
    const feed = feedInfo.data;
    console.log(username)

    return <>
    <NavBar isLoggedIn={true} />
    { feed && username && feed.map((post: any) => <div className="post-container"><Post post={post} username={username} token={token}/></div>)}
    </>
}
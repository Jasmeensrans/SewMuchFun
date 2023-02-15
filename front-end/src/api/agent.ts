import axios, { AxiosResponse } from "axios";
import { Post as PostModel } from "../models/post";
import { UserInfo as UserInfoDto } from "../models/user";
import { FollowDto, PasswordDto, User, UserAuthInfo, UserFormValues } from "../models/user";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, token: string) =>
    axios
      .get<T>(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  post: <T>(url: string, body: {}, token?: string) => {
    if (token) {
      return axios
        .post<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
        .then(responseBody);
    } else {
      return axios.post<T>(url, body).then(responseBody);
    }
  },
  put: <T>(url: string, body: {}, token: string) =>
    axios
      .put<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  del: <T>(url: string, token: string) =>
    axios
      .delete<T>(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
};

const Photo = {
  upload: (data: FormData, token: string) =>
    requests.post("/Photo", data, token),
};

const Account = {
  current: (token: string) => requests.get<User>("/account", token),
  login: (user: UserFormValues): Promise<UserAuthInfo> => requests.post<User>("/account/login", user),
  register: (user: UserFormValues):Promise<UserAuthInfo> =>
    requests.post<User>("/account/register", user),
  getUser: (token: string):Promise<User> => requests.get("/Account", token),
  changePassword: (body: PasswordDto, username: string, token: string) => requests.put(`/Account/${username}`, body, token)
};

const UserInfo = {
  getUserInfo: (username: string, token:string):Promise<UserInfoDto> => requests.get(`/UserInfo/${username}`, token),
  followUser: (body: FollowDto, token: string):Promise<unknown> => requests.post("/UserInfo/follow", body, token),
  unfollowUser: (body: FollowDto, token: string):Promise<unknown> => requests.post("/UserInfo/unFollow", body, token),
  getUserFeed: (body: {username: string}, token: string):Promise<PostModel[]> => requests.post("/UserInfo/userFeed", body, token),
  updateProfilePic: (body: {imageUrl: string, bio: string}, token: string, username: string) => requests.put(`/UserInfo/${username}`, body, token),
}

const Post = {
  create: (post: Partial<PostModel>, token: string) =>
    requests.post("/Post", post, token),
  delete: (id: string, token: string) => requests.del(`/Post/${id}`, token),
  get: (token: string) => requests.get('/Post', token) 
};

const agent = {
  Account,
  Photo,
  Post,
  UserInfo
};

export default agent;

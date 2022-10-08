import axios, { AxiosResponse } from "axios";
import { useStore } from "../App";
import { Post as PostModel } from "../models/post";
import { User, UserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, token: string) =>
    axios
      .get<T>(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  post: <T>(url: string, body: {}, token?: string) => {
    if (token) {
      axios
        .post<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
        .then(responseBody);
    } else {
      axios.post<T>(url, body).then(responseBody);
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
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  getUser: (token: string) => requests.get("/Account", token),
  getUserFeed: (token: string, username: string) =>
    requests.post(`/Account/userFeed?username=${username}`, {}, token),
  getUserInfo: (email: string) => requests.post("/Account/userInfo", JSON.stringify({email: "12"})),
};

const Post = {
  create: (post: Partial<PostModel>, token: string) =>
    requests.post("/Post", post, token),
  delete: (id: string, token: string) => requests.del(`/Post/${id}`, token),
};

const agent = {
  Account,
  Photo,
  Post,
};

export default agent;

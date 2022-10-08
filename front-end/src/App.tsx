import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreatePost } from "./routes/CreatePost";
import Login from "./routes/Login";
import create from 'zustand';
import { Register } from "./routes/Register";
import { Landing } from "./routes/Landing";
import { Home } from "./routes/Home";
import { Account } from "./routes/Account";
import { Settings } from "./routes/Settings";

interface state {
  username: string,
  token: string,
  addUsername: (username: string) => void,
  addToken: (token: string) => void;
}

export const useStore = create<state>(set => ({
  username: "",
  addUsername: (username: string) => set(() => ({username: username})),
  token: "",
  addToken: (token: string) => set(() => ({token: token})),
}))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

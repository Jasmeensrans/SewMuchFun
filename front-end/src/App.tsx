import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreatePost } from "./routes/CreatePost";
import Login from "./routes/Login";
import { Register } from "./routes/Register";
import { Landing } from "./routes/Landing";
import { Home } from "./routes/Home";
import { Account } from "./routes/Account";
import { Settings } from "./routes/Settings";
import { Discover } from "./routes/Discover";
import { Error } from "./routes/Error";
import { ProtectedRoute } from "./routes/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

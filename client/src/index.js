import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Logout from "./pages/Logout/Logout";
import CreateMeeting from "./pages/CreateMeeting/CreateMeeting";
import Room from "./pages/Room/Room";
import "./index.css";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ErrorPage from "./error.page";
import { Toaster } from "react-hot-toast";
import * as serviceWorker from "./serviceWorker";
import * as process from 'process';

window.global = window;
window.process = process;
window.Buffer = [];

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/create",
    element: <CreateMeeting />,
  },
  {
    path: "/room/:roomID",
    element: <Room />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);


serviceWorker.unregister();
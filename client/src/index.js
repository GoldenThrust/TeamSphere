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
import MeetMe from "./pages/ScheduleMeet/meet";

window.global = window;
window.process = process;
window.Buffer = [];

axios.defaults.baseURL = "https://teamsphere-ckxa.onrender.com";
// axios.defaults.baseURL = "https://192.168.76.163";
// axios.defaults.baseURL = "https://localhost";
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
    path: "/create/meet",
    element: <MeetMe />
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
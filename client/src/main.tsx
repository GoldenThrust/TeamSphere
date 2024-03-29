import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home.tsx";
import SignIn from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import Logout from "./pages/Logout/Logout.tsx";
import CreateMeeting from "./pages/CreateMeeting/CreateMeeting.tsx";
import Room from "./pages/Room/Room.tsx";
import "./index.css";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import ErrorPage from "./error.page.tsx";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "https://teamsphere-ckxa.onrender.com/";
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
    path: "/room/:roomId",
    element: <Room />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
import MeetMe from "./pages/ScheduleMeet/meet";
import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

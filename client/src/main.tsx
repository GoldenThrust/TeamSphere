import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home.tsx'
import SignIn from './pages/Login/Login.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import CreateMeeting from './pages/CreateMeeting/CreateMeeting.tsx'
import Room from './pages/Room/Room.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error.page.tsx";

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
      path: "/create",
      element: <CreateMeeting />,
  },
  {
    path: "/room/:roomId",
    element: <Room />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

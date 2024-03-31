import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import { useEffect } from "react";
export default function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    try {
      auth?.logout();
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <>
      <div>You have Successfully Logout</div>
    </>
  );
}

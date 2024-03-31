import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/useContext";
export default function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      auth?.logout();
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, [auth, navigate]);

  return (
    <>
      <div>You have Successfully Logout</div>
    </>
  );
}

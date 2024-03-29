// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext";
export default function Logout() {
    const auth = useAuth();
    // const navigate = useNavigate();

    try {
        auth?.logout();
        // return navigate("/");
    } catch (error) {
        console.log(error);
    }

    return (
        <>
        <div>
            You have Successfully Logout
        </div>
        </>
    )
}
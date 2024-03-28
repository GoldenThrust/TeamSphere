import TeamSphereLogo from "/TeamSphere.svg";
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import "../../styles/home.css";

export default function Header() {
    return (
        <header>
            <div>
                <img src={TeamSphereLogo} alt="TeamSphere Logo" />
            </div>
            <nav>
                <Link to={"#home"}>
                    Home
                </Link>
                <Link to={"#features"}>
                    Features
                </Link>
                <Button className="button" variant="contained" href="login">
                    Login
                </Button>
            </nav>
        </header>
    )
}
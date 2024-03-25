import TeamSphereLogo from "../../assets/TeamSphere.svg";


export default function Header() {
    return (
        <header>
            <div>
                <img src={TeamSphereLogo} alt="TeamSphere Logo" />
            </div>
            <nav>
                <span>
                    Home
                </span>
                <span>
                    Features
                </span>
                <span>
                    Login
                </span>
            </nav>
        </header>
    )
}
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";

export const Navbar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const logout = () => {
		setCookies("access_token", "");
		window.localStorage.removeItem("userID");
		navigate("/");
	};
	return (
		<div className="navbar">
			<Link to="/">
				<img src="../assets/cooked-logo.png" alt="log1o" />
				<img src=".../public/cooked-logo.png" alt="logo2" />
				<img src="../assets/cooked-logo.png" alt="logo3" />
				<img src="client/dist/assets/cooked-logo.png" alt="logo4" />
				<img src=".../assets/cooked-logo.png" alt="logo5" />
			</Link>
			<div className="navlinks">
				<Link to="/create-recipes">Create Recipes</Link>
				{!cookies.access_token ? (
					<div>
						{/* <Link to="/auth">Login/Register</Link> */}
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div>
				) : (
					<>
						<Link to="/saved-recipes">Saved Recipes</Link>
						<a className="logout" onClick={logout}>
							Logout
						</a>
					</>
				)}
			</div>
		</div>
	);
};

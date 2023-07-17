import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";
import breakfast from "../api/breakfast.json";
import mainCourse from "../api/mainCourse.json";
import desserts from "../api/dessert.json";
import appetizer from "../api/appetizer.json";
import beverage from "../api/beverage.json";
import chicken from "../api/chicken.json";
import beef from "../api/beef.json";
import pork from "../api/pork.json";
import seafood from "../api/seafood.json";
import pasta from "../api/pasta.json";
import fruit from "../api/fruit.json";
import vegetable from "../api/vegetable.json";
import mexican from "../api/mexican.json"

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
			<div className="navbar-upper">
				<Link to="/">
					<img src="./cooked-logo.png" alt="logo1" />
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
			<div className="navbar-lower">
				<div className="dropdown">
					<a href="#" className="dropbtn">
						Meals
					</a>
					<div className="dropdown-content">
						<Link to="/recipes" state={[breakfast, "Breakfast"]}>
							Breakfast
						</Link>
						<Link
							to="/recipes"
							state={[mainCourse, "Lunch & Dinner"]}
						>
							Lunch & Dinner
						</Link>
						<Link to="/recipes" state={[desserts, "Dessert"]}>
							Dessert
						</Link>
						<Link to="/recipes" state={[appetizer, "Appetizer"]}>
							Appetizer & Snack
						</Link>
						<Link to="/recipes" state={[beverage, "Beverage"]}>
							Beverage
						</Link>
					</div>
				</div>

				<div className="dropdown">
					<a href="#" className="dropbtn">
						Ingredients
					</a>
					<div className="dropdown-content">
						<Link to="/recipes" state={[chicken, "Chicken"]}>
							Chicken
						</Link>
						<Link to="/recipes" state={[beef, "Beef"]}>
							Beef
						</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>
							Pork
						</Link>
						<Link to="/recipes" state={[seafood, "Seafood"]}>
							Seafood
						</Link>
						<Link to="/recipes" state={[pasta, "Pasta"]}>
							Pasta
						</Link>
						<Link to="/recipes" state={[fruit, "Fruit"]}>
							Fruits
						</Link>
						<Link to="/recipes" state={[vegetable, "Vegetable"]}>
							Vegetables
						</Link>
					</div>
				</div>

				<div className="dropdown">
					<a href="#" className="dropbtn">
						Cuisines
					</a>
					<div className="dropdown-content">
						<Link to="/recipes" state={[mexican, "Mexican"]}>Mexican</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Italian</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Chinese</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Indian</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Korean</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Vietnamese</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Filipino</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>Japanese</Link>
						<Link to="/recipes" state={[pork, "Pork"]}>View All</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

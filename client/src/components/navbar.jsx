import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";
import breakfastRecipes from "./breakfast.json";
import desserts from "./dessert.json";
import { useState } from "react";

const dessertRecipes = desserts.results;

export const Navbar = () => {
	// console.log(dessertRecipes)
	const [dessertsToSend, SetDessertsToSend] = useState(dessertRecipes);
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
						<Link to="/recipes" state={dessertRecipes}>
							Breakfast
						</Link>
						<a href="#">Breakfast</a>
						<a href="#">Lunch & Dinner</a>
						<Link to="/recipes" state={desserts}>
							Dessert
						</Link>
						<a href="#">Appetizer & Snack</a>
						<a href="#">Beverage</a>
						<a href="#">View All</a>
					</div>
				</div>

				<div className="dropdown">
					<a href="#" className="dropbtn">
						Ingredients
					</a>
					<div className="dropdown-content">
						<a href="#">Chicken</a>
						<a href="#">Beef</a>
						<a href="#">Pork</a>
						<a href="#">Seafood</a>
						<a href="#">Pasta</a>
						<a href="#">Fruits</a>
						<a href="#">Vegetables</a>
						<a href="#">View All</a>
					</div>
				</div>

				<div className="dropdown">
					<a href="#" className="dropbtn">
						Cuisines
					</a>
					<div className="dropdown-content">
						<a href="#">Mexican</a>
						<a href="#">Italian</a>
						<a href="#">Chinese</a>
						<a href="#">Indian</a>
						<a href="#">Korean</a>
						<a href="#">Vietnamese</a>
						<a href="#">Filipino</a>
						<a href="#">Japanese</a>
						<a href="#">View All</a>
					</div>
				</div>
			</div>
		</div>
	);
};

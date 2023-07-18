import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { Auth } from "./components/auth";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { CreateRecipes } from "./components/create-recipes";
import { SavedRecipes } from "./components/saved-recipes";
import { Navbar } from "./components/navbar";
import { RecipesTemplate } from "./components/recipesTemplate";
import { useState } from "react";

export const APIurl = "https://recipe-mern-server.onrender.com";

function App() {
	const [showNavbar, setShowNavbar] = useState(true)
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/auth" element={<Auth />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route
						path="/recipes"
						element={<RecipesTemplate />}
					></Route>
					<Route
						path="/create-recipes"
						element={<CreateRecipes />}
					></Route>
					<Route
						path="/saved-recipes"
						element={<SavedRecipes />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

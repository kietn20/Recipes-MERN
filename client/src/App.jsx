import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { Auth } from "./components/auth";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { CreateRecipes } from "./components/create-recipes";
import { SavedRecipes } from "./components/saved-recipes";
import { RecipesTemplate } from "./components/recipesTemplate";
import { UserCreatedRecipes } from "./components/user-create-recipes";

export const APIurl = "https://recipe-mern-server.onrender.com";

function App() {
	return (
		<div className="App">
			<Router basename="*">
				<Routes>
					<Route path="/*" element={<Home />}></Route>
					<Route path="/auth" element={<Auth />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route
						path="/recipes"
						element={<RecipesTemplate />}
					></Route>
					<Route
						path="/user-created-recipes"
						element={<UserCreatedRecipes />}
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

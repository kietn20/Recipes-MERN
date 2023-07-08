import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./templates/home";
import { Auth } from "./templates/auth";
import { CreateRecipes } from "./templates/create-recipes";
import { SavedRecipes } from "./templates/saved-recipes";
import { Navbar } from "./components/navbar";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/auth" element={<Auth />}></Route>
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

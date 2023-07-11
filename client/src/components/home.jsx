import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { APIurl } from "../App";
import "./home.css";

const APIkey = import.meta.env.VITE_SPOONKEY;

export const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);
	const [apiRecipes, setApiRecipes] = useState([]);
	const [recipesIDs, setRecipesIDs] = useState([])
	const [recipesInfo, setRecipesInfo] = useState([])

	const userID = useGetUserID();

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get(`${APIurl}/recipes`);
				setRecipes(response.data);
			} catch (err) {
				console.err(err);
				console.err("useEffect error");
			}
		};

		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`${APIurl}/recipes/savedRecipes/ids/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.err(err);
				console.err("fetchSavedRecipe error");
			}
		};

		fetchRecipe();
		if (cookies.access_token) fetchSavedRecipe();
	}, []);

	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put(
				`${APIurl}/recipes`,
				{
					recipeID,
					userID,
				},
				{ headers: { authorization: cookies.access_token } }
			);
			console.log(response);
			console.log(response.data);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.err(err);
			console.err("!!!!!!!!!!!!!!!saveRecipe error");
		}
	};

	const isRecipeSaved = (id) => savedRecipes.includes(id);

	const popularRecipes = async () => {
		try {
			const response = await axios.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkey}&sort=popularity&number=4`
			);
			console.log("Returning: popularRecipes")
			console.log(response.data.results);
			setApiRecipes(response.data.results);
		} catch (err) {
			console.error(err);
			console.error("randomRecipes ERROR");
		}
	};

	const getPopularRecipesInfo = async (id) => {
		try {
			const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIkey}`)
			console.log('Returning: individual recipe info')
			setRecipesInfo([...recipesInfo, response.data])
		} catch (err) {
			console.error(err)
			console.error("from getPopularRecipesInfo function")
		}
	}

	// popularRecipes();
	console.log(apiRecipes);

	apiRecipes.map((recipe) => {
		console.log(recipe.title);
		console.log(recipe.id);
		setRecipesIDs([...recipesIDs, recipe.id]);
	})

	recipesIDs.map((id) => {
		getPopularRecipesInfo(id);
		// console.log("new info" + newInfo)
		// setRecipesInfo([...recipesInfo, newInfo]
	})

	return (
		<div className="home">
			<div className="popularDiv">
				<h1 className="popular-title">Popular Recipes</h1>
				<div className="popular-recipes">
					<div className="popular-big">
						<a href="">
							<img
								src="https://hips.hearstapps.com/hmg-prod/images/instant-pot-pho-1-1649171262.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*"
								alt=""
							/>
							<h1>Pho Bo (Vietnamese Beef Noodle Soup) </h1>
						</a>
					</div>
					<div className="popular-side">
						{recipesInfo.map((info) => (
							<a href={info.spoonacularSourceUrl}>
								<div>
									<img
										src={info.image}
										alt={info.title}
									/>
									<h1>{info.title}</h1>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
			<ul>
				{recipes.map((recipe) => (
					<li className="recipeItem" key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
							<button
								onClick={() => saveRecipe(recipe._id)}
								disabled={isRecipeSaved(recipe._id)}
							>
								{isRecipeSaved(recipe._id) ? "Saved" : "Save"}
							</button>
						</div>
						<div>
							<p>{recipe.instructions}</p>
						</div>
						<img src={recipe.imageUrl} alt={recipe.name} />
						<p>Cooking Time: {recipe.cookingTime} (minutes)</p>
					</li>
				))}
			</ul>
		</div>
	);
};

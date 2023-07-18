import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { APIurl } from "../App";
import "./create-recipes.css";

const textAreaPlaceHolder =
	"1. Cook the bacon first to draw out fat.\n2. When bacon are close to done, add the eggs.\n3. Serve with some fresh bread, and enjoy.";

export const CreateRecipes = () => {
	const userID = useGetUserID();
	const [cookies, _] = useCookies(["access_token"]);
	const [image, setImage] = useState("./foodimageplaceholder.jpg");

	const [recipe, setRecipe] = useState({
		name: "",
		ingredients: [],
		instructions: "",
		imageUrl: "",
		cookingTime: 0,
		userOwner: userID,
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setRecipe({ ...recipe, [name]: value });
		// setImage(recipe.imageUrl)
	};

	const handleIngredientChange = (event, idx) => {
		const { value } = event.target;
		const ingredients = recipe.ingredients;
		ingredients[idx] = value;
		setRecipe({ ...recipe, ingredients });
		console.log(recipe);
	};

	// const handleImageChange = (event) => {
	// 	const { value } = event.target;
	// 	setRecipe({...recipe, imageUrl: value})
	// }

	const addIngredients = () => {
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(`${APIurl}/recipes`, recipe, {
				headers: { authorization: cookies.access_token },
			});
			alert("Recipe Created");
			navigate("/");
		} catch (err) {
			console.err(err);
		}
	};

	return (
		<div className="create-recipes-div">
			<h1 className="title">Create Recipe</h1>
			<div className="create-recipes-flex-horizontal">
				<img src={recipe.imageUrl ? recipe.imageUrl : "./foodimageplaceholder.jpg"} alt="" />
				<div className="create-recipe">
					<form onSubmit={onSubmit}>
						<label htmlFor="name">Recipe Name</label>
						<input
							type="text"
							placeholder="Tina's World Best Korean Corn Cheese"
							id="name"
							name="name"
							onChange={handleChange}
						/>
						<label htmlFor="ingredients">Ingredients</label>
						{recipe.ingredients.map((ingredient, idx) => (
							<div className="div-newIngredients">
								<h1>{idx+1}.</h1>
								<input
									className="input-newIngredients"
									key={idx}
									type="text"
									name="ingredients"
									value={ingredient}
									onChange={(event) =>
										handleIngredientChange(event, idx)
									}
								/>
							</div>
						))}
						<button
							className="button-ingredients"
							type="button"
							onClick={addIngredients}
						>
							Add Ingredient
						</button>
						<label htmlFor="instructions">Instructions</label>
						<textarea
							id="instructions"
							placeholder={textAreaPlaceHolder}
							name="instructions"
							onChange={handleChange}
						></textarea>
						<label htmlFor="imageUrl">Image URL</label>
						<input
							type="text"
							placeholder="https://www.seriouseats.com/thmb/x6dcqHE-keGtGRMbwaEJqKxHeeQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__07__20200715-studio-ghibli-Howls_BaconEggs1500-ebebd31467c24b89af81d18bc73f638e.jpg"
							id="imageUrl"
							name="imageUrl"
							onChange={handleChange}
						/>
						<label htmlFor="cookingTime">
							Cooking Time (minutes)
						</label>
						<input
							type="number"
							placeholder="10"
							id="cookingTime"
							name="cookingTime"
							onChange={handleChange}
						/>
						<button className="submit-button" type="submit">
							Create Recipe
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

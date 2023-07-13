import axios from "axios";
import * as fs from "fs";

const APIkey = import.meta.env.VITE_SPOONKEY;

export const spoonRecipes = async () => {
	const popularRecipes = async () => {
		try {
			let ids = "";
			const response = await axios.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkey}&sort=popularity&number=4`
			);

			const recipes = response.data.results;
			recipes.map((recipe) => {
				ids = ids + "," + recipe.id;
			});
			// console.log("Popular recipes IDs: " + ids);
			return ids;
		} catch (err) {
			console.error(err);
			console.error("randomRecipes ERROR");
		}
	};

	const getRecipesInfo = async (ids) => {
		try {
			let recipeInfo = await axios.get(
				`https://api.spoonacular.com/recipes/informationBulk?apiKey=${APIkey}&ids=${ids}`
			);
			// console.log(recipeInfo.data)
			return recipeInfo.data;
		} catch (err) {
			// console.err(err);
			console.err("recipeInfo ERROR");
		}
	};

	const getSides = async () => {
		const popularIdString = await popularRecipes();
		const infos = await getRecipesInfo(popularIdString);
		return infos;
	};

	return await getSides();
};

// console.log(typeof (await spoonRecipes()));
// let infos = await spoonRecipes();
// fs.writeFile("data.json", infos, (error) => {
//     if (error) {
//         console.error(error);
//     }
//     throw error;
// });

import express from "express"
import ObjectId, { mongo } from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
import mongoose from "mongoose";
// import ObjectId from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        if (!user.savedRecipes.includes(recipe)) {
            user.savedRecipes.push(recipe);
            await user.save();
        }
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
    }
});

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

router.delete("/savedRecipes/delete", async (req, res) => {
    try {
        const recipe = req.body.recipeID;
        const user = req.body.userID;
        // const recipe = await RecipeModel.findById(req.body.recipeID);
        // const user = await UserModel.findById(req.body.userID);

        // const index = user.savedRecipes.indexOf(recipe).toString();
        // user.savedRecipes.splice(index, 1);

        // const savedRecipes = await UserModel.find(
        //     { _id: '64b8b414728c545652098a55' },
        //     {
        //         $pull: {
        //             ObjectId: { '64a8df609956187032dcc2f4': { $in: savedRecipes } }
        //         }
        //     });

        // await UserModel.updateOne({ _id: user }, { $pull: { savedRecipes: ObjectId(req.body.recipeID) } });
        // const newArray = await UserModel.findById(ObjectId(req.body.userID));
        // res.json({ savedRecipes: newArray });

        await UserModel.updateOne({ _id: req.body.userID }, { $pull: { savedRecipes: req.body.recipeID } });
        const response = await UserModel.findById(req.body.userID);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// const deleteTest = async () => {
//     // const user = await UserModel.findById('64b8b414728c545652098a55');
//     // await UserModel.updateOne({ _id: '64b8b414728c545652098a55' }, { $pull: { savedRecipes: '64a8cf5215d92ca66adbc26a' } });
//     // await user.save();
//     // const response = await UserModel.findById('64b8b414728c545652098a55');
//     // console.log(response.savedRecipes[0]);

//     await UserModel.updateOne({ _id: "64b8b414728c545652098a55" }, { $pull: { savedRecipes: "64a8cf5215d92ca66adbc26a" } });
//     const response = await UserModel.findById("64b8b414728c545652098a55");
//     console.log(response);
// }

// deleteTest();

export { router as recipesRouter };
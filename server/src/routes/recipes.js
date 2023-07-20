import express from "express"
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// router.get("", async (req, res) => {
//     try {
//         res.json({ hello: 'hello world' });
//     } catch (err) {
//         res.json(err)
//     }
// });

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

router.delete("/savedRecipes/delete", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        // const user = await UserModel.findById('64b8b414728c545652098a55');
        // const recipe = await RecipeModel.findById('64a8df609956187032dcc2f4');

        const index = user.savedRecipes.indexOf(recipe);
        user.savedRecipes.splice({ ObjectId: '64a8cf5215d92ca66adbc26a' }, 1);
        user.savedRecipes.pop();
        // const user = await UserModel.findById('64b8b414728c545652098a55');
        // const recipeToRemove = await RecipeModel.findById('64a8df609956187032dcc2f4');

        // const savedRecipes = await UserModel.find(
        //     { _id: '64b8b414728c545652098a55' },
        //     {
        //         $pull: {
        //             ObjectId: { '64a8df609956187032dcc2f4': { $in: savedRecipes } }
        //         }
        //     });

        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json('frog2');
        res.json(err);
    }
});

export { router as recipesRouter };
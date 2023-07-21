import express from "express"
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
import { ObjectId } from "mongoose";

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

        await UserModel.updateOne({ _id: user }, { $pull: { 'savedRecipes': ObjectId(recipe) } });
        const newArray = await UserModel.findById({ _id: ObjectId(user) }).savedRecipes;
        // await user.save();
        res.json({ savedRecipes: newArray });
    } catch (err) {
        res.json(err);
    }
});

export { router as recipesRouter };
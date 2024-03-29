import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./src/routes/users.js";
import { recipesRouter } from "./src/routes/recipes.js";

dotenv.config();

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)

app.get("/", (req, res) => {
    res.json({ test: true });
})

mongoose.connect(
    `mongodb+srv://${mongoUsername}:${mongoPassword}@recipes.gtceo5q.mongodb.net/recipes?retryWrites=true&w=majority`
);



app.listen(3001, () => console.log("SERVER STARTED"));
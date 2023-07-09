import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const app = express();


app.use(express.json());
app.use(cors(
    {
        origin: ["https://vercel.com/kietn20/recipes-mern-frontend"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));

app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)

mongoose.connect(
    `mongodb+srv://${mongoUsername}:${mongoPassword}@recipes.gtceo5q.mongodb.net/recipes?retryWrites=true&w=majority`
);

app.listen(3001, () => console.log("SERVER STARTED"));
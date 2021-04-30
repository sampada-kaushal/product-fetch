import express from "express";
import cors from "cors";
import products from "./route/product.js";

const app= express();

//middleware
app.use(cors());
app.use(express.json());


app.use("/api/v1/product", products);
app.use("*",(req,res) => res.status(404).json({ error : "Page not found!"}));

export default app;

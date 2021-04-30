import express from "express";
import ProductsController from "../controller/product.js";
const router = express.Router();

router.route("/").get(ProductsController.apiGetProducts);

export default router;
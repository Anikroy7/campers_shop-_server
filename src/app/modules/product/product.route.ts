import express, { NextFunction, Request, Response } from "express";

import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import { uploader } from "../../utils/uploader";

const router = express.Router();

router.post(
  "/",
  uploader.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...req.body };
    req.body.price = parseInt(req.body.price);
    req.body.stockQuantity = parseInt(req.body.stockQuantity);
    req.body.ratings = parseInt(req.body.ratings);
    console.log(req.body);
    next();
  },
  validateRequest(createProductValidationSchema),
  ProductControllers.createProduct
);
router.get("/", ProductControllers.getProducts);
router.get("/:id", ProductControllers.getSingleProduct);
router.put(
  "/:id",
  uploader.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...req.body };
    console.log(req.files, req.files, { ...req.body });
    req.body.price = parseInt(req.body.price);
    req.body.stockQuantity = parseInt(req.body.stockQuantity);
    req.body.ratings = parseInt(req.body.ratings);
    console.log(req.body);
    next();
  },
  validateRequest(updateProductValidationSchema),
  ProductControllers.updateProduct
);
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductsRoutes = router;

import express from "express";
import { OrdersControllers } from "./order.controllers";


const router = express.Router();

router.post("/", OrdersControllers.createOrder);
router.get("/", OrdersControllers.getOrders);


export const OrdersRoutes = router;

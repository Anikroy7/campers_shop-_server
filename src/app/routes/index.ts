import { Router } from "express";
import { ProductsRoutes } from "../modules/product/product.route";
import { OrdersRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductsRoutes,
  },
  {
    path: "/orders",
    route: OrdersRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

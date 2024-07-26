import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Order } from "./order.model";
import { TOrder } from "./order.interface";


const createOrderIntoDB = async (payload: TOrder) => {
  const newOrder = await Order.create(payload);
  if (!newOrder) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Order");
  }
  return newOrder;
};
const getOrdersFromDB = async () => {
  const orders = await Order.find({});
  if (orders.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "There are not Orders here");
  }
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};

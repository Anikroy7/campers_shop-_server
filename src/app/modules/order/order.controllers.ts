import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { OrderServices } from "./order.service";


const createOrder = catchAsync(async (req, res) => {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order created successfully",
        data: result,
    });
});
const getOrders = catchAsync(async (req, res) => {
    const result = await OrderServices.getOrdersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Orders retrieved successfully",
        data: result,
    });
});





export const OrdersControllers = {
    createOrder,
    getOrders,

};

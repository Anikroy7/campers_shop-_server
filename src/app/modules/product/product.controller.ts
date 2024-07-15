import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";

const stripe = require("stripe")('sk_test_51PcVTyRoCwoYSOYVC4pgiN2g2tutBPQpOpEV1aOhjuo9JPX6rtPAMSN82AFredgIJHn6slKOzRULhU5UI3reca5D00IgpsvwKw');


const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const urls = [];
  if (req.files) {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    for (const file of files) {
      const newPath = (await uploadImageToCloudinary(
        `${process.cwd()}/${file.path}`,
        file.path
      )) as any;
      urls.push(newPath.secure_url);
    }
  }
  productData.images = urls;
  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const getProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const urls = [];

  if (req.files?.length > 0) {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    for (const file of files) {
      const newPath = (await uploadImageToCloudinary(
        `${process.cwd()}/${file.path}`,
        file.path
      )) as any;
      urls.push(newPath.secure_url);
    }
    productData.images = urls;
  }
  const result = await ProductServices.updateProductIntoDB(id, productData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products deleted successfully",
    data: result,
  });
});
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the servejr to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
const makePayment = catchAsync(async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "aud",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  }); 
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment successfully",
    clientSecret: paymentIntent.client_secret,
    data: null
  });
});



export const ProductControllers = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  makePayment
};

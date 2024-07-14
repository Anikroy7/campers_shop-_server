import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";

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

export const ProductControllers = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};

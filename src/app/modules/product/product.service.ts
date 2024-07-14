import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const newProduct = await Product.create(payload);
  if (!newProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Product");
  }
  return newProduct;
};
const getProductsFromDB = async () => {
  const cars = await Product.find({ isDeleted: { $ne: true } }).select(
    "-createdAt -updatedAt -__v"
  );
  if (cars.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "There are not products here");
  }
  return cars;
};

const getSingleProductFromDB = async (_id: string) => {
  const product = await Product.findById(_id).select(
    "-createdAt -updatedAt -__v"
  );
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the product");
  }
  if (product?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is already deleted");
  }
  return product;
};

const updateProductIntoDB = async (_id: string, payload: TProduct) => {
  const product = await Product.findById(_id);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the product");
  }
  if (product.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This product is already deleted!!!"
    );
  }

  const updatedData = {
    ...product.toObject(),
    ...payload,
  };
  const updatedProduct = await Product.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    select: "-createdAt -updatedAt -__v",
  });
  return updatedProduct;
};

const deleteProductFromDB = async (_id: string) => {
  const product = await Product.findById(_id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the product");
  }
  if (product?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This product is already deleted!!"
    );
  }
  const result = await Product.findByIdAndUpdate(_id, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getSingleProductFromDB,
};

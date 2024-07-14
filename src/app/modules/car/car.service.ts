import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
  const newCar = await Car.create(payload);
  if (!newCar) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create car");
  }
  return newCar;
};
const getCarsFromDB = async () => {
  const cars = await Car.find({ isDeleted: { $ne: true } }).select(
    "-createdAt -updatedAt -__v"
  );
  return cars;
};
const getSingleCarFromDB = async (_id: string) => {
  const car = await Car.findById(_id).select("-createdAt -updatedAt -__v");
  if (car?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is already deleted");
  }
  return car;
};

const updateCarIntoDB = async (_id: string, payload: TCar) => {
  const car = await Car.findById(_id);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the car");
  }
  if (car.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This car is already deleted!!!");
  }

  const updatedData = {
    ...car.toObject(),
    ...payload,
  };
  const updatedCar = await Car.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    select: "-createdAt -updatedAt -__v",
  });
  return updatedCar;
};

const deleteCarFromDB = async (_id: string) => {
  const car = await Car.findById(_id);
  if (car?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is already deleted!!");
  }
  const result = await Car.findByIdAndUpdate(_id, { isDeleted: true });
  return result;
};
export const CarServices = {
  createCarIntoDB,
  updateCarIntoDB,
  deleteCarFromDB,
  getCarsFromDB,
  getSingleCarFromDB,
};

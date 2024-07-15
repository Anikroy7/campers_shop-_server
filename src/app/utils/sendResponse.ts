import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
  clientSecret?:string
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: data?.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    token: data.token,
    clientSecret: data.clientSecret
  });
};

export default sendResponse;

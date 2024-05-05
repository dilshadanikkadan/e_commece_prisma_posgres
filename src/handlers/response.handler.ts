import { Response } from "express";

export const successMessage = (
  res :  Response ,
  statusCode: number,
  data: any
) => {
  return res.status(statusCode).json(data);
};

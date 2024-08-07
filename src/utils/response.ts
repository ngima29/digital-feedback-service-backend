import { Response } from "express";
import { HttpStatusEnum } from "../enums";
import { PaginationMetadata } from "../interfaces";

const successResponseData = ({
  data,
  metadata,
  message = "",
  res,
  statusCode = HttpStatusEnum.OK,
}: {
  data?: Object | Object[] | null;
  metadata?: PaginationMetadata;
  message?: string;
  res: Response;
  statusCode?: HttpStatusEnum;
}) => {
  res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    ...(data && { data }),
    ...(metadata && { metadata }),
  });
};

const errorResponse = ({
  error,
  res,
  statusCode = HttpStatusEnum.INTERNAL_SERVER_ERROR,
  customMessage = "Internal Server Error",
}: {
  error?: Error;
  res: Response;
  statusCode?: HttpStatusEnum;
  customMessage?: string;
}) => {
  const errorMessage = error ? error.message : customMessage;
  res.status(statusCode).json({
    success: false,
    error: {
      message: errorMessage,
      statusCode,
    },
  });
};

export { successResponseData, errorResponse };

import * as dotenv from "dotenv";
import { EnvironmentEnum, SortEnum } from "../enums";

dotenv.config();

export const port = parseInt(process.env.PORT!) as number,
  environment = process.env.ENVIRONMENT! as EnvironmentEnum,
  hostUrl = process.env.HOST_URL as string,
  frontEndUrl = process.env.FRONT_END_URL as string,
  dbUrl = process.env.MONGO_URL,
  /** Pagination */
  pgMinLimit = 10,
  pgMaxLimit = 100,
  defaultOffset = 1,
  defaultLimit = 10,
  defaultPage = 1,
  // JWT access expires in
  jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET!,
  jwtAccessTokenExpiryTime = process.env.JWT_ACCESS_TOKEN_EXPIRY_IN!,
  jwtRefreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET!,
  jwtRefreshTokenExpiryTime = process.env.JWT_REFRESH_EXPIRES_IN!,
  /****crypto secret  */
  cryptoSecret = process.env.CRYPTO_SECRET!,
  initializationVector = process.env.INITIALIZATION_VECTOR,
  /**** smtp */
  smtpUser = process.env.SMTP_USER,
  smtpPassword = process.env.SMTP_PASS,
  smtpService = process.env.SMTP_SERVICE,
  smtpPort = process.env.SMTP_PORT,
  smtpSender = process.env.SMTP_SENDER,
  /** Order */
  defaultOrder = "createdAt",
  defaultSort = SortEnum.desc,
  frontendHostBaseUrl = process.env.FRONTEND_HOST_BASE_URL! as string;

export * from "./instance";
//export * from "./loggers";

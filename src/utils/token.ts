import jsonWebToken from "jsonwebtoken";
import {
  jwtAccessTokenExpiryTime,
  jwtAccessSecret,
  jwtRefreshSecret,
  jwtRefreshTokenExpiryTime,
} from "../config";
import { TokenExpiredError } from "jsonwebtoken";
class Token {
  private static instance: Token;

  private constructor() {}

  static get(): Token {
    if (!Token.instance) {
      Token.instance = new Token();
    }
    return Token.instance;
  }
  createAccessToken(payload: any) {
    return jsonWebToken.sign(payload, jwtAccessSecret, {
      expiresIn: jwtAccessTokenExpiryTime,
    });
  }

  verifyAccessToken(token: string): any {
    try {
      const decoded = jsonWebToken.verify(token, jwtAccessSecret);
      return decoded;
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new Error("Access token has expired.");
      } else {
        throw new Error("Access token verification failed:");
      }
    }
  }

  createRefreshToken(payload: any) {
    return jsonWebToken.sign(payload, jwtRefreshSecret, {
      expiresIn: jwtRefreshTokenExpiryTime,
    });
  }

  verifyRefreshToken(token: any) {
    try {
      const decoded = jsonWebToken.verify(token, jwtRefreshSecret);
      return decoded;
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new Error("Refresh token has expired.");
      } else {
        throw error("Refresh token verification failed:", error.message);
      }
    }
  }
}

const token = Token.get();

export { token as Token };

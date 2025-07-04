import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload{
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
    request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }
    //ele tem 2 pedaços bearer e o próprio token que a gente quer.
    const [type, token] = authHeader.split(' ');
    try{
      //método verifiy do jwt.
      const decodeToken = verify(token, authConfig.jwt.secret);
      const { sub } = decodeToken as ITokenPayload;
      request.user = { id: sub, } 
      return next();
    }catch{
      throw new AppError('Invalid JWT Token.');
    }

}

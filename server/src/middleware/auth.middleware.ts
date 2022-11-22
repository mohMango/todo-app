import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw "not authorized";
    }
    const data = jwt.verify(token, "very secret key") as JwtPayload;
    //@ts-ignore
    req.id = data.id;
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).send({ message: "not authorized" });
  }
};

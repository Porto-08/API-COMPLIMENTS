import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).end();
  }

  // separando bearer do token
  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(
      token,
      "070749c38fd5c67924dbb8777a59ecb5"
    ) as Payload;

    req.user_id = sub

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

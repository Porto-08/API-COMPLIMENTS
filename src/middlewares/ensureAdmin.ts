import { getCustomRepository } from "typeorm";
import { Response, Request, NextFunction } from "express";
import { UserRepositories } from "../repositories/UserRepositorie";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  const { user_id } = req;

  const usersRepositories = getCustomRepository(UserRepositories);
  const { admin } = await usersRepositories.findOne(user_id);

  if (admin) {
    return next();
  }

  return res.status(401).json({ error: "User Not Authorized" });
}

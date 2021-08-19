import { Response, Request, NextFunction } from "express";

export function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Verificar se usuario é admin
  const admin = true;

  if (admin) {
    return next();
  }

  return res.status(401).json({ error: "User Not Authorized" });
}

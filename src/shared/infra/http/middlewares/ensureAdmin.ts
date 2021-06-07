import { NextFunction, Request, Response } from "express";

import { UsersRepositoryImpl } from "@modules/accounts/infra/typeorm/repositories/UsersRepositoryImpl";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepositoryImpl();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not Admin", 401);
  }

  return next();
}

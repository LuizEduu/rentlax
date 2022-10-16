import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { UsersRepositoryImpl } from "@modules/accounts/infra/typeorm/repositories/UsersRepositoryImpl";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      String(token),
      "008deb5dc5a86ac66840422d82ef130e"
    ) as IPayload;

    const usersRepository: IUsersRepository =
      container.resolve(UsersRepositoryImpl);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}

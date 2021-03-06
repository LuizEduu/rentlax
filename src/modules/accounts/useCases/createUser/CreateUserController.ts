import { Request, Response } from "express";
import { container } from "tsyringe";

import { User } from "../../infra/typeorm/entities/user";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<User | Error>> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, password, email, driver_license } = request.body;
    const user = await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };

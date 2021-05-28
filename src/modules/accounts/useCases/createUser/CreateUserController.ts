import { Request, Response } from "express";
import { container } from "tsyringe";

import { User } from "../../entities/user";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<User | Error>> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, username, password, email, admin, driver_license } =
      request.body;
    const user = await createUserUseCase.execute({
      name,
      username,
      password,
      email,
      admin,
      driver_license,
    });

    return response.json(user);
  }
}

export { CreateUserController };

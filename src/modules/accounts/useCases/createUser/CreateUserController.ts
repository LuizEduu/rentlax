import { Request, Response } from "express";

import { User } from "../../entities/user";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<User | Error>> {
    const { name, username, password, email, admin, driver_license } =
      request.body;
    const user = await this.createUserUseCase.execute({
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

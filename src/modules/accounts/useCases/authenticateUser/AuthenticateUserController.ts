import { Request, Response } from "express";
import { container } from "tsyringe";

import { IResponse } from "../../interfaces/IResponse";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<IResponse>> {
    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const { email, password } = request.body;

      const { user, token } = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json({ user, token });
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }
}

export { AuthenticateUserController };

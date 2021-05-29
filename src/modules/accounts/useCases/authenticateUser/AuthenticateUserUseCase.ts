import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IResponse } from "../../interfaces/IResponse";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepositoryImpl")
    private usersRepositoryImpl: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepositoryImpl.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail or passsword incorrect");
    }

    const checkCorrectPassword = await compare(password, user.password);

    if (!checkCorrectPassword) {
      throw new AppError("E-mail or password incorrect");
    }

    const token = sign({}, "008deb5dc5a86ac66840422d82ef130e", {
      subject: user.id,
      expiresIn: "1s",
    });

    const tokenResponse = {
      user: {
        name: user.name,
        email,
      },
      token,
    };

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };

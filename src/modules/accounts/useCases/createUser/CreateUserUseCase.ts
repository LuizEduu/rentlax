import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  driver_license: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepositoryImpl")
    private userRepository: IUsersRepository
  ) {}
  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<IResponse | Error> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User Already Exists");
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });

    const serializedUser: IResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      driver_license: user.driver_license,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return serializedUser;
  }
}

export { CreateUserUseCase };

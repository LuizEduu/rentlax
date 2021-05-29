import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
  }: ICreateUserDTO): Promise<User | Error> {
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

    delete user.password;

    return user;
  }
}

export { CreateUserUseCase };

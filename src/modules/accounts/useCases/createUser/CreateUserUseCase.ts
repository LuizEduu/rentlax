import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}
  async execute({
    name,
    username,
    password,
    email,
    admin,
    driver_license,
  }: ICreateUserDTO): Promise<User | Error> {
    const user = await this.userRepository.create({
      name,
      username,
      password,
      email,
      admin,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };

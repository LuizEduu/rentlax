import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/user";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryImpl implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    admin,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      username,
      password,
      email,
      admin,
      driver_license,
    });

    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }
}

export { UsersRepositoryImpl };

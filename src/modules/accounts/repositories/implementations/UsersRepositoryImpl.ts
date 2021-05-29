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
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      password,
      email,
      driver_license,
    });

    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }
}

export { UsersRepositoryImpl };

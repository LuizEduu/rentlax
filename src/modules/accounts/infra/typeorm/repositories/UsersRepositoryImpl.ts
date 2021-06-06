import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "../entities/user";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryImpl implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      id,
      name,
      password,
      email,
      driver_license,
      avatar,
    });

    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }
}

export { UsersRepositoryImpl };

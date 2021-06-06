import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/user";

interface IUsersRepository {
  create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };

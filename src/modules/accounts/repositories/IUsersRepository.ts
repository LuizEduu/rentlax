import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/user";

interface IUsersRepository {
  create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };

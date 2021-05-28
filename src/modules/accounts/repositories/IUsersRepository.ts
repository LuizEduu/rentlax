import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/user";

interface IUsersRepository {
  create({
    name,
    username,
    password,
    email,
    admin,
    driver_license,
  }: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };

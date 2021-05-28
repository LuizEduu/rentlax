import { UsersRepositoryImpl } from "../../repositories/implementations/UsersRepositoryImpl";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export default (): CreateUserController => {
  const usersRepository = new UsersRepositoryImpl();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

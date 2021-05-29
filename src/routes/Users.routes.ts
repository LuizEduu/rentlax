import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const usersRouters = Router();

usersRouters.post("/", async (request, response) =>
  createUserController.handle(request, response)
);

export { usersRouters };

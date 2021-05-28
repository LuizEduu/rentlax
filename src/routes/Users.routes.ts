import { Router } from "express";

import createUserController from "../modules/accounts/useCases/createUser";

const usersRouter = Router();

usersRouter.post("/", async (request, response) =>
  createUserController().handle(request, response)
);

export { usersRouter };

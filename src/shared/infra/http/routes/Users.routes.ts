import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateUserAvatarController();

const usersRouters = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRouters.post("/", async (request, response) =>
  createUserController.handle(request, response)
);

usersRouters.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarUserController.handle
);

export { usersRouters };

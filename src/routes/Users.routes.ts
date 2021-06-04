import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../config/upload";

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

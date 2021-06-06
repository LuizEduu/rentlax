import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

import { UsersRepositoryImpl } from "../../infra/typeorm/repositories/UsersRepositoryImpl";

interface IRequest {
  avatar: string;
  id: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepositoryImpl")
    private usersRepositoryImpl: UsersRepositoryImpl
  ) {}
  async execute({ avatar, id }: IRequest): Promise<void> {
    const user = await this.usersRepositoryImpl.findById(id);

    if (!user) {
      throw new AppError("User does not exists");
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar;

    await this.usersRepositoryImpl.create(user);
  }
}

export { UpdateUserAvatarUseCase };

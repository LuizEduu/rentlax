import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { UsersRepositoryImpl } from "../../repositories/implementations/UsersRepositoryImpl";

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
      console.log("opaa");
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar;

    await this.usersRepositoryImpl.create(user);
  }
}

export { UpdateUserAvatarUseCase };
import { container } from "tsyringe";

import { UsersRepositoryImpl } from "../../modules/accounts/repositories/implementations/UsersRepositoryImpl";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepositoryImpl } from "../../modules/cars/repositories/implementations/CategoriesRepositoryImpl";
import { SpecificationsRepositoryImpl } from "../../modules/cars/repositories/implementations/SpecificationsRepositoryImpl";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepositoryImpl",
  CategoriesRepositoryImpl
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepositoryImpl",
  SpecificationsRepositoryImpl
);

container.registerSingleton<IUsersRepository>(
  "UsersRepositoryImpl",
  UsersRepositoryImpl
);

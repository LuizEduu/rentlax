import { container } from "tsyringe";

import { UsersRepositoryImpl } from "@modules/accounts/infra/typeorm/repositories/UsersRepositoryImpl";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsRepositoryImpl } from "@modules/cars/infra/typeorm/repositories/CarsRepositoryImpl";
import { CategoriesRepositoryImpl } from "@modules/cars/infra/typeorm/repositories/CategoriesRepositoryImpl";
import { SpecificationsRepositoryImpl } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepositoryImpl";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

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

container.registerSingleton<ICarsRepository>(
  "CarsRepositoryImpl",
  CarsRepositoryImpl
);

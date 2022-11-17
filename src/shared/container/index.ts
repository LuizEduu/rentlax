import { container } from "tsyringe";

import { UsersRepositoryImpl } from "@modules/accounts/infra/typeorm/repositories/UsersRepositoryImpl";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepositoryImpl";
import { CarsRepositoryImpl } from "@modules/cars/infra/typeorm/repositories/CarsRepositoryImpl";
import { CategoriesRepositoryImpl } from "@modules/cars/infra/typeorm/repositories/CategoriesRepositoryImpl";
import { SpecificationsRepositoryImpl } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepositoryImpl";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepositoryImpl";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./providers/DateProvider/implementations/DayJsDateProvider";

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

container.registerSingleton<ICarsImagesRepository>(
  "carsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "rentalsRepository",
  RentalsRepository
);

container.registerSingleton<IDateProvider>("dateProvider", DayJsDateProvider);

import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepositoryImpl } from "../../modules/cars/repositories/implementations/CategoriesRepositoryImpl";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepositoryImpl",
  CategoriesRepositoryImpl
);

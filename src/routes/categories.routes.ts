import { Router } from "express";

import { CategoriesRepositoryImpl } from "../modules/cars/repositories/Category/CategoriesRepositoryImpl";
import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { CreateCategoryUseCase } from "../modules/cars/useCases/CreateCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepositoryImpl();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };

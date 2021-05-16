import { Router } from "express";

import { CategoriesRepositoryImpl } from "../modules/cars/repositories/Category/CategoriesRepositoryImpl";
import { CreateCategoryService } from "../modules/cars/services/Category/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepositoryImpl();

categoriesRoutes.post("/", (request, response) => {
  const createCategoryService = new CreateCategoryService(categoryRepository);
  const { name, description } = request.body;

  const category = createCategoryService.execute({ name, description });
  return response.status(201).json(category);
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };

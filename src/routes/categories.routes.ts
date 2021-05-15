import { Router } from "express";

import { CategoriesRepository } from "../repositories/Category/CategoriesRepository";
import { CreateCategoryService } from "../services/Category/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepository();
const createCategoryService = new CreateCategoryService(categoryRepository);

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const category = createCategoryService.execute({ name, description });
  return response.status(201).json(category);
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };

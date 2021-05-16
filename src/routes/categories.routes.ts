import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) =>
  createCategoryController.handle(request, response)
);
categoriesRoutes.get("/", (request, response) =>
  listCategoriesController.handle(request, response)
);

export { categoriesRoutes };

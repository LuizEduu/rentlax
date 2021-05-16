import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";

const categoriesRoutes = Router();

categoriesRoutes.post("/", createCategoryController.handle);

export { categoriesRoutes };

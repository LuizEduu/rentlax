import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";
import importCategoriesController from "../modules/cars/useCases/ImportCategory";
import listCategoriesController from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", async (request, response) =>
  listCategoriesController().handle(request, response)
);

categoriesRoutes.patch(
  "/import",
  upload.single("file"),
  async (request, response) => {
    await importCategoriesController().handle(request, response);
  }
);

export { categoriesRoutes };

import { CategoriesRepositoryImpl } from "../../repositories/implementations/CategoriesRepositoryImpl";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepositoryImpl.getInstance();
const importCategoriesUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoriesController = new ImportCategoryController(
  importCategoriesUseCase
);

export { importCategoriesController };

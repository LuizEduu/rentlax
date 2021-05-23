import { CategoriesRepositoryImpl } from "../../repositories/implementations/CategoriesRepositoryImpl";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepositoryImpl();
  const importCategoriesUseCase = new ImportCategoryUseCase(
    categoriesRepository
  );
  const importCategoriesController = new ImportCategoryController(
    importCategoriesUseCase
  );

  return importCategoriesController;
};

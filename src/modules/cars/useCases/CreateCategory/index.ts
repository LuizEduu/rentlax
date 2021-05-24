import { CategoriesRepositoryImpl } from "../../repositories/implementations/CategoriesRepositoryImpl";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// o código em volta da função permite que o arquivo só seja chamado
// quando o metodo post for chamado na rota, e não antes da conexão com o bd subir
export default (): CreateCategoryController => {
  const categoryRepository = new CategoriesRepositoryImpl();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};

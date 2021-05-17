import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
}

export { ImportCategoryUseCase };

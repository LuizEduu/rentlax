import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

const categoryRepository = new CategoriesRepository();

class CreateCategoryService {
  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already Exists");
    }

    const category = categoryRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryService };

import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/Category/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already Exists");
    }

    const category = this.categoryRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryService };
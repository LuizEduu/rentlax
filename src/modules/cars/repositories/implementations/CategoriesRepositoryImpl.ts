import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryImpl implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepositoryImpl;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepositoryImpl {
    if (!CategoriesRepositoryImpl.INSTANCE) {
      CategoriesRepositoryImpl.INSTANCE = new CategoriesRepositoryImpl();
    }

    return CategoriesRepositoryImpl.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepositoryImpl };

import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepositoryImpl implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    return this.repository.save(category);
  }

  list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }

  findById(id: string): Promise<Category> {
    return this.repository.findOne(id);
  }
}

export { CategoriesRepositoryImpl };

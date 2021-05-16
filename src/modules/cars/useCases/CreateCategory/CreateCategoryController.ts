import { Request, Response } from "express";

import { Category } from "../../model/Category";
import { CategoriesRepositoryImpl } from "../../repositories/Category/CategoriesRepositoryImpl";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepository = new CategoriesRepositoryImpl();

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response<Category | Error> {
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
    const { name, description } = request.body;

    const category = createCategoryUseCase.execute({ name, description });
    return response.status(201).json(category);
  }
}

export { CreateCategoryController };

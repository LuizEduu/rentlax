import { Request, Response } from "express";

import { Category } from "../../model/Category";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response<Category | Error> {
    const { name, description } = request.body;

    const category = this.createCategoryUseCase.execute({ name, description });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };

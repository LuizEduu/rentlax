import { Request, Response } from "express";

import { Category } from "../../entities/Category";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category | Error>> {
    const { name, description } = request.body;

    const category = await this.createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };

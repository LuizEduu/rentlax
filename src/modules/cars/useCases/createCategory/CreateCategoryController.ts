import { Request, Response } from "express";
import { container } from "tsyringe";

import { Category } from "../../infra/typeorm/entities/Category";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category | Error>> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };

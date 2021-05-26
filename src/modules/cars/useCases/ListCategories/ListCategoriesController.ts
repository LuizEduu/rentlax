import { Request, Response } from "express";
import { container } from "tsyringe";

import { Category } from "../../entities/Category";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category[]>> {
    const listCAtegoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categories = await listCAtegoriesUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };

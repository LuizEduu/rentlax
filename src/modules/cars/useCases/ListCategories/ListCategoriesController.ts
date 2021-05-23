import { Request, Response } from "express";

import { Category } from "../../entities/Category";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category[]>> {
    const categories = await this.listCategoriesUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };

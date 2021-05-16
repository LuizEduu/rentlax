import { Request, Response } from "express";

import { Category } from "../../model/Category";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response<Category[]> {
    const categories = this.listCategoriesUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };

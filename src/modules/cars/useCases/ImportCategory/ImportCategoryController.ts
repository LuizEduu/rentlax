import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const updatedFile = await this.importCategoryUseCase.execute(file);

    return response.json(updatedFile);
  }
}

export { ImportCategoryController };

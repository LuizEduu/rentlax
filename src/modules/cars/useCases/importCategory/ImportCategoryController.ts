import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

      const updatedFile = await importCategoryUseCase.execute(file);

      return response.status(201).json(updatedFile);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}

export { ImportCategoryController };

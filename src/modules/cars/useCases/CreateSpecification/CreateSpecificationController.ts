import { Request, Response } from "express";
import { container } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Specification | Error>> {
    try {
      const { name, description } = request.body;

      const specificationUseCase = container.resolve(
        CreateSpecificationUseCase
      );

      const specification = await specificationUseCase.execute({
        name,
        description,
      });

      return response.json(specification);
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }
}

export { CreateSpecificationController };

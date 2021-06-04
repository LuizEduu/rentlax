import { Request, Response } from "express";
import { container } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Specification | Error>> {
    const { name, description } = request.body;

    const specificationUseCase = container.resolve(CreateSpecificationUseCase);

    const specification = await specificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}

export { CreateSpecificationController };

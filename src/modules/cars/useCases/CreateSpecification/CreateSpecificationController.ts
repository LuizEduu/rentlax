import { Request, Response } from "express";

import { Specification } from "../../model/Specification";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private specificationUseCase: CreateSpecificationUseCase) {}
  handle(
    request: Request,
    response: Response
  ): Response<Specification | Error> {
    const { name, description } = request.body;
    const specification = this.specificationUseCase.execute({
      name,
      description,
    });

    return response.json(specification);
  }
}

export { CreateSpecificationController };

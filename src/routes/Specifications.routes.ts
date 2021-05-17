import { Router } from "express";

import { SpecificationsRepositoryImpl } from "../modules/cars/repositories/implementations/SpecificationsRepositoryImpl";
import { CreateSpecificationService } from "../modules/cars/services/Specifiaction/CreateSpecificationService";

const specificationRouter = Router();
const specificationsRepository = new SpecificationsRepositoryImpl();

specificationRouter.post("/", (request, response) => {
  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );
  const { name, description } = request.body;

  const specification = createSpecificationService.execute({
    name,
    description,
  });

  return response.status(201).json(specification);
});

export { specificationRouter };

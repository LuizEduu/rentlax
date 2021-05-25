import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", createSpecificationController.handle);

export { specificationRouter };

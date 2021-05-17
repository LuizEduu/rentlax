import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationRouter } from "./Specifications.routes";

const router = Router();

/* Seta o path inicial como categories */
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);

export { router };

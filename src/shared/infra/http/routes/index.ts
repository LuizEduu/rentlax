import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRouter } from "./Cars.routes";
import { categoriesRoutes } from "./Categories.routes";
import { specificationRouter } from "./Specifications.routes";
import { usersRouters } from "./Users.routes";

const router = Router();

/* Seta o path inicial das rotas */
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", usersRouters);
router.use(authenticateRoutes);
router.use("/cars/", carsRouter);

export { router };

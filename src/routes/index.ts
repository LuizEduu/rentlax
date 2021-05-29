import { Router } from "express";

import { categoriesRoutes } from "./Categories.routes";
import { specificationRouter } from "./Specifications.routes";
import { usersRouters } from "./Users.routes";

const router = Router();

/* Seta o path inicial das rotas */
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", usersRouters);

export { router };

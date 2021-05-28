import { Router } from "express";

import { categoriesRoutes } from "./Categories.routes";
import { specificationRouter } from "./Specifications.routes";
import { usersRouter } from "./Users.routes";

const router = Router();

/* Seta o path inicial das rotas */
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", usersRouter);

export { router };

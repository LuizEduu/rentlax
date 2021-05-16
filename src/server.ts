import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRouter } from "./routes/Specifications.routes";

const app = express();
app.use(express.json());
/* Seta o path inicial como categories */
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRouter);

app.listen(3333, () => console.log("server is running"));

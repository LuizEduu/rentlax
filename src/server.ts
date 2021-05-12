import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());
/* Seta o path inicial como categories */
app.use("/categories", categoriesRoutes);

app.listen(3333, () => console.log("server is running"));

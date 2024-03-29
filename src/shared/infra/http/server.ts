import "reflect-metadata";
import cors from "cors";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerConfig from "../../../swagger.json";
import "../../container";
import createConnection from "../typeorm";
import errorMiddleware from "./middlewares/Error";
import { router } from "./routes";

createConnection("database_postgres");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(router);
app.use(errorMiddleware);

app.listen(3333, () => console.log("server is running in 3333"));

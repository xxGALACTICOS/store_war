import express from "express";
import type { Application } from "express";
import cors from "cors";

import { config } from "./config/config.ts";
import { connectDB } from "./database/mongo/index.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";
import authRouter from "./routes/auth.routes.ts";

/*
 * CUSTOM IMPORTS
 */

const app: Application = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/v1/auth", authRouter)


app.listen(config.port, '0.0.0.0', async () => {
  await connectDB();
  console.log("Connected to MongoDB");
  console.log(`Server is running on port ${config.port}`);
});

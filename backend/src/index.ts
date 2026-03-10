import express from "express";
import type { Application } from "express";
import cors from "cors";

import { config } from "./config/config.ts";
/*
 * CUSTOM IMPORTS
 */

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

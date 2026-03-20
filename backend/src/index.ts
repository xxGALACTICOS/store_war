import express from "express";
import type { Application, Response } from "express";
import cors from "cors";
import path from "path";

import { config } from "./config/config.ts";
import { connectDB } from "./database/mongo/index.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";
import authRouter from "./routes/auth.routes.ts";
import productRouter from "./routes/product.routes.ts";
import orderRouter from "./routes/order.routes.ts";
import { connectRedis } from "./config/redis.ts";
import { sseMiddleware } from "./middlewares/sse.middleware.ts";

/*
 * CUSTOM IMPORTS
 */


export const clients: Response[] = [];
const app: Application = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(sseMiddleware)

// monitoring
app.get("/health", (_, res) => {
  res.send("OK");
});

app.get("/monitor", (_, res: Response) => {
  res.sendFile(path.join(__dirname, "./monitor/index.html"));
});

app.get("/events", (req, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  clients.push(res);

  req.on("close", () => {
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

app.listen(config.port, "0.0.0.0", async () => {
  await connectDB();
  await connectRedis();
  console.log("Connected to MongoDB");
  console.log(`Server is running on port ${config.port}`);
});

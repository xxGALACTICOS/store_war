import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongourl: process.env.MONGODB_URL,
};

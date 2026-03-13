import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongourl: process.env.MONGODB_URL,
  mongouri: process.env.MONGODB_URI,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
};

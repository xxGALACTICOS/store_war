import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongourl: process.env.MONGODB_URL,
  mongouri: process.env.MONGODB_URI,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
  jwt_secret: process.env.JWT_SECRET as string,
  redis_password: process.env.REDIS_PASSWORD as string,
  redis_host: process.env.REDIS_HOST as string,
  redis_username: process.env.REDIS_USERNAME as string,
  redis_port: Number(process.env.REDIS_PORT),
};

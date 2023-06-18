import { config as conf } from "dotenv";
conf();

const config = {
  server: {
    port: process.env.PORT || 8080,
  },
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
};

export default config;

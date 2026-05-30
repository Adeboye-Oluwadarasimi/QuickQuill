import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(15, "20 s"), //ratelimit to 15 req per 20 seconds
  analytics: true,
});

export default ratelimit;

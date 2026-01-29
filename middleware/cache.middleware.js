import { getCache } from "../config/cache.js";

const cacheMiddleware = (keyBuilder) => {
  return (req, res, next) => {
    const key = keyBuilder(req);

    const cachedData = getCache(key);
    if (cachedData) {
      return res.status(200).json({
        source: "memory-cache",
        data: cachedData
      });
    }

    req.cacheKey = key;
    next();
  };
};

export default cacheMiddleware;

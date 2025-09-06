import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not defined in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  const mongooseCache: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = (globalForMongoose.mongooseCache ??= {
  conn: null,
  promise: null,
});

export async function connectToDB() {
  console.log("🔗 Connecting to MongoDB...");
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "ais_solutions",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      }).catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        return Promise.reject(err);
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

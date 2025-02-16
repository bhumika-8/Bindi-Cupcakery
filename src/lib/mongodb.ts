import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// ✅ Extend the global type
declare global {
  var mongooseCache: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

// ✅ Use `global.mongooseCache` OR initialize it
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };
let cached = global.mongooseCache;

async function connectDB() {
  if (cached.conn) {
    return cached.conn; // ✅ Now TypeScript understands this
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    // ✅ Assign the correct promise type
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

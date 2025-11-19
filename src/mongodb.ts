import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any)._mongoose;
if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error("Missing MONGODB_URI");
    }
    cached.promise = mongoose.connect(MONGODB_URI).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// src/app/lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Under utveckling: tillåt build att gå igenom utan DB
    if (process.env.NODE_ENV !== 'production') {
      // Dummy-DB-objekt om någon råkar kalla getDb() lokalt utan URI
      return {
        collection: () => ({
          findOne: async () => null,
          insertOne: async () => ({ insertedId: 'dummy' }),
          updateOne: async () => ({ matchedCount: 0, modifiedCount: 0 }),
        }),
      } as unknown as Db;
    }
    // I produktion: var tydlig
    throw new Error('MONGODB_URI is missing');
  }

  if (!client) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  await clientPromise!;
  return client.db(process.env.MONGODB_DB || undefined);
}

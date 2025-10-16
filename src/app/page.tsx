import { connectToDatabase } from "./lib/mongodb";

export default async function Home() {
  await connectToDatabase();
  console.log("Connected to MongoDB from Home component");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-800">
        Hej från MongoDB!
      </h1>
    </main>
  );
}

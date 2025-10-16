import { connectToDatabase } from "./lib/mongodb";

export default async function Home() {
  await connectToDatabase();
  console.log("Connected to MongoDB from Home component");

  return (
    <main>
      <h1>Hej från MongoDB!</h1>
    </main>
  );
}

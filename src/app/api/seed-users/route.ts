import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  const users = [
    { username: "Annie", email: "Annie.Olofsson@medieinstitutet.se" },
    { username: "Irina", email: "Irina.Alam@medieinstitutet.se" },  { username: 'Madiha', email: 'Madiha.Shabbir@medieinstitutet.se' },
  { username: 'Michael', email: 'Michael.Stojanovic@medieinstitutet.se' },
  { username: 'Mija', email: 'Mija.HedborgMellander@medieinstitutet.se' },
  { username: 'Nova', email: 'Nova.Zandkarimi@medieinstitutet.se' },
  ];

  const password = "SammaLösen123";

  try {
    const client = await clientPromise;
    const db = client.db();

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await db.collection("users").insertOne({
        username: user.username,
        email: user.email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ message: "Users seeded!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

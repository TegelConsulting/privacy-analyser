import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { getDb } from '@/app/lib/mongodb'; // ⬅️ ändrat

// Kör på Node (bcrypt kräver det) och hindra prerender av API-routen
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be no more than 20 characters long')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password is too long'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate user input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { username, email, password } = validationResult.data;

    // ⬇️ ändrat: hämta DB via lazy helper
    const db = await getDb();

    // Check if user already exists
    const existing = await db.collection('users').findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      ],
    });

    if (existing) {
      if (existing.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user
    const result = await db.collection('users').insertOne({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'User registered successfully', userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { bio, roles, User, users } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import { ResponseError, ResponseSuccess } from "@/types/global.types";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const SALT_ROUNDS = 10;

    if (!body.username || !body.password) {
      return NextResponse.json<ResponseError>(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, body.username))
      .execute();

    if (existingUser.length > 0) {
      return NextResponse.json<ResponseError>(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(body.password, SALT_ROUNDS);

    // Create default bio
    const bioData = await db
      .insert(bio)
      .values({
        description: "",
        firstName: "",
        lastName: "",
        backupEmail: "",
        phoneNumber: "",
        address: "",
        createdAt: new Date(),
      })
      .returning();

    // Get default role
    const defaultRole = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "user"))
      .execute();

    if (!defaultRole.length) {
      return NextResponse.json<ResponseError>(
        { success: false, message: "Failed to set up user role" },
        { status: 500 }
      );
    }

    const newUser = await db
      .insert(users)
      .values({
        username: body.username,
        password: hashedPassword,
        bioId: bioData[0].id,
        roleId: defaultRole[0].id,
      })
      .returning();

    return NextResponse.json<ResponseSuccess<User>>({
      success: true,
      message: "User registered successfully",
      data: newUser[0]
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json<ResponseError>(
      {
        success: false,
        message: "Failed to register",
      },
      { status: 500 }
    );
  }
};

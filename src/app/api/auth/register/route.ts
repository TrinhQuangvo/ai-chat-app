import { bio, roles, User, users } from "@/drizzle/schemas";
import { db } from "@/lib/db";
import { ResponseError, ResponseSuccess } from "@/types/global.types";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json<ResponseError>(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser) {
      return NextResponse.json<ResponseError>(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

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
      .where(eq(roles.name, "user"));

    if (!defaultRole) {
      return NextResponse.json<ResponseError>(
        { success: false, message: "Failed to set up user role" },
        { status: 500 }
      );
    }

    const data = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
        bioId: bioData[0].id,
        roleId: defaultRole[0].id,
      })
      .returning();

    return NextResponse.json<ResponseSuccess<User>>({
      success: true,
      message: "User registered successfully",
      data: data[0],
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

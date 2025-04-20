"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginTemplate() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/chat");
    else setError("Login failed");
  };

  return (
    <div className="flex items-center w-full justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg rounded-lg shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold">Login</h1>

          <Input
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <Button variant={"success"} size={"default"} onClick={login}>
              Login
            </Button>
          </div>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 underline">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

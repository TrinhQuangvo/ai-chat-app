"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAlert } from "@/hooks/common/use-alert";
import { useRegister } from "@/hooks/queries/use-register";
import {
  RegisterValidation,
  registerValidation,
} from "@/validations/register.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterTemplate() {
  const router = useRouter();
  const { mutate } = useRegister();
  const { successAlert, errorAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterValidation) => {
    mutate(data, {
      onSuccess: (response) => {
        if (!response.success) {
          errorAlert(response.message);
          return;
        }

        successAlert(response.message);
        router.push("/auth/login");
      },
    });
  };

  return (
    <Card className="w-full max-w-lg rounded-lg shadow-xl">
      <CardContent className="p-6 space-y-4">
        <h1 className="text-xl font-bold">Register Account</h1>

        <Input
          className={cn({ "border-red-500": errors.username })}
          placeholder="Enter Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <Input
          className={cn({ "border-red-500": errors.password })}
          placeholder="Enter Password"
          type="password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="flex justify-center">
          <Button
            variant={"secondary"}
            size={"default"}
            onClick={handleSubmit(onSubmit)}
          >
            Create Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import LoginTemplate from "@/src/components/templates/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const page = () => {
  return <LoginTemplate />;
};

export default page;

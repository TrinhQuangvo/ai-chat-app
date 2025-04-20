import AuthLayout from "@/src/components/layouts/auth";
import React from "react";

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthLayout> 
        {children} 
    </AuthLayout>
  );
};

export default LoginLayout;
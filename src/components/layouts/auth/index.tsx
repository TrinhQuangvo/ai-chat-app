import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center w-full justify-center h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default AuthLayout;

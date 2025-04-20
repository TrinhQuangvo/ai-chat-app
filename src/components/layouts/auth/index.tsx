"use client";

import React from "react";
import QueryProvider from "../../providers/query-provider";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <QueryProvider>
      <div className="flex items-center w-full justify-center h-screen bg-gray-100">
        {children}
      </div>
    </QueryProvider>
  );
};

export default AuthLayout;

import React from "react";

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center justify-center h-screen bg-gray-100">{children}</div>;
};

export default LoginLayout;
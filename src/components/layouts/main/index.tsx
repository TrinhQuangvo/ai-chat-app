import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-amber-200">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <div className="h-16 bg-gray-100">
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500">Footer</p>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

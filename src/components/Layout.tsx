import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-base-200 shadow-lg">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="w-full">
          <Navbar />
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

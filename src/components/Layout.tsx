import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>

      <div className="flex flex-1">
        <aside className="w-80">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

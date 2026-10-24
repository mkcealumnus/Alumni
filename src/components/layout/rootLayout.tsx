import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { DevicePreviewBar } from "./devicePreviewBar";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-[#171717]">
      <DevicePreviewBar />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

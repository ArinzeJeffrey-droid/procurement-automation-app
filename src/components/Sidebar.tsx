import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Sidebar</h2>
      </div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/orders" className="block">
              Orders
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/orders" className="block">
              Create Order
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/orders" className="block">
              Link
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

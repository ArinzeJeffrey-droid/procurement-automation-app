import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const sidebarLinks = [
  {
    name: "Orders",
    href: "/",
  },
  {
    name: "Create Order",
    href: "/order",
  },
];

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 w-64 bg-gray-darker border-r border-gray-lighter text-white transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold"></h2>
      </div>
      <nav>
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.href} className="hover:bg-gray">
              <Link href={link.href} legacyBehavior>
                <a className="block p-4">{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

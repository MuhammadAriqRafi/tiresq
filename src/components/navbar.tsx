"use client";

import Link from "next/link";
import { Home, History, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  icon: React.ReactElement;
  title: string;
};

export default function Navbar() {
  const currentPath = usePathname();
  const blacklistedPath = ["/rating"];

  const navigationItems: NavItem[] = [
    {
      href: "/histories",
      title: "Riwayat",
      icon: <History size={24} strokeWidth={2} absoluteStrokeWidth />,
    },
    {
      href: "/",
      title: "Beranda",
      icon: <Home size={24} strokeWidth={2} absoluteStrokeWidth />,
    },
    {
      href: "/accounts",
      title: "Akun",
      icon: <UserCircle size={24} strokeWidth={2} absoluteStrokeWidth />,
    },
  ];

  return (
    <>
      {!blacklistedPath.includes(`/${currentPath.split("/").at(-1)}`) ? (
        <nav className="fixed bottom-0 left-1/2 block w-full max-w-screen-md -translate-x-1/2 bg-white drop-shadow-[0_-3px_25px_rgba(0,0,0,.15)]">
          <ul className="flex w-full justify-between">
            {navigationItems.map(({ href, icon, title }) => (
              <Link className="flex-grow" key={title} href={href}>
                <li
                  className={`${
                    href === currentPath ? "active" : null
                  } flex flex-col items-center justify-center gap-2 py-3 hover:bg-slate-100`}
                >
                  {icon}
                  <span>{title}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}

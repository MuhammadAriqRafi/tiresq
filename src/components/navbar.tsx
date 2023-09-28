"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";

type NavItem = {
  href: string;
  icon: React.ReactElement;
  title: string;
};

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const currentPath = usePathname();
  const blacklistedPath = ["/experience"];

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
      href: "/account",
      title: "Akun",
      icon: (
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: { width: 24, height: 24 },
              userButtonPopoverCard: { marginLeft: 16, marginTop: -16 },
            },
          }}
        />
      ),
    },
  ];

  return (
    <>
      {!blacklistedPath.includes(`/${currentPath.split("/").at(-1)}`) ? (
        <nav className="fixed bottom-0 left-1/2 z-10 block w-full max-w-screen-md -translate-x-1/2 bg-white drop-shadow-[0_-3px_25px_rgba(0,0,0,.15)]">
          <ul className="flex w-full justify-between">
            {navigationItems.map(({ href, icon, title }) => {
              if (href === "/account" && !isSignedIn) return;

              const navigation = (key: string | undefined) => (
                <li
                  key={key}
                  className={`${
                    href === currentPath ? "active" : null
                  } flex flex-grow flex-col items-center justify-center gap-2 py-3 hover:bg-slate-100`}
                >
                  {icon}
                  <span>{title}</span>
                </li>
              );

              return href !== "/account" ? (
                <Link className="flex-grow" key={title} href={href}>
                  {navigation(undefined)}
                </Link>
              ) : (
                navigation(title)
              );
            })}
          </ul>
        </nav>
      ) : null}
    </>
  );
}

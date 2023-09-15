import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Home, History } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

type NavItem = {
  href?: string;
  icon: React.ReactElement;
  title: string;
};

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const blacklistedRoute = ["/ratings"];
  const navigationItems: NavItem[] = [
    {
      href: "/histories",
      icon: <History size={24} strokeWidth={2} absoluteStrokeWidth />,
      title: "Riwayat",
    },
    {
      href: "/",
      icon: <Home size={24} strokeWidth={2} absoluteStrokeWidth />,
      title: "Beranda",
    },
    {
      icon: (
        <UserButton
          afterSignOutUrl="http://localhost:3000"
          appearance={{
            elements: {
              avatarBox: { width: 24, height: 24 },
              userButtonPopoverCard: {
                marginLeft: 16,
                marginTop: -20,
              },
            },
          }}
        />
      ),
      title: "Akun",
    },
  ];

  return (
    <>
      {!blacklistedRoute.includes(pathname) ? (
        <NavigationMenu className="fixed bottom-0 left-1/2 block w-full max-w-screen-md -translate-x-1/2 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,.75)]">
          <NavigationMenuList className="w-full justify-between">
            {navigationItems.map(({ href, icon, title }: NavItem) => {
              if (title === "Akun" && !user) return;

              return (
                <NavigationMenuItem className="w-full" key={title}>
                  {title === "Akun" ? (
                    <div className={navigationMenuTriggerStyle()}>
                      {icon}
                      <p className="text-label">{title}</p>
                    </div>
                  ) : (
                    <Link href={href!} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={href === pathname}
                        className={navigationMenuTriggerStyle()}
                      >
                        {icon}
                        <p className="text-label">{title}</p>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
    </>
  );
}

"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { Home, History, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavItem = {
	href: string;
	icon: React.ReactElement;
	title: string;
};

export default function navbar() {
	const pathname = usePathname();
	const navbarBlacklist = ["/ratings", "/login"];
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
			href: "/accounts",
			icon: <UserCircle size={24} strokeWidth={2} absoluteStrokeWidth />,
			title: "User",
		},
	];

	return (
		<>
			{!navbarBlacklist.includes(pathname) ? (
				<NavigationMenu className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,.75)]">
					<NavigationMenuList className="w-screen justify-between px-6">
						{navigationItems.map(({ href, icon, title }: NavItem) => (
							<NavigationMenuItem className="w-[30%]" key={title}>
								<Link href={href} legacyBehavior passHref>
									<NavigationMenuLink
										active={href === pathname}
										className={navigationMenuTriggerStyle()}
									>
										{icon}
										{title}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			) : null}
		</>
	);
}

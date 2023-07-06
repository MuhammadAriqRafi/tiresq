"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { Home, History, UserCircle } from "lucide-react";
import Link from "next/link";

type NavItem = {
	href: string;
	icon: React.ReactElement;
	title: string;
	isActive: boolean;
};

export default function navbar() {
	const navigationItems: NavItem[] = [
		{
			href: "/histories",
			icon: <History size={24} strokeWidth={2} absoluteStrokeWidth />,
			title: "Riwayat",
			isActive: false,
		},
		{
			href: "/",
			icon: <Home size={24} strokeWidth={2} absoluteStrokeWidth />,
			title: "Beranda",
			isActive: true,
		},
		{
			href: "/accounts",
			icon: <UserCircle size={24} strokeWidth={2} absoluteStrokeWidth />,
			title: "User",
			isActive: false,
		},
	];

	return (
		<NavigationMenu className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,.75)]">
			<NavigationMenuList className="w-screen justify-between px-6">
				{navigationItems.map(({ href, icon, title, isActive }: NavItem) => (
					<NavigationMenuItem className="w-[30%]">
						<Link href={href} legacyBehavior passHref>
							<NavigationMenuLink
								active={isActive}
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
	);
}

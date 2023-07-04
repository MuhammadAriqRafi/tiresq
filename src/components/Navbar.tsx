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

export default function navbar() {
	return (
		<NavigationMenu className="fixed bottom-0 left-1/2 w-full max-w-[375px] -translate-x-1/2 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
			<NavigationMenuList className="w-[375px] max-w-[375px] justify-evenly">
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<Home size={16} />
							Beranda
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/histories" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<History size={16} />
							Riwayat
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/accounts" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<UserCircle size={16} />
							Akun
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

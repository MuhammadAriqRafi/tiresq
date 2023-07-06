"use client";

import "./globals.css";
import Navbar from "@components/navbar";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "TiresQ",
	description: "Having flat tire? TiresQ to the rescue.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const navbarBlacklist = ["/ratings", "/login"];

	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				{!navbarBlacklist.includes(pathname) ? <Navbar /> : null}
			</body>
		</html>
	);
}

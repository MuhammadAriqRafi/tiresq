"use client";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Star, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Ratings() {
	const router = useRouter();
	const headerHeight = "h-[calc(100vh-124px)]";

	return (
		<>
			<header className="mb-14 flex items-center gap-4 p-6 pb-0">
				<X className="cursor-pointer" onClick={router.back} />
				<div className="flex flex-col gap-1">
					<h1 className="text-subheading">Tambal ban john</h1>
					<p className="text-label">Sabtu, 8 Apr 2023, 15:00</p>
				</div>
			</header>

			<main className={`flex ${headerHeight} flex-col items-stretch px-6`}>
				<section className="mb-8 flex flex-col items-center gap-6 border-b-2 border-b-gray-200 pb-8">
					<h2 className="text-subheading">Bagaimana pelayanannya?</h2>
					<div className="flex cursor-pointer justify-between gap-3">
						{[...Array(5).fill(1)].map(() => (
							<Star size={24} />
						))}
					</div>
					<span className="text-subheading">Memuaskan</span>
				</section>

				<section className="flex flex-col items-center gap-5">
					<h2 className="text-subheading">Bagaimana pelayanannya?</h2>
					<Textarea placeholder="Masukkan kamu..." />
					<div className="flex w-full justify-between">
						<p className="text-label">1/1000</p>
						<div className="flex items-center gap-2">
							<Checkbox id="terms" />
							<Label
								htmlFor="terms"
								className="text-xs cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Sembunyikan nama
							</Label>
						</div>
					</div>
				</section>

				<Button className="mb-10 mt-auto">Kirim</Button>
			</main>
		</>
	);
}

import { Badge } from "@components/ui/badge";
import Rating from "./rating";
import Image from "next/image";

type Props = {
	status: "Selesai" | "Batal" | "Dalam Proses";
	ratingStatus: "unrated" | "rated-unreviewed" | "rated-reviewed" | "expired";
};

export default function HistoryItem({ status, ratingStatus }: Props) {
	return (
		<article className="mb-4 bg-white px-6 py-3 shadow-md">
			<div className="mb-4 flex gap-4 border-b-2 border-b-gray-200 pb-4">
				<div className="relative h-16 w-16">
					<Image
						src="/assets/default.svg"
						alt="Foto Gerai Tambal Ban"
						style={{ objectFit: "cover" }}
						sizes="80px"
						fill
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<h2 className="font-semibold">Tambal ban john</h2>
					<p className="text-xs">8 Apr, 20:10</p>
				</div>
				<span className="ml-auto">
					<Badge variant="secondary">{status}</Badge>
				</span>
			</div>

			<Rating status={ratingStatus} />
		</article>
	);
}

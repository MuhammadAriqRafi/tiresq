import { ChevronRight, Star } from "lucide-react";

type Props = {
	status: "unrated" | "rated-unreviewed" | "rated-reviewed" | "expired";
};

export default function Rating({ status }: Props) {
	return (
		<div className="flex items-center justify-between rounded border-2 border-gray-200 p-4">
			{status === "unrated" ? (
				<>
					<p className="text-sm font-semibold">Berikan rating</p>
					<div className="flex justify-between gap-3">
						{[...Array(5).fill(1)].map(() => (
							<Star size={16} />
						))}
					</div>
				</>
			) : (
				<>
					<div className="mr-6 flex items-center gap-1 border-r border-r-gray-200 py-1 pr-4">
						<p className="text-sm font-semibold">5</p>
						<Star size={16} />
					</div>
					<div className="mr-auto flex flex-col gap-y-1">
						{status !== "expired" ? (
							<>
								<h2 className="text-sm font-semibold">
									{status === "rated-unreviewed"
										? "Belum ada ulasan"
										: status === "rated-reviewed"
										? "Ulasanmu"
										: null}
								</h2>
								<p className="text-xs">
									{status === "rated-unreviewed"
										? "Bagaimana pelayanan tambal bannya?"
										: status === "rated-reviewed"
										? "Bagusss bangettt, abangnya ramah..."
										: null}
								</p>
							</>
						) : (
							<p className="text-sm font-semibold text-gray-300">
								Periode kasih ulasan sudah berakhir
							</p>
						)}
					</div>
					{status !== "expired" ? <ChevronRight size={20} /> : null}
				</>
			)}
		</div>
	);
}

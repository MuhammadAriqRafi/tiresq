import HistoryItem from "./history-item";

export default function HistoryList() {
	return (
		<div className="bg-gray-50 pb-14 pt-[132px]">
			<HistoryItem status="Selesai" ratingStatus="unrated" />
			<HistoryItem status="Selesai" ratingStatus="rated-unreviewed" />
			<HistoryItem status="Selesai" ratingStatus="rated-reviewed" />
			<HistoryItem status="Selesai" ratingStatus="expired" />
		</div>
	);
}

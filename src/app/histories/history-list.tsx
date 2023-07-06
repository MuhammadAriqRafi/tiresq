import HistoryItem from "./history-item";

export default function HistoryList() {
	return (
		<div className="bg-gray-50 pb-14 pt-[132px]">
			<HistoryItem key={1} status="Selesai" ratingStatus="unrated" />
			<HistoryItem key={2} status="Selesai" ratingStatus="rated-unreviewed" />
			<HistoryItem key={3} status="Selesai" ratingStatus="rated-reviewed" />
			<HistoryItem key={4} status="Selesai" ratingStatus="expired" />
		</div>
	);
}

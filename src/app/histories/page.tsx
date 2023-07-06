import FilterList from "./filter-list";
import HistoryList from "./history-list";

export default function Histories() {
	return (
		<>
			<header className="fixed z-10 w-full bg-white p-6 pb-3 shadow">
				<h1 className="mb-6 text-heading">Riwayat</h1>
				<FilterList />
			</header>
			<main>
				<HistoryList />
			</main>
		</>
	);
}

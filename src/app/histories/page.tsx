import FilterList from "./filter-list";
import HistoryList from "./history-list";

export default function Riwayat() {
	return (
		<>
			<header className="fixed z-10 w-full bg-white p-6 pb-3 shadow">
				<h1 className="mb-6 w-fit text-2xl font-bold">Riwayat</h1>
				<FilterList />
			</header>
			<main>
				<HistoryList />
			</main>
		</>
	);
}

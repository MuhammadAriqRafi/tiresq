import { ChevronDown } from "lucide-react";
import FilterItem from "./filter-item";

export default function FilterList() {
	return (
		<div className="flex gap-4">
			<FilterItem title="Status" endIcon={<ChevronDown size={18} />} />
		</div>
	);
}

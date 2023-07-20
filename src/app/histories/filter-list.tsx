"use client";

import FilterItem from "./filter-item";
import { ChevronDown } from "lucide-react";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Button } from "@components/ui/button";
import { useState } from "react";

export default function FilterList() {
	const [status, setStatus] = useState<undefined | string>();

	const handleReset = () => setStatus(undefined);

	return (
		<div className="flex gap-4">
			<FilterItem
				title="Status"
				endIcon={<ChevronDown size={18} />}
				sheet={{
					title: "Status Riwayat",
					content: (
						<RadioGroup
							value={status}
							onValueChange={value => setStatus(value)}
						>
							<Label
								className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
								htmlFor="selesai"
							>
								<p className="text-subheading font-medium">Selesai</p>
								<RadioGroupItem value="selesai" id="selesai" />
							</Label>
							<Label
								className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
								htmlFor="batal"
							>
								<p className="text-subheading font-medium">Batal</p>
								<RadioGroupItem value="batal" id="batal" />
							</Label>
						</RadioGroup>
					),
					footer: (
						<div className="flex justify-between gap-4">
							<Button
								variant="outline"
								className="w-1/2"
								type="submit"
								onClick={handleReset}
							>
								Reset
							</Button>
							<Button className="w-1/2" type="submit">
								Terapkan
							</Button>
						</div>
					),
				}}
			/>
		</div>
	);
}

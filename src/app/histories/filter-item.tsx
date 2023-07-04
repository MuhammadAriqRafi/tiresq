import { Button } from "@components/ui/button";

type Props = {
	title: string;
	endIcon?: React.ReactElement;
	startIcon?: React.ReactElement;
};

export default function FilterItem({ title, startIcon, endIcon }: Props) {
	return (
		<Button
			size="sm"
			variant="outline"
			className="flex justify-between gap-1 font-semibold"
		>
			{startIcon}
			{title}
			{endIcon}
		</Button>
	);
}

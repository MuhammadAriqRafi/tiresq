import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@components/ui/sheet";

type Props = {
	title: string;
	endIcon?: React.ReactElement;
	startIcon?: React.ReactElement;
	sheet?: {
		title: string;
		content?: React.ReactElement;
		footer?: React.ReactElement;
	};
};

export default function FilterItem({
	title,
	startIcon,
	endIcon,
	sheet,
}: Props) {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						size="sm"
						variant="outline"
						className="flex justify-between gap-1 font-semibold"
					>
						{startIcon}
						{title}
						{endIcon}
					</Button>
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-6" side="bottom">
					<SheetHeader>
						<SheetTitle className="text-start text-xl font-bold">
							{sheet?.title}
						</SheetTitle>
					</SheetHeader>
					{sheet?.content}
					<SheetFooter>{sheet?.footer}</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}

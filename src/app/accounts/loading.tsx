import { Loader2 } from "lucide-react";

export default function loading() {
	return (
		<div className="flex h-screen w-screen justify-center items-center">
			<Loader2 className="animate-spin" size={64} color="#ECE7E4" />
		</div>
	);
}

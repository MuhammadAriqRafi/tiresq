import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";

export default function Login() {
	return (
		<main className="mt-32 flex h-screen w-screen flex-col items-center gap-6 px-6">
			<h1 className="text-2xl font-bold">TiresQ</h1>
			<section className="w-full">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" className="mb-6 mt-2" />
				<Button size="lg" className="w-full">
					Masuk
				</Button>
			</section>

			<section className="flex w-full items-center justify-between">
				<Separator className="w-1/4" />
				<p className="text-xs text-gray-400">atau masuk dengan</p>
				<Separator className="w-1/4" />
			</section>

			<Button size="lg" variant="outline" className="w-full">
				Google
			</Button>
		</main>
	);
}

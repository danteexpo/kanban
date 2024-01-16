import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Login() {
	return (
		<div className="grid place-items-center">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Login</CardTitle>
					<CardDescription className="text-xl">
						To start managing tasks and workflows.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button className="w-full text-xl">Sign in with Google</Button>
				</CardContent>
			</Card>
		</div>
	);
}

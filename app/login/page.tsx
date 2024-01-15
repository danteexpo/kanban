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
					<CardTitle>Login</CardTitle>
					<CardDescription>
						To start managing tasks and workflows.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button className="w-full">Sign in with Google</Button>
				</CardContent>
			</Card>
		</div>
	);
}

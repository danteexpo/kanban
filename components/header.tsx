"use client";

import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const Header = () => {
	const { user, signOut } = useClerk();
	const router = useRouter();

	return (
		<header className="flex items-center justify-between py-6">
			<h1 className="text-3xl font-bold">Kanban</h1>
			<div className="flex gap-2 items-center">
				<ModeToggle />
				{user && (
					<Button
						variant="outline"
						onClick={() => signOut(() => router.push("/sign-in"))}
					>
						Sign out
					</Button>
				)}
			</div>
		</header>
	);
};

export default Header;

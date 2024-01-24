import React from "react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
	return (
		<header className="flex items-center justify-between py-6">
			<h1 className="text-3xl font-bold">Kanban</h1>
			<div className="flex gap-2 items-center">
				<ModeToggle />
			</div>
		</header>
	);
};

export default Header;

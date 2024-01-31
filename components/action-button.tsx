"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type ActionButtonProps = {
	type: "submit" | "button";
	icon: "delete" | "edit" | "confirm";
	onClick?: () => void;
	isDisabled?: boolean;
	isBig?: boolean;
	changesOpacity?: boolean;
};

const ActionButton = ({
	type,
	icon,
	onClick,
	isDisabled,
	isBig,
	changesOpacity,
}: ActionButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type={type}
			className={cn(
				"absolute h-min top-0 p-1",
				icon === "delete" && "right-0 rounded-tl-none rounded-br-none",
				icon !== "delete" && "rounded-t-none",
				icon !== "delete" && isBig && "right-9",
				icon !== "delete" && !isBig && "right-7",
				changesOpacity &&
					"opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			)}
			onClick={onClick}
			disabled={isDisabled || pending}
		>
			<Image
				src={`/static/${icon}.svg`}
				alt={icon}
				width={isBig ? 24 : 16}
				height={isBig ? 24 : 16}
				className="invert dark:invert-0"
			/>
		</Button>
	);
};

export default ActionButton;

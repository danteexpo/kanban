import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
	type: "delete" | "edit" | "confirm";
	onClick: () => void;
	isDisabled?: boolean;
	isBig?: boolean;
	changesOpacity?: boolean;
};

const ActionButton = ({
	type,
	onClick,
	isDisabled,
	isBig,
	changesOpacity,
}: ActionButtonProps) => {
	return (
		<Button
			className={cn(
				"absolute h-min top-0 p-1",
				type === "delete" && "right-0 rounded-tl-none rounded-br-none",
				type !== "delete" && "rounded-t-none",
				type !== "delete" && isBig && "right-9",
				type !== "delete" && !isBig && "right-7",
				changesOpacity &&
					"opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			)}
			onClick={onClick}
			disabled={isDisabled}
		>
			<Image
				src={`/static/${type}.svg`}
				alt={type}
				width={isBig ? 24 : 16}
				height={isBig ? 24 : 16}
				className="invert dark:invert-0"
			/>
		</Button>
	);
};

export default ActionButton;

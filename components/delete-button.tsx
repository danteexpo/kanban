import Image from "next/image";
import { Button } from "./ui/button";

type DeleteButtonProps = {
	onDelete: () => void;
	isSmall: boolean;
	isDisabled?: boolean;
};

const DeleteButton = ({ onDelete, isSmall, isDisabled }: DeleteButtonProps) => {
	return (
		<Button
			className="absolute h-min top-0 right-0 p-1 rounded-tl-none rounded-br-none"
			onClick={onDelete}
			disabled={isDisabled}
		>
			<Image
				src="/static/trash.svg"
				alt="delete task"
				width={isSmall ? 16 : 24}
				height={isSmall ? 16 : 24}
				className="invert dark:invert-0"
			/>
		</Button>
	);
};

export default DeleteButton;

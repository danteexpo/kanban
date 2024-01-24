import { cn } from "@/lib/utils";
import { Inter as FontInter } from "next/font/google";

const fontInter = FontInter({ subsets: ["latin"], variable: "--font-inter" });

export default function ClerkLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				"h-full flex items-center justify-center font-inter",
				fontInter.variable
			)}
		>
			{children}
		</div>
	);
}

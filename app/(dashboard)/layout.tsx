import SkeletonList from "@/components/skeleton-list";
import { Suspense } from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense
			fallback={
				<main className="flex gap-4 overflow-x-auto pt-1 px-1 pb-4">
					<SkeletonList tasks={6} />
					<SkeletonList tasks={5} />
					<SkeletonList tasks={4} />
				</main>
			}
		>
			{children}
		</Suspense>
	);
}

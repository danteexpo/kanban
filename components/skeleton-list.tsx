import { Skeleton } from "./ui/skeleton";

type SkeletonListProps = {
	tasks: number;
};

const SkeletonList = ({ tasks }: SkeletonListProps) => {
	return (
		<Skeleton className="min-w-[240px] max-w-[240px] p-2 h-min max-h-full flex flex-col gap-8">
			<div className="flex flex-col gap-8 items-center pt-16 pb-4 bg-background rounded-md">
				<div className="flex flex-col gap-2 items-center">
					{Array.from({ length: tasks }, (_, i) => i).map((task) => (
						<Skeleton key={task} className="h-11 w-[206px]" />
					))}
				</div>
				<div className="flex gap-2 w-[206px]">
					<Skeleton className="h-11 w-3/4" />
					<Skeleton className="h-11 w-1/4" />
				</div>
			</div>
		</Skeleton>
	);
};

export default SkeletonList;

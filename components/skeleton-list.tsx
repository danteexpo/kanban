import { Skeleton } from "./ui/skeleton";

type SkeletonListProps = {
	tasks: number;
};

const SkeletonList = ({ tasks }: SkeletonListProps) => {
	return (
		<Skeleton className="relative min-w-[240px] max-w-[240px] p-0.5 h-min max-h-full flex flex-col gap-8">
			<Skeleton className="w-6 h-8 absolute top-0 right-0 rounded-tl-none rounded-br-none" />
			<div className="flex flex-col gap-8 items-center pt-16 pb-4 bg-background rounded-md">
				<div className="flex flex-col gap-2 items-center">
					{Array.from({ length: tasks }, (_, i) => i).map((task) => (
						<div key={task} className="relative">
							<Skeleton className="h-11 w-[206px]" />
							<span className="absolute top-0 right-0 bg-background pl-1 pb-1 rounded-bl-md">
								<Skeleton className="w-4 h-6 rounded-tl-none rounded-br-none" />
							</span>
						</div>
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

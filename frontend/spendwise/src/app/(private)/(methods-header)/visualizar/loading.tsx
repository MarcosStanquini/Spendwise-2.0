import { Skeleton } from "@/components/ui/skeleton";

export default function VisualizarLoading() {
	return (
		<div>
			<div className="flex justify-center gap-9 p-8">
				<Skeleton className="w-80 h-36 rounded-lg" />
				<Skeleton className="w-80 h-36 rounded-lg" />
				<Skeleton className="w-80 h-36 rounded-lg" />
			</div>
			<div className="grid grid-cols-2 pt-14 pb-10 items-start">
				<Skeleton className="max-w-3xl mx-20 h-36" />
				<Skeleton className="max-w-3xl mx-20 h-36" />
			</div>
		</div>
	);
}

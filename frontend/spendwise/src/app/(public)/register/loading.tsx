import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterLoading() {
	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<Skeleton className="w-[25rem] h-[28rem] rounded-xl" />
		</div>
	);
}

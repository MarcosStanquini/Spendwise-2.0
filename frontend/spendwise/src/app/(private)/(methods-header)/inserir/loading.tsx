import { Skeleton } from "@/components/ui/skeleton";

export default async function InserirLoading(){
  return(
    <div className="flex justify-center items-center w-screen h-[87vh]">
			<Skeleton className="w-[24rem] min-h-[35rem] rounded-xl" />
		</div>
  )
}
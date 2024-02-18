import { Eye, NotebookPen, Plus } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./button/logout-button";

export function Header() {
	return (
		<div className="bg-zinc-700 text-white flex items-center justify-between py-5 border-b-2 border-black">
			<div className="flex items-center gap-5 ml-20">
				<Link href={"/home"} className="text-3xl font-bold text-white">
					SpendWise
				</Link>
			</div>
			<div className="flex flex-row items-center gap-8 text-xl mr-20">
				<Link href={"/inserir"} className="flex">
					<Plus className="mt-[2.5px]" />
					Inserir
				</Link>
				<Link href={"/visualizar"} className="flex">
					<Eye className="mt-[2.5px]" />
					Visualizar
				</Link>
			</div>
			<LogoutButton />
		</div>
	);
}

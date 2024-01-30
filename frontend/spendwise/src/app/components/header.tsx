import { Eye, NotebookPen, Plus } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <div className="bg-zinc-700 text-white flex items-center justify-between pt-4 pb-5 border-b-2 border-black">
      <div className="flex items-center gap-5 ml-20">
        <Link href={"/home"} className="text-3xl font-bold text-white">
          SpendWise
        </Link>
      </div>
      <div className="flex flex-row items-center gap-8 text-xl mr-14">
        
        <Link href={"/inserir"} className="flex"><Plus className="mt-[2.5px]"/>Inserir</Link>
        <Link href={"/visualizar"} className="flex"><Eye className="mt-[2.5px]"/>Visualizar</Link>
        <Link href={"/relatorio"} className="flex gap-1"><NotebookPen className="mt-[2.5px]"/>Relatório</Link>
      </div>
      <div className="flex items-center gap-5 mr-28 text-base">
        <Link href={"/"}>Conta</Link>
      </div>
    </div>
  );
}

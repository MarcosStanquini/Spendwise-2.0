import { Globe, Settings, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="pb-8">
			<div className="relative w-max-[100vw] h-96 border-b-2 border-gray-500">
				<Image
					src={"/home-image.jpg"}
					alt=""
					fill={true}
					quality={100}
					className="object-cover"
				/>
			</div>
			<div className="flex gap-8 justify-between pt-16 px-64">
				<div className="border-[3px] bor bg-gray-200 border-gray-300 rounded-lg shadow-xl p-3 w-64 h-36 text-center">
					<header className="flex gap-4 ">
						<p className="text-2xl font-semibold">Rápido!</p>
						<Zap className="mt-[0.35rem]" size={23} />
					</header>
					<p className="text-xl font-semibold pt-3">
						Atualizações instantâneas
					</p>
				</div>
				<div className="border-[3px] bor bg-gray-200 border-gray-300 rounded-lg shadow-xl p-3 w-64 text-center">
					<header className="flex gap-4 ">
						<p className="text-2xl font-semibold">Fácil!</p>
						<Globe className="mt-[0.35rem]" size={23} />
					</header>
					<p className="text-xl font-semibold pt-3">
						Consiga ir pra qualquer lugar com 2 cliques!
					</p>
				</div>
				<div className="border-[3px] bor bg-gray-200 border-gray-300 rounded-lg shadow-xl p-3 w-64 text-center">
					<header className="flex gap-4 ">
						<p className="text-2xl font-semibold">Prático!</p>
						<Settings className="mt-[0.35rem]" size={23} />
					</header>
					<p className="text-xl font-semibold pt-3">
						Intuitivo! Design moldado para voce!
					</p>
				</div>
			</div>
			<div className="flex justify-center mt-24 ">
				<div className="bg-gray-400 p-3 rounded-xl hover:shadow-xl hover:shadow-slate-600/50">
					<Link href={"/inserir"} className="text-2xl font-semibold text-black">
						Comece agora!
					</Link>
				</div>
			</div>
		</div>
	);
}

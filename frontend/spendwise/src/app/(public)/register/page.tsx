"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formRegisterSchema = z.object({
	nome: z.string(),
	email: z.string(),
	senha: z.string(),
});

type FormRegisterSchema = z.infer<typeof formRegisterSchema>;

export default function Register() {
	const form = useForm<FormRegisterSchema>({
		resolver: zodResolver(formRegisterSchema),
	});

	function handleRegisterUser(data: FormRegisterSchema) {
		console.log(data);
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleRegisterUser)}
				className="flex flex-col justify-center items-center w-screen h-screen"
			>
				<div className="bg-zinc-100 w-[25rem] h-[28rem] flex flex-col justify-center items-center rounded-xl shadow-2xl">
					<p className="text-4xl font-bold mb-4">Register</p>
					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold relative top-2">NOME</FormLabel>
								<FormControl>
									<Input
										className="text-sm rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold relative top-2">
									E-MAIL
								</FormLabel>
								<FormControl>
									<Input
										className="text-sm rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="senha"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold relative top-2">
									SENHA
								</FormLabel>
								<FormControl>
									<Input
										className="text-sm rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex justify-center">
						<Button
							type="submit"
							className="border-2 border-zinc-300 rounded-lg mt-6 w-44 h-10 hover:bg-zinc-300 duration-500 font-semibold"
						>
							Registrar
						</Button>
					</div>
					<Label className="pt-2 flex mr-[6.7rem] font-semibold ">
						Já possui conta?
						<Link href={"/"} className="text-blue-500 ml-2">
							Login
						</Link>
					</Label>
					<Label className="flex mr-[4.2rem] font-semibold">
						Esqueceu a senha?
						<Link href={"/"} className="text-blue-500 ml-2">
							Redefinir
						</Link>
					</Label>
				</div>
			</form>
		</Form>
	);
}

// <Form {...form}>
//   <form onSubmit={form.handleSubmit(handleRegisterUser)}>
//     <div>
//       <p>Register</p>
//     </div>
//     <FormField
//       control={form.control}
//       name="email"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Seila</FormLabel>
//           <FormControl>
//             <Input type="email" {...field}/>
//           </FormControl>
//         </FormItem>
//       )}
//     />
//     <div>
//       <Button>
//         Registrar
//       </Button>
//     </div>
//     <Label>
//       <Link href={"/"}>
//         Seila
//       </Link>
//     </Label>
//     <Label>
//       <Link href={"/esqueceSenha"}>
//       Seila2
//       </Link>
//     </Label>
//   </form>
// </Form>

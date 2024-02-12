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
import { LoginUser } from "@/data/Auth/login-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formRegisterSchema = z.object({
	name: z.string(),
	username: z.string(),
	password: z.string(),
});

type FormRegisterSchema = z.infer<typeof formRegisterSchema>;

export default function Register() {
	const form = useForm<FormRegisterSchema>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			name: "",
			username: "",
			password: ""
		}
	});
	const { registerUser, errorMensage } = LoginUser()
	async function handleRegisterUser(data: FormRegisterSchema) {
		
		await registerUser(data)
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
						name="name"
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
						name="username"
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-bold relative top-2">
									SENHA
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="text-sm rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="h-6 ">{errorMensage && <p className="text-red-500 pt-2 font-semibold flex gap-2"><AlertCircle />{errorMensage}</p>}</div>
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
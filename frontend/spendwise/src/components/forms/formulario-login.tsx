"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginUser } from "@/data/Auth/login-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formLoginSchema = z.object({
	username: z.string().min(1, {
		message: "Insira o email!"
	}).max(255, {
		message: "Tem que ser menor que 255 letras!"
	}),
	password: z.string().min(1, {
		message: "Insira a senha!"
	}).max(255, {
		message: "Tem que ser menor que 255 letras!"
	}),
});

type FormLoginSchema = z.infer<typeof formLoginSchema>;

export function FormLogin() {
	const form = useForm<FormLoginSchema>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { siginUser, errorMensage } = LoginUser();

	async function handleLoginUser(data: FormLoginSchema) {
		await siginUser(data);
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLoginUser)}
				className="flex flex-col justify-center items-center"
			>
				<div className="bg-zinc-100 w-[23rem] min-h-[24rem] flex flex-col justify-center items-center rounded-xl shadow-2xl">
					<div className="flex justify-center">
						<p className="text-4xl font-bold mb-4 mt-5">SpendWise</p>
					</div>
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="mt-2">
								<FormLabel className="font-bold relative top-2">
									SENHA
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="h-6 ">
						{errorMensage && (
							<p className="text-red-500 pt-2 font-semibold flex gap-2">
								<AlertCircle />
								{errorMensage}
							</p>
						)}
					</div>
					<div className="flex justify-center">
						<Button
							type="submit"
							className="border-2 border-zinc-300 rounded-lg mt-4 w-40 h-10 hover:bg-zinc-300 duration-500 font-semibold"
						>
							Logar
						</Button>
					</div>
					<Label className="pt-2 flex mr-[4.25rem] mt-1 font-semibold mb-5">
						Não possui conta?
						<Link href={"/register"} className="text-blue-500 ml-2">
							Registrar
						</Link>
					</Label>
				</div>
			</form>
		</Form>
	);
}

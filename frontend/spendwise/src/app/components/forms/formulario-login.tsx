"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formLoginSchema = z.object({
  email: z.string(),
  senha: z.string()
})

type FormLoginSchema = z.infer<typeof formLoginSchema>

export function FormLogin() {
  const { register, handleSubmit } = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema)
  })

  function handleLoginUser(data: FormLoginSchema){
    console.log(data)
  }

  return (
    <div className="flex justify-center items-center mb-2">
      <form onSubmit={handleSubmit(handleLoginUser)}>
        <div className="flex justify-center">
          <p className="text-4xl font-bold mb-4">SpendWise</p>
        </div>
        <div>
          <p className="text-sm font-bold pt-5">E-MAIL</p>
          <input
            type="email"
            className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
            {...register("email")}
          />
        </div>
        <div>
          <p className="text-sm font-bold pt-5">SENHA</p>
          <input
            type="password"
            className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
            {...register("senha")}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="border-2 rounded-lg mt-8 w-40 h-10 hover:bg-zinc-300 duration-500 font-semibold"
          >
            Logar
          </button>
        </div>
      </form>
    </div>
  );
}

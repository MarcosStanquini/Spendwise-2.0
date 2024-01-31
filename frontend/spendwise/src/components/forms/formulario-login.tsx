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

const formLoginSchema = z.object({
  email: z.string(),
  senha: z.string(),
});

type FormLoginSchema = z.infer<typeof formLoginSchema>;

export function FormLogin() {
  const form = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
  });

  function handleLoginUser(data: FormLoginSchema) {
    console.log(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginUser)}
        className="flex flex-col justify-center items-center"
      >
        <div className="bg-zinc-100 w-[23rem] h-[24rem] flex flex-col justify-center items-center rounded-xl shadow-2xl">
          <div className="flex justify-center">
            <p className="text-4xl font-bold mb-4">SpendWise</p>
          </div>
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
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="border-2 border-zinc-300 rounded-lg mt-8 w-40 h-10 hover:bg-zinc-300 duration-500 font-semibold"
            >
              Logar
            </Button>
          </div>
          <Label className="pt-2 flex mr-[4.25rem] mt-1 font-semibold">
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
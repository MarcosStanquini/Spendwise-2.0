"use client"

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
import { useForm } from "react-hook-form";
import { z } from "zod";

const formInserirSchema = z.object({
  nome: z.string(),
  value: z.coerce.number(),
  data: z.date(),
  description: z.string(),
  expense: z.boolean(),
  user: z.string(),
});

type FormInserirSchema = z.infer<typeof formInserirSchema>;

export default function Inserir() {
  const form = useForm<FormInserirSchema>({
    resolver: zodResolver(formInserirSchema),
  });

  function handleInserirUser(data: FormInserirSchema) {
    console.log(data);
    form.reset();
  }
  return (
    <div className="flex w-screen h-[87vh] justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleInserirUser)}
          className="flex flex-col justify-center items-center"
        >
          <div className="bg-zinc-100 w-[24rem] h-[35rem] flex flex-col justify-center items-center rounded-xl shadow-2xl">
            <div className="flex justify-center">
              <p className="text-4xl font-bold mb-4">SpendWise</p>
            </div>
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold relative top-2">
                    NOME
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
              name="value"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="font-bold relative top-2">
                    VALOR
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="font-bold relative top-2">
                    DATA
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="font-bold relative top-2">
                    DESCRIÇÃO
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
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="font-bold relative top-2">
                    EXPENSE
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
                Inserir
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

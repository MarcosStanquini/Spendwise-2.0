"use client";
import { useOrcamentos } from "@/data/orcamentos-data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

const formInserirSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Insira a receita ou despesa!",
    })
    .max(255, {
      message: "Tem que ser menor que 255 letras!",
    }),
  value: z.coerce.number().min(1, {
    message: "Insira valor maior que 0",
  }),
  date: z.date({
    required_error: "Por favor selecione a data!",
  }),
  description: z
    .string()
    .min(1, {
      message: "Insira uma descrição!",
    })
    .max(255, {
      message: "Tem que ser menor que 255 letras!",
    }),
  expense: z.boolean().default(false).optional(),
});

type FormInserirSchema = z.infer<typeof formInserirSchema>;

export default function Inserir() {
  const { adicionaOrcamento } = useOrcamentos();

  const form = useForm<FormInserirSchema>({
    resolver: zodResolver(formInserirSchema),
    defaultValues: {
      name: "",
      value: 0,
      description: "",
      expense: true,
    },
  });

  async function handleInserirReceitaOrDespesa(data: FormInserirSchema) {
    const { date, ...restData } = data;
    const dateDeData = date.toISOString().slice(0, 10);
    await adicionaOrcamento({ date: dateDeData, ...restData });
    toast.success("Cadastrado com Sucesso");
    form.reset(); 
  }

  return (
    <div className="flex w-screen h-[87vh] justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleInserirReceitaOrDespesa)}
          className="flex flex-col justify-center items-center"
        >
          <div className="bg-zinc-100 w-[24rem] min-h-[35rem] flex flex-col justify-center items-center rounded-xl shadow-2xl">
            <div className="flex justify-center">
              <p className="text-4xl font-bold mb-4 mt-5">SpendWise</p>
            </div>
            <FormField
              control={form.control}
              name="name"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold relative top-2">
                    VALOR
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="mt-2 flex flex-col">
                  <FormLabel className="font-bold relative top-1">
                    DATA
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="flex items-center">
                        <Button
                          className={cn(
                            "w-72 h-10 bg-zinc-300 pl-2 text-left font-semibold rounded-lg",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecione a data</span>
                          )}
                          <CalendarIcon className="ml-auto opacity-50 mr-1" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className="font-bold relative top-2">
                    DESCRIÇÃO
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none w-72 h-10 bg-zinc-300 pl-2 text-left font-semibold rounded-lg overflow-hidden"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem className="mt-2 flex mr-auto ml-12">
                  <label className="font-bold relative top-2">DESPESA</label>
                  <FormControl className="relative top-1 ml-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center mb-5">
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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useOrcamentoId } from "@/data/orcamentos-data";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

interface EditButtonBudgetProps {
  budgetName: "Despesa" | "Receita";
  id: number;
}

const formEditSchema = z.object({
  name: z.string(),
  value: z.coerce.number(),
  date: z.date({
    required_error: "Por favor selecione a data!",
  }),
  description: z.string(),
  expense: z.boolean().default(false).optional(),
});

type FormEditSchema = z.infer<typeof formEditSchema>;

export function EditButton({ budgetName, id }: EditButtonBudgetProps) {
  const form = useForm<FormEditSchema>({
    resolver: zodResolver(formEditSchema),
    defaultValues: {
      name: "",
      value: 0,
      description: "",
      expense: true,
    },
  });

  const { getIdOrcamento, editOrcamento } = useOrcamentoId(id);

  useEffect(() => {
    if (getIdOrcamento) {
      form.reset({
        name: getIdOrcamento?.name ?? "",
        value: getIdOrcamento?.value ?? "",
        date: new Date(getIdOrcamento?.date),
        description: getIdOrcamento?.description,
        expense: getIdOrcamento?.expense,
      });
    }
  }, [getIdOrcamento, form]);

  async function handleEditReceitaOrDespesa(data: FormEditSchema) {
    const { date, ...restData } = data;
    const dateDeData = date.toISOString().slice(0, 10);
    await editOrcamento({ date: dateDeData, ...restData });
    toast.success("Editado com sucesso")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {budgetName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditReceitaOrDespesa)}
            className="flex flex-col justify-center items-center"
          >
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
                      className="rounded-lg w-72 h-10 bg-zinc-300 focus:outline-none pl-2 font-semibold"
                      {...field}
                    />
                  </FormControl>
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
                <FormItem className="mt-2">
                  <FormLabel className="font-bold relative top-2">
                    DESCRIÇÃO
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none w-72 h-10 bg-zinc-300 pl-2 text-left font-semibold rounded-lg overflow-hidden"
                      {...field}
                    />
                  </FormControl>
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

            <div className="flex justify-center">
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="border-2 border-zinc-300 rounded-lg mt-8 w-40 h-10 hover:bg-zinc-300 duration-500 font-semibold"
                >
                  Alterar
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

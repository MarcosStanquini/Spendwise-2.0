"use client";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { orcamentoGet, orcamentoGetSchema } from "@/data/visible-page";
import { priceFormatter } from "@/utils/formatter-price";
import {
  ArrowUpCircle,
  Pencil,
  Trash2,
  DollarSign,
  ArrowDownCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Visualizar() {
  const [dataExpend, setDataExpend] = useState<orcamentoGetSchema[]>([]);
  const [dataNotExpend, setDataNotExpend] = useState<orcamentoGetSchema[]>([]);

  useEffect(() => {
    const buscarVisualizacoes = async () => {
      try {
        const datasNotExpend = (await orcamentoGet()).filter(
          (visuExpend: orcamentoGetSchema) => !visuExpend.expense
        );
        setDataNotExpend(datasNotExpend);

        const datasExpend = (await orcamentoGet()).filter(
          (visuExpend: orcamentoGetSchema) => visuExpend.expense
        );
        setDataExpend(datasExpend);
      } catch (erro) {
        console.error("Erro ao buscar dados", erro);
      }
    };
    buscarVisualizacoes();
  }, []);

  let totalExpend = dataExpend.reduce((acumulador, visualizacoesExpend) => {
    return acumulador + visualizacoesExpend.value;
  }, 0);

  let totalNotExpend = dataNotExpend.reduce(
    (acumulador, visualizacoesNotExpend) => {
      return acumulador + visualizacoesNotExpend.value;
    },
    0
  );

  let totalSaldo = totalNotExpend - totalExpend;

  return (
    <div>
      <div className="flex justify-center gap-9 p-8">
        <div className="w-80 h-36 bg-gray-400 rounded-lg border-2 border-zinc-600">
          <header className="flex items-center justify-between m-5">
            <span className="font-bold text-lg">Receitas</span>
            <ArrowUpCircle className="text-green-700" size={26} />
          </header>
          <span className="font-extrabold block mt-8 ml-5 text-2xl">
            {priceFormatter.format(totalNotExpend)}
          </span>
        </div>
        <div className="w-80 h-36 bg-gray-400 rounded-lg border-2 border-zinc-600">
          <header className="flex items-center justify-between m-5">
            <span className="font-bold text-lg">Despesas</span>
            <ArrowDownCircle className="text-red-700" size={26} />
          </header>
          <span className="font-extrabold block mt-8 ml-5 text-2xl">
            {priceFormatter.format(totalExpend)}
          </span>
        </div>
        <div
          className={`w-80 h-36 rounded-lg border-2 border-zinc-600 ${
            totalSaldo > 0 ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <header className="flex items-center justify-between m-5">
            <span className="font-bold text-lg">Total</span>
            <DollarSign size={26} />
          </header>
          <span className="font-extrabold block mt-8 ml-5 text-2xl">
            {priceFormatter.format(totalSaldo)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-14 pb-10">
        <div className="flex flex-col ml-5">
          <div className="flex justify-center mb-2">
            <p className="text-3xl font-medium">Receitas</p>
          </div>
          <div className="border border-zinc-900 rounded max-w-3xl mx-20">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Editar/Deletar</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {dataNotExpend.map((visualizacoesNotExpend) => {
                  return (
                    <TableRow className="font-semibold">
                      <TableCell className="max-w-[340px]">
                        {visualizacoesNotExpend.description}
                      </TableCell>
                      <TableCell>{visualizacoesNotExpend.date}</TableCell>
                      <TableCell className="text-green-600">
                        {priceFormatter.format(visualizacoesNotExpend.value)}
                      </TableCell>
                      <TableCell className="flex gap-2 font-bold ml-1">
                        <Link href={"/editar"}>
                          <Pencil />
                        </Link>{" "}
                        /{" "}
                        <button type="submit">
                          <Trash2 />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mb-2">
            <p className="text-3xl font-medium">Despesas</p>
          </div>
          <div className="border border-zinc-900 rounded max-w-3xl mx-20">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-[340px]">Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Editar/Deletar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataExpend.map((visualizacoesExpend) => {
                  return (
                    <TableRow className="font-semibold">
                      <TableCell>{visualizacoesExpend.description}</TableCell>
                      <TableCell>{visualizacoesExpend.date}</TableCell>
                      <TableCell className="text-red-600">-{priceFormatter.format(visualizacoesExpend.value)}</TableCell>
                      <TableCell className="flex gap-2 font-bold ml-1">
                        <Link href={"/editar"}>
                          <Pencil />
                        </Link>{" "}
                        /{" "}
                        <button type="submit">
                          <Trash2 />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

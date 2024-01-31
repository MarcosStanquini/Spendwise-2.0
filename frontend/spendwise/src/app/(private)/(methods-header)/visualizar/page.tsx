import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Visualizar() {
  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl font-semibold mt-7">Seu saldo é: XX</p>
      </div>
      <div className="grid grid-cols-2 pt-14">
        <div className="flex flex-col justify-center ml-5">
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
                <TableRow className="font-semibold">
                  <TableCell className="max-w-[340px]">Caiu o salário do mês!</TableCell>
                  <TableCell>02/06/2023</TableCell>
                  <TableCell className="text-green-600">R$ 2500,00</TableCell>
                  <TableCell className="flex gap-2 font-bold ml-1">
                  <Link href={"/editar"}><Pencil /></Link> / <button type="submit"><Trash2 /></button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mb-2">
            <p className="text-3xl font-medium">Despesas</p>
          </div>
          <div className="border border-zinc-900 rounded max-w-3xl mx-20">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-[340px]">Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Editar/Deletar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="font-semibold">
                  <TableCell>Fui ao shopping!</TableCell>
                  <TableCell>11/08/2023</TableCell>
                  <TableCell className="text-red-600">R$ 350,00</TableCell>
                  <TableCell className="flex gap-2 font-bold ml-1">
                    <Link href={"/editar"}><Pencil /></Link> / <button type="submit"><Trash2 /></button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

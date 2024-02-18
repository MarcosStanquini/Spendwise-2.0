"use client";
import { useOrcamentos } from "@/data/orcamentos-data";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function DeleteButton({ id }: { id: number }) {
  const { removeOrcamento } = useOrcamentos();
  function handleDeleteButton() {
    toast.success("Removido com sucesso");
    return removeOrcamento(id);
  }
  return (
    <button type="submit" onClick={handleDeleteButton}>
      <Trash2 />
    </button>
  );
}

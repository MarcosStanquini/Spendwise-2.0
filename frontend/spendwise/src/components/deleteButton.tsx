"use client";

import { orcamentoDelete } from "@/data/visible-page";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id }: { id: number }) {
  const { mutateAsync: removeOrcamento } = useMutation({
    mutationFn: orcamentoDelete,
  });

  async function handleDeleteButton() {
    await removeOrcamento(id);
    window.location.reload()
  }
  return (
    <button type="submit" onClick={handleDeleteButton}>
      <Trash2 />
    </button>
  );
}

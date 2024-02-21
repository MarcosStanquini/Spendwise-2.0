"use client";
import { api } from "@/lib/api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface orcamentoGetSchema {
  id: number;
  name: string;
  value: number;
  date: string;
  description: string;
  created_at: string;
  expense: boolean;
  user: number;
}

export interface orcamentoPostSchema {
  name: string;
  value: number;
  date: string;
  description: string;
  expense?: boolean;
}

async function orcamentoGet() {
  const token = localStorage.getItem("authToken");
  const response = await api.get<orcamentoGetSchema[]>("/budgets/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function orcamentoDelete(id: number) {
  await api.delete(`/budgets/${id}`);
}

async function orcamentoPost(data: orcamentoPostSchema) {
  const token = localStorage.getItem("authToken");
  if (token) {
    const { date, ...restData } = data;
    await api.post(
      "/budgets/",
      { date, ...restData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export function useOrcamentos() {
  const { data, refetch } = useQuery({
    queryKey: ["orcamentos"],
    queryFn: orcamentoGet,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData
  });

  const { mutateAsync: removeOrcamento } = useMutation({
    mutationFn: orcamentoDelete,
    onSuccess: () => {
      refetch();
    },
  });

  const { mutateAsync: adicionaOrcamento } = useMutation({
    mutationFn: orcamentoPost,
  });

  return { data, removeOrcamento, adicionaOrcamento };
}

async function orcamentoGetId(id: number) {
  const token = localStorage.getItem("authToken");
  const response = await api.get<orcamentoGetSchema>(`/budgets/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function orcamentoEdit(id: number, data: orcamentoPostSchema) {
  const token = localStorage.getItem("authToken");
  if (token) {
    const { date, ...restData } = data;
    await api.put(
      `/budgets/${id}/`,
      { date, ...restData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export function useOrcamentoId(id: number) {
  const queryClient = useQueryClient();

  const { data: getIdOrcamento } = useQuery({
    queryKey: ["orcamento", id],
    queryFn: () => orcamentoGetId(id),
  });

  const { mutateAsync: editOrcamento } = useMutation({
    mutationFn: ({ date, ...restData }: orcamentoPostSchema) =>
      orcamentoEdit(id, { date, ...restData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orcamentos"] });
    },
  });

  return { getIdOrcamento, editOrcamento };
}

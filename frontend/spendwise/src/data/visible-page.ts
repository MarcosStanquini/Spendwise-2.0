"use client";
import { api } from "@/lib/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

async function orcamentoGet() {
	const response = await api.get<orcamentoGetSchema[]>("/budgets");
	return response.data;
}

async function orcamentoDelete(id: number) {
	await api.delete(`/budgets/${id}`);
}

export function useOrcamentos() {
	const { data, refetch } = useQuery({
		queryKey: ["orcamentos"],
		queryFn: orcamentoGet,
	});

	const { mutateAsync: removeOrcamento } = useMutation({
		mutationFn: orcamentoDelete,
		onSuccess: () => {
			refetch();
		},
	});

	return { data, removeOrcamento };
}

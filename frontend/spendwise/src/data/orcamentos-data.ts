"use client";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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
	user: number;
}

async function orcamentoGet() {
	const response = await api.get<orcamentoGetSchema[]>("/budgets");
	return response.data;
}

async function orcamentoDelete(id: number) {
	await api.delete(`/budgets/${id}`);
}

async function orcamentoPost(data: orcamentoPostSchema) {
	const { date, ...restData } = data;
	await api.post("/budgets/", { date, ...restData });
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

	const { mutateAsync: adicionaOrcamento } = useMutation({
		mutationFn: orcamentoPost,
	});

	return { data, removeOrcamento, adicionaOrcamento };
}

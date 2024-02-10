"use client";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

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
	const response = await api.get<orcamentoGetSchema[]>("/budgets");
	return response.data;
}

async function orcamentoDelete(id: number) {
	await api.delete(`/budgets/${id}`);
}

async function orcamentoPost(data: orcamentoPostSchema) {
	const token = localStorage.getItem("authToken");
	if (token) {
		const { user_id } = jwtDecode(token) as { user_id: number };
		const { date, ...restData } = data;
		console.log(user_id)
		await api.post("/budgets/", { date, user: user_id, ...restData });
	}
	
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

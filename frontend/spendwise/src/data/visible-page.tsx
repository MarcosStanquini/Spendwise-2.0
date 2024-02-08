import { api } from "@/lib/api";

export interface orcamentoGetSchema{
  id: number
  name: string
  value: number
  date: string
  description: string
  created_at: string
  expense: boolean
  user: number
}

export async function orcamentoGet(): Promise<orcamentoGetSchema[]>{
  const response = await api("/budgets", {
    cache: 'no-store'
  })
  return await response.json()
}

export async function orcamentoDelete(id: number) {
  await api(`/budgets/${id}`, {
    method: 'DELETE'
  })
}
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

export async function orcamentoGet(){
  const response = await api.get<orcamentoGetSchema[]>("/budgets")
  console.log(response.data)
  return response.data
}
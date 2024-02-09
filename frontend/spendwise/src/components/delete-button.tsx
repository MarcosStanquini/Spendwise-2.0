"use client";
import { useOrcamentos } from "@/data/visible-page";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id }: { id: number }) {
	const { removeOrcamento } = useOrcamentos();
	function handleDeleteButton() {
		return removeOrcamento(id);
	}
	return (
		<button type="submit" onClick={handleDeleteButton}>
			<Trash2 />
		</button>
	);
}

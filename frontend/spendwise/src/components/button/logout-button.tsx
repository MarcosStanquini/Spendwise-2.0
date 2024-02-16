"use client";
import { LoginUser } from "@/data/Auth/login-user";

export function LogoutButton() {
	const { sigoutUser } = LoginUser();

	async function handleLogout() {
		await sigoutUser();
	}

	return (
		<div className="flex items-center gap-5 mr-28 text-base font-semibold mt-1">
			<button type="button" onClick={handleLogout}>Logout</button>
		</div>
	);
}

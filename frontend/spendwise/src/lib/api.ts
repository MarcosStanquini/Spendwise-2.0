import { refreshToken } from "@/data/Auth/login-user";
import axios from "axios";
export const api = axios.create({
	baseURL: "http://localhost:8000",
});

const token = localStorage.getItem("authToken");
if (token) {
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				await refreshToken();
				const authToken = localStorage.getItem("authToken");
				api.defaults.headers.common.Authorization = `Bearer ${authToken}`;
				return api(originalRequest);
			}
			return Promise.reject(error);
		},
	);
}

"use client";

import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface loginUserSchema {
  username: string;
  password: string;
}

const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

const setRefreshToken = (refresh: string) => {
  localStorage.setItem("refreshToken", refresh);
};

export function LoginUser() {
  const route = useRouter();

  async function signin(data: loginUserSchema) {
    const response = await api.post("/token/", data);
    const token = response.data.access;
    const refreshTokens = response.data.refresh;
    if (token) {
      setToken(token);
      setRefreshToken(refreshTokens);
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        "authToken"
      )}`;
    }
  }

  async function signout() {
    localStorage.removeItem("authToken");
    axios.defaults.headers.common.Authorization = undefined;
  }

  const { mutateAsync: siginUser } = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      route.push("/visualizar");
    },
  });

  const { mutateAsync: sigoutUser } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      route.push("/");
    },
  });

  return { siginUser, sigoutUser };
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    try {
      const response = await api.post("/token/refresh", {
        refresh: refreshToken,
      });
      if (response.data.access) {
        localStorage.setItem("authToken", response.data.access);
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  } else {
    console.error("No refresh token available");
  }
}

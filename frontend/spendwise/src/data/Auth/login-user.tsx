"use client";

import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface loginUserSchema {
  username: string;
  password: string;
}

interface registerUserSchema{
  name: string,
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
  const [errorMensage, setErrorMensage] = useState<string | null>(null);
  async function signin(data: loginUserSchema) {
    try {
      const response = await api.post("/token/", data);
      const token = response.data.access;
      const refreshTokens = response.data.refresh;
      if (token) {
        setToken(token);
        setRefreshToken(refreshTokens);
        setErrorMensage(null);
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
          "authToken"
        )}`;  
        route.push('/visualizar')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          setErrorMensage("A senha ou usuário está incorreto");
          return;
        }
      }
    }
  }

  async function signout() {
    localStorage.removeItem("authToken");
    axios.defaults.headers.common.Authorization = undefined;
  }

  async function register(data: registerUserSchema){
    await api.post('/users/',  data)
  }

  const { mutateAsync: siginUser } = useMutation({
    mutationFn: signin,
  });

  const { mutateAsync: sigoutUser } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      route.push("/");
    },
  });

  const { mutateAsync: registerUser} = useMutation({
    mutationFn: register,
    onSuccess: () => {
      route.push("/")
    },
    onError: () => {
      setErrorMensage("Já existe um usuário com o mesmo email ou nome")
    }
  })

  return { siginUser, sigoutUser, errorMensage, registerUser };
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

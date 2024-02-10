"use client"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function RequireAuth({children}: {children: ReactNode}){
  const tokens = localStorage.getItem("authToken")
  const router = useRouter()
  useEffect(() => {
    if (!tokens) {
      router.push('/')
    }
  }, [tokens, router]);

  return children
}
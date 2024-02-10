import { ReactNode } from "react";
import { Header } from "../../components/header";
import { RequireAuth } from "@/data/Auth/require-auth";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <div>
        <Header />
        {children}
      </div>
    </RequireAuth>
  );
}

import LoginPage from "@/features/auth/components/LoginPage";
import { Suspense } from "react";

export default function Login() {
  return <Suspense fallback={<p className="py-24 text-center">Loading…</p>}><LoginPage /></Suspense>;
}

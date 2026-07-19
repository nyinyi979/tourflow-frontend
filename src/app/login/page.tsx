import LoginPage from "@/page/login/LoginPage";
import { Suspense } from "react";

export default function Login() {
  return <Suspense fallback={<p className="py-24 text-center">Loading…</p>}><LoginPage /></Suspense>;
}

import RegisterPage from "@/features/auth/components/RegisterPage";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={<p className="py-24 text-center">Loading…</p>}>
      <RegisterPage />
    </Suspense>
  );
}

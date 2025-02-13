import { Suspense } from "react";
import { LoginForm } from "~/components/form";

export default function Login() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

import { Suspense } from "react";
import { Login } from "~/app/login/components/login";

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

import { Suspense } from "react";
import { LoginForm } from "~/app/login/components/login-form";

export function Login() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md">
      <h2 className="font-bold text-2xl text-foreground/90">ログイン</h2>
      <p className="text-foreground/60 text-sm">
        アカウントにサインインして続けましょう
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}

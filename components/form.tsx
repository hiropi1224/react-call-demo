"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { IconLoader2 } from "justd-icons";
import { useActionState } from "react";
import { login } from "~/action/login";
import { Button, Checkbox, Form, TextField } from "~/components/ui";
import { loginSchema } from "~/schema";

export function LoginForm() {
  const [lastResult, action, isPending] = useActionState(login, undefined);
  const [{ id, onSubmit, errors }, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      action={action}
      className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md"
    >
      <div className="space-y-1">
        <h2 className="font-bold text-2xl text-foreground/90">ログイン</h2>
        <p className="text-foreground/60 text-sm">
          アカウントにサインインして続けましょう
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-y-1">
          <TextField
            key={fields.email.key}
            label="メールアドレス"
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
            type="email"
            validationBehavior="aria"
            autoComplete="email"
            errorMessage={fields.email.errors?.join(", ")}
          />
          <span className="text-red-500">{fields.email.errors}</span>
        </div>

        <div className="flex flex-col gap-y-1">
          <TextField
            key={fields.password.key}
            label="パスワード"
            name={fields.password.name}
            defaultValue={fields.password.initialValue}
            type="password"
            validationBehavior="aria"
            autoComplete="current-password"
          />
          <span className="text-red-500">{fields.password.errors}</span>
        </div>
        <Checkbox
          key={fields.remember.key}
          name={fields.remember.name}
          defaultSelected={fields.remember.initialValue === "on"}
        >
          ログイン情報を保存
        </Checkbox>
      </div>

      <Button
        type="submit"
        size="large"
        className="w-full"
        isPending={isPending}
      >
        {isPending && <IconLoader2 className="h-4 w-4 animate-spin" />}
        ログイン
      </Button>
    </form>
  );
}

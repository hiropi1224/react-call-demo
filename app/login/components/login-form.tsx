"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { IconLoader2 } from "justd-icons";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { login } from "~/action/login";
import { SuccessNote } from "~/components/react-call/notification";
import { Button, Checkbox, Form, TextField } from "~/components/ui";
import { loginSchema } from "~/schema";

interface FormState {
  state: "idle" | "success" | "error";
  message: string;
}

export function LoginForm() {
  const [lastResult, action, isPending] = useActionState<FormState, FormData>(
    login,
    { state: "idle", message: "" } as const,
  );
  const [{ id, onSubmit }, fields] = useForm({
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult.state === "success") {
      SuccessNote.call({ message: lastResult.message });
      redirect("/dashboard");
    }

    return () => {
      setTimeout(() => {
        SuccessNote.end(false);
      }, 3000);
    };
  }, [lastResult]);
  return (
    <form id={id} onSubmit={onSubmit} action={action} className="space-y-4">
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

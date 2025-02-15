"use server";

import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "~/schema";

interface State {
  state: "idle" | "success" | "error";
  message: string;
}

export async function login(_prevState: State, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return {
      state: "error",
      message: "ログインに失敗しました",
    } as const;
  }
  return {
    state: "success",
    message: "ログインに成功しました",
  } as const;
}

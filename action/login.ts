"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { loginSchema } from "~/schema";

export async function login(prevState: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });
  console.log("--- login action ---");
  console.log(submission);
  console.log(formData);

  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect("/dashboard");
}

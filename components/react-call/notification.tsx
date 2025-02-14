"use client";

import { createCallable } from "react-call";
import { Button, Note } from "~/components/ui";

interface Props {
  message: string;
}
type Response = boolean;

export const { Root, ...SuccessNote } = createCallable<Props, Response>(
  ({ call, message }) => (
    <Note intent="success" className="fixed right-4 bottom-4 z-50 max-w-72">
      <div className="flex w-full items-center justify-between">
        <p>{message}</p>
      </div>
    </Note>
  ),
);

import type { Metadata } from "next";
import "./globals.css";
import { Root } from "~/components/react-call/notification";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Root />
      </body>
    </html>
  );
}

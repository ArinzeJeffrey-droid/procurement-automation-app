import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import QueryProvider from "@/providers/QueryProvider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order Management",
  description: "Order Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Layout>{children}</Layout>
        </QueryProvider>
      </body>
    </html>
  );
}

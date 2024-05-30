import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { readFile } from "fs/promises";

const inter = Inter({ subsets: ["latin"] });

async function getAppVersion() {
  const packageJson = await readFile("package.json", "utf8");
  const { version } = JSON.parse(packageJson);
  return version as string;
}

export const metadata: Metadata = {
  title: "Калькулятор",
  description: "Калькулятор для розрахунку середнього арифметичного",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [
    { name: "Yurii Bliusiuk" },
    {
      name: "Yurii Bliusiuk",
      url: "https://www.linkedin.com/in/yuriybl/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "apple-touch-icon.png" },
    { rel: "icon", url: "android-chrome-192x192.png", sizes: "192x192" },
    { rel: "icon", url: "android-chrome-512x512.png", sizes: "512x512" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appVersion = await getAppVersion();

  return (
    <html lang="ua">
      <body className={cn(inter.className, "!h-dvh w-full flex flex-col")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b bg-background flex flex-col items-center">
            <div className={"w-full max-w-[500px] flex items-center h-16 gap-2 px-2"}>
              <div className="flex gap-1 items-end">
                <h1 className="text-xl">Калькулятор</h1>
                <span className="text-sm text-slate-500">v{appVersion}</span>
              </div>
              <div className="flex-grow" />
              <ThemeToggle />
            </div>
          </header>
          <main className={"flex-grow"}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AgentMart",
    template: "%s | AgentMart",
  },
  description:
    "A deterministic, resettable ecommerce fixture for verifying WebMCP tool behavior with ToolTruth.",
  applicationName: "AgentMart",
  keywords: [
    "AgentMart",
    "ToolTruth",
    "WebMCP",
    "ecommerce",
    "tool verification",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col dark">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

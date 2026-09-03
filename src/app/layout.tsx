import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";

import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
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

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col dark">
        <TooltipProvider>
          <AppHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <AppFooter />
        </TooltipProvider>
      </body>
    </html>
  );
};

export default RootLayout;

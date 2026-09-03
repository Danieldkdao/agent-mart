import Link from "next/link";
import { MenuIcon, StoreIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartCount } from "@/features/cart/components/cart-count";

const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
] as const;

export const AppHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
    <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="AgentMart home"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
          <StoreIcon className="size-5" aria-hidden="true" />
        </span>
        <span className="hidden font-serif text-xl font-semibold tracking-tight md:inline">
          AgentMart
        </span>
      </Link>

      <nav className="ml-8 hidden items-center gap-1 md:flex" aria-label="Primary navigation">
        {NAVIGATION_LINKS.map((link) => (
          <Button key={link.href} asChild variant="ghost">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1">
        <Button asChild variant="ghost" size="icon-lg" className="rounded-full">
          <a
            href="https://github.com/Danieldkdao/agent-mart"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View AgentMart on GitHub"
          >
            <FaGithub className="size-[1.15rem]" aria-hidden="true" />
          </a>
        </Button>

        <CartCount />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-full md:hidden"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[min(21rem,calc(100vw-2rem))]">
            <SheetHeader className="border-b px-5 py-5">
              <SheetTitle className="flex items-center gap-2.5 text-lg">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <StoreIcon className="size-4" aria-hidden="true" />
                </span>
                AgentMart
              </SheetTitle>
              <SheetDescription>
                A deterministic storefront built for ToolTruth demonstrations.
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-3" aria-label="Mobile navigation">
              {NAVIGATION_LINKS.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-10 justify-start px-3 text-base"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button
                  asChild
                  variant="ghost"
                  className="h-10 justify-start px-3 text-base"
                >
                  <Link href="/cart">Cart</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
);

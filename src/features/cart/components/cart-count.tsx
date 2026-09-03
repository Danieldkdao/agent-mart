"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  selectCartItemCount,
  selectHasHydrated,
  useAgentMartStore,
} from "@/store";

export const CartCount = () => {
  const cartItemCount = useAgentMartStore(selectCartItemCount);
  const hasHydrated = useAgentMartStore(selectHasHydrated);
  const visibleItemCount = hasHydrated ? cartItemCount : 0;
  const itemLabel = visibleItemCount === 1 ? "item" : "items";

  return (
    <Button
      asChild
      variant="ghost"
      size="icon-lg"
      className="relative rounded-full"
    >
      <Link href="/cart" aria-label={`Cart, ${visibleItemCount} ${itemLabel}`}>
        <ShoppingCartIcon className="size-5" aria-hidden="true" />
        <span
          className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-base leading-none font-semibold text-primary-foreground ring-2 ring-background"
          aria-hidden="true"
        >
          {visibleItemCount}
        </span>
      </Link>
    </Button>
  );
};

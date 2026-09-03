"use client";

import { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  selectCartItemCount,
  selectCartSubtotal,
  useAgentMartStore,
} from "@/store";

type ProductPurchaseControlsProps = {
  productId: string;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const ProductPurchaseControls = ({
  productId,
}: ProductPurchaseControlsProps) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const addToCart = useAgentMartStore((state) => state.addToCart);
  const hasHydrated = useAgentMartStore((state) => state.hasHydrated);
  const inventory = useAgentMartStore(
    (state) => state.inventory[productId] ?? 0,
  );
  const quantityInCart = useAgentMartStore(
    (state) =>
      state.cart.find((item) => item.productId === productId)?.quantity ?? 0,
  );
  const cartItemCount = useAgentMartStore(selectCartItemCount);
  const cartSubtotal = useAgentMartStore(selectCartSubtotal);
  const visibleCartItemCount = hasHydrated ? cartItemCount : 0;
  const visibleCartSubtotal = hasHydrated ? cartSubtotal : 0;
  const remainingInventory = Math.max(inventory - quantityInCart, 0);
  const canAddQuantity =
    hasHydrated &&
    remainingInventory > 0 &&
    quantityToAdd <= remainingInventory;

  const handleIncrement = () => {
    setQuantityToAdd((currentQuantity) =>
      Math.min(currentQuantity + 1, remainingInventory),
    );
    setFeedback(null);
  };

  const handleAddToCart = () => {
    try {
      const addedQuantity = quantityToAdd;
      const resultingProductQuantity = addToCart(productId, addedQuantity);

      setFeedback(
        `${addedQuantity} ${addedQuantity === 1 ? "item" : "items"} added. ${resultingProductQuantity} of this product now in your cart.`,
      );
      setQuantityToAdd(1);
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to add this item.",
      );
    }
  };

  return (
    <Card className="mt-7 gap-0">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div>
            <label
              htmlFor="product-quantity"
              className="mb-2 block text-base font-medium"
            >
              Quantity to add
            </label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                className="rounded-r-none disabled:opacity-100"
                disabled
                aria-label="Decrease quantity"
                title="Decrement controls will be added later"
              >
                <MinusIcon aria-hidden="true" />
              </Button>
              <Input
                id="product-quantity"
                value={quantityToAdd}
                readOnly
                inputMode="numeric"
                aria-label="Quantity to add"
                className="h-9 w-14 rounded-none border-x-0 text-center tabular-nums focus-visible:z-10"
              />
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                className="rounded-l-none"
                onClick={handleIncrement}
                disabled={!hasHydrated || quantityToAdd >= remainingInventory}
                aria-label="Increase quantity"
              >
                <PlusIcon aria-hidden="true" />
              </Button>
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            className="h-11 flex-1 text-base"
            onClick={handleAddToCart}
            disabled={!canAddQuantity}
          >
            <ShoppingCartIcon aria-hidden="true" />
            Add {quantityToAdd} to cart
          </Button>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-base leading-6 text-muted-foreground">
          <ShieldCheckIcon className="mt-1 size-4 shrink-0" aria-hidden="true" />
          <div>
            <p aria-live="polite">
              Cart total: {visibleCartItemCount}{" "}
              {visibleCartItemCount === 1 ? "item" : "items"} &middot;{" "}
              {priceFormatter.format(visibleCartSubtotal)}
            </p>
            {feedback && (
              <p className="mt-1 font-medium text-foreground" role="status">
                {feedback}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

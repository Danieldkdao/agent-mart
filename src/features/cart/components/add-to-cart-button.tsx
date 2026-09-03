"use client";

import { useState } from "react";
import { ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAgentMartStore } from "@/store";

type AddToCartButtonProps = {
  productId: string;
};

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addToCart = useAgentMartStore((state) => state.addToCart);
  const hasHydrated = useAgentMartStore((state) => state.hasHydrated);
  const inventory = useAgentMartStore(
    (state) => state.inventory[productId] ?? 0,
  );
  const quantityInCart = useAgentMartStore(
    (state) =>
      state.cart.find((item) => item.productId === productId)?.quantity ?? 0,
  );
  const isAtInventoryLimit = quantityInCart >= inventory;

  const handleAddToCart = () => {
    try {
      addToCart(productId, 1);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to add this item.",
      );
    }
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        className="w-full"
        onClick={handleAddToCart}
        disabled={!hasHydrated || isAtInventoryLimit}
      >
        <ShoppingCartIcon aria-hidden="true" />
        {isAtInventoryLimit
          ? "Maximum in cart"
          : quantityInCart > 0
            ? "Add another"
            : "Add to cart"}
      </Button>
      {errorMessage && (
        <p className="mt-2 text-base text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

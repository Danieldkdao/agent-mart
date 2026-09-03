"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRightIcon, ShoppingBagIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCTS_BY_ID } from "@/data/products";
import { CartLine } from "@/features/cart/components/cart-line";
import { selectCartSubtotal, useAgentMartStore } from "@/store";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CHECKOUT_DELAY_MS = 2000;

const waitForCheckout = () =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, CHECKOUT_DELAY_MS);
  });

const CartLoadingState = () => (
  <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
    <Skeleton className="h-96 rounded-xl" />
    <Skeleton className="h-80 rounded-xl" />
  </div>
);

const EmptyCart = () => (
  <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <Card className="border-dashed">
      <CardContent className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
        <span className="rounded-full bg-muted p-5 text-muted-foreground">
          <ShoppingBagIcon className="size-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight">
          Your cart is empty
        </h2>
        <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
          Browse the AgentMart catalog and add something useful to get started.
        </p>
        <Button asChild size="lg" className="mt-7">
          <Link href="/products">
            Browse products
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);

export const CartPageContent = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const cart = useAgentMartStore((state) => state.cart);
  const inventory = useAgentMartStore((state) => state.inventory);
  const hasHydrated = useAgentMartStore((state) => state.hasHydrated);
  const addToCart = useAgentMartStore((state) => state.addToCart);
  const updateQuantity = useAgentMartStore((state) => state.updateQuantity);
  const removeFromCart = useAgentMartStore((state) => state.removeFromCart);
  const createOrder = useAgentMartStore((state) => state.createOrder);
  const subtotal = useAgentMartStore(selectCartSubtotal);
  const cartLines = cart.flatMap((item) => {
    const product = PRODUCTS_BY_ID.get(item.productId);
    return product ? [{ ...item, product }] : [];
  });

  const handleIncrement = (productId: string) => {
    try {
      addToCart(productId, 1);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update the cart.",
      );
    }
  };

  const handleDecrement = (productId: string, quantity: number) => {
    try {
      updateQuantity(productId, quantity - 1);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update the cart.",
      );
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setErrorMessage(null);
  };

  const handleCheckout = async () => {
    if (isCheckingOut || cartLines.length === 0) {
      return;
    }

    setIsCheckingOut(true);
    setErrorMessage(null);

    await waitForCheckout();

    try {
      const order = createOrder();
      toast.success(`Order ${order.orderNumber} was created successfully.`);
      router.push("/orders");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create your order.";
      setErrorMessage(message);
      setIsCheckingOut(false);
      toast.error(message);
    }
  };

  if (!hasHydrated) {
    return <CartLoadingState />;
  }

  if (cartLines.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
      <div className="min-w-0">
        {errorMessage && (
          <div
            className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-base text-destructive"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <Card className="gap-0 py-0">
          <div className="flex items-center justify-between gap-4 border-b px-5 py-5 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold">Cart items</h2>
            <p className="text-base text-muted-foreground">
              {cartLines.length}{" "}
              {cartLines.length === 1 ? "product" : "products"}
            </p>
          </div>
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5 sm:pl-6">Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Line total</TableHead>
                <TableHead className="pr-5 text-right sm:pr-6">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartLines.map(({ productId, quantity, product }) => (
                <CartLine
                  key={productId}
                  product={product}
                  quantity={quantity}
                  availableInventory={inventory[productId] ?? 0}
                  disabled={isCheckingOut}
                  onIncrement={() => handleIncrement(productId)}
                  onDecrement={() => handleDecrement(productId, quantity)}
                  onRemove={() => handleRemove(productId)}
                />
              ))}
            </TableBody>
          </Table>
        </Card>

        <Button asChild variant="ghost" className="mt-4">
          <Link href="/products">
            <ArrowRightIcon className="rotate-180" aria-hidden="true" />
            Continue shopping
          </Link>
        </Button>
      </div>

      <aside>
        <Card className="gap-0 lg:sticky lg:top-24">
          <CardHeader className="border-b">
            <CardTitle className="font-serif text-2xl">Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 px-5 py-5">
            <dl className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums">
                  {priceFormatter.format(subtotal)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-right font-medium">
                  Calculated at checkout
                </dd>
              </div>
            </dl>

            <Separator />

            <div
              className="flex items-end justify-between gap-4"
              aria-live="polite"
            >
              <p className="font-semibold">Total</p>
              <p className="text-2xl font-semibold tracking-tight tabular-nums">
                {priceFormatter.format(subtotal)}
              </p>
            </div>

            <Button
              type="button"
              size="lg"
              className="h-11 w-full text-base"
              disabled={isCheckingOut}
              aria-busy={isCheckingOut}
              aria-label={isCheckingOut ? "Creating order" : "Checkout"}
              onClick={handleCheckout}
            >
              <LoadingSwap isLoading={isCheckingOut}>
                <span className="inline-flex items-center justify-center gap-2">
                  Checkout
                  <ArrowRightIcon aria-hidden="true" />
                </span>
              </LoadingSwap>
            </Button>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
};

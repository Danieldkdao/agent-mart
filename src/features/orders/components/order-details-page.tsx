"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  PackageCheckIcon,
  PackageXIcon,
  ReceiptTextIcon,
  SearchXIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCTS_BY_ID } from "@/data/products";
import type { Order } from "@/store";
import { useAgentMartStore } from "@/store";

type OrderDetailsPageProps = {
  orderId: string;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "short",
});

const formatOrderDate = (createdAt: string) => {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : dateFormatter.format(date);
};

const getOrderItemCount = (order: Order) =>
  order.items.reduce((total, item) => total + item.quantity, 0);

const OrderDetailsLoading = () => (
  <main className="flex-1">
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-32 rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  </main>
);

const OrderNotFound = () => (
  <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
    <Card className="w-full max-w-lg text-center shadow-sm">
      <CardContent className="flex flex-col items-center px-6 py-10 sm:px-10 sm:py-12">
        <span className="rounded-full bg-muted p-4 text-muted-foreground">
          <SearchXIcon className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Order not found
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
          This order may not exist in this browser, or the order address may be
          incorrect.
        </p>
        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/orders">View all orders</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </main>
);

export const OrderDetailsPage = ({ orderId }: OrderDetailsPageProps) => {
  const order = useAgentMartStore((state) =>
    state.orders.find((candidate) => candidate.id === orderId),
  );
  const hasHydrated = useAgentMartStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return <OrderDetailsLoading />;
  }

  if (!order) {
    return <OrderNotFound />;
  }

  const itemCount = getOrderItemCount(order);
  const isCancelled = order.status === "cancelled";

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
          <Link href="/orders">
            <ChevronLeftIcon aria-hidden="true" />
            Back to orders
          </Link>
        </Button>

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                  Order {order.orderNumber}
                </h1>
                <Badge
                  variant={isCancelled ? "destructive" : "secondary"}
                  className="capitalize"
                >
                  {order.status}
                </Badge>
              </div>
              <p className="mt-3 flex items-center gap-2 text-base text-muted-foreground">
                <CalendarDaysIcon className="size-5" aria-hidden="true" />
                Placed{" "}
                <time dateTime={order.createdAt}>
                  {formatOrderDate(order.createdAt)}
                </time>
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="border-b px-5 py-5 sm:px-6">
              <CardTitle className="font-serif text-2xl">Order items</CardTitle>
              <p className="text-base text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "items"} in this order
              </p>
            </CardHeader>
            <Table className="min-w-[680px]">
              <TableCaption className="sr-only">
                Products included in order {order.orderNumber}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5 sm:pl-6">Product</TableHead>
                  <TableHead>Unit price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="pr-5 text-right sm:pr-6">
                    Line total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => {
                  const product = PRODUCTS_BY_ID.get(item.productId);

                  return (
                    <TableRow key={item.productId}>
                      <TableCell className="py-4 pl-5 sm:pl-6">
                        <div className="flex items-center gap-4">
                          {product ? (
                            <Link
                              href={`/products/${product.id}`}
                              className="relative block size-16 shrink-0 overflow-hidden rounded-xl border bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                              aria-label={`View ${product.name}`}
                            >
                              <Image
                                src={product.image.src}
                                alt={product.image.alt}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </Link>
                          ) : (
                            <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
                              <ReceiptTextIcon
                                className="size-6"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                          <div className="min-w-0 whitespace-normal">
                            {product ? (
                              <Link
                                href={`/products/${product.id}`}
                                className="font-serif text-lg font-semibold decoration-primary/40 underline-offset-4 hover:underline"
                              >
                                {item.productName}
                              </Link>
                            ) : (
                              <p className="font-serif text-lg font-semibold">
                                {item.productName}
                              </p>
                            )}
                            <p className="mt-1 font-mono text-base text-muted-foreground">
                              {item.productId}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium tabular-nums">
                        {priceFormatter.format(item.unitPrice)}
                      </TableCell>
                      <TableCell className="font-medium tabular-nums">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="pr-5 text-right text-lg font-semibold tabular-nums sm:pr-6">
                        {priceFormatter.format(item.unitPrice * item.quantity)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <Card className="gap-0">
              <CardHeader className="border-b">
                <CardTitle className="font-serif text-2xl">
                  Order summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 px-5 py-5">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-medium tabular-nums">
                      {priceFormatter.format(order.subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="font-medium tabular-nums">
                      {order.shipping === 0
                        ? "Free"
                        : priceFormatter.format(order.shipping)}
                    </dd>
                  </div>
                </dl>
                <Separator />
                <div className="flex items-end justify-between gap-4">
                  <p className="font-semibold">Total</p>
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">
                    {priceFormatter.format(order.total)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-4 px-5 py-5 items-start">
                <div
                  className={
                    isCancelled
                      ? "rounded-xl bg-destructive/10 p-3 text-destructive"
                      : "rounded-xl bg-primary/10 p-3 text-primary"
                  }
                >
                  {isCancelled ? (
                    <PackageXIcon className="size-6" aria-hidden="true" />
                  ) : (
                    <PackageCheckIcon className="size-6" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    {isCancelled ? "Order cancelled" : "Order confirmed"}
                  </h2>
                  <p className="mt-2 text-base leading-6 text-muted-foreground">
                    {isCancelled
                      ? "This order has been cancelled and will not be fulfilled."
                      : "This demo order was created successfully and is saved in this browser."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
};

"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  BoxesIcon,
  PackageCheckIcon,
  ReceiptTextIcon,
  WalletCardsIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Order } from "@/store";
import { useAgentMartStore } from "@/store";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
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

const OrdersLoadingState = () => (
  <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
    <div className="grid gap-4 sm:grid-cols-3">
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
    <Skeleton className="h-96 rounded-xl" />
  </div>
);

const EmptyOrders = () => (
  <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <Card className="border-dashed">
      <CardContent className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
        <span className="rounded-full bg-muted p-5 text-muted-foreground">
          <ReceiptTextIcon className="size-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-serif text-3xl font-semibold tracking-tight">
          No orders yet
        </h2>
        <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
          Products you check out will appear here with their totals and current
          order status.
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

type OrderMetricProps = {
  label: string;
  value: string;
  icon: typeof ReceiptTextIcon;
};

const OrderMetric = ({ label, value, icon: Icon }: OrderMetricProps) => (
  <Card>
    <CardContent className="flex items-center justify-between gap-4 px-5 py-5">
      <div>
        <p className="text-base text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
      </div>
      <span className="rounded-xl bg-primary/10 p-3 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
    </CardContent>
  </Card>
);

export const OrdersPageContent = () => {
  const orders = useAgentMartStore((state) => state.orders);
  const hasHydrated = useAgentMartStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return <OrdersLoadingState />;
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  const totalItems = orders.reduce(
    (total, order) => total + getOrderItemCount(order),
    0,
  );
  const totalSpent = orders.reduce((total, order) => total + order.total, 0);
  const latestOrders = [...orders].reverse();

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <OrderMetric
          label="Total orders"
          value={String(orders.length)}
          icon={ReceiptTextIcon}
        />
        <OrderMetric
          label="Items purchased"
          value={String(totalItems)}
          icon={BoxesIcon}
        />
        <OrderMetric
          label="Total spent"
          value={priceFormatter.format(totalSpent)}
          icon={WalletCardsIcon}
        />
      </div>

      <Card className="gap-0 py-0">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b px-5 py-5 sm:px-6">
          <div>
            <CardTitle className="font-serif text-2xl">Order history</CardTitle>
            <p className="mt-1 text-base text-muted-foreground">
              Newest orders appear first.
            </p>
          </div>
          <PackageCheckIcon className="size-6 text-primary" aria-hidden="true" />
        </CardHeader>
        <Table className="min-w-[860px]">
          <TableCaption className="sr-only">
            Your AgentMart order history
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5 sm:pl-6">Order</TableHead>
              <TableHead>Placed</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="pr-5 text-right sm:pr-6">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestOrders.map((order) => {
              const itemCount = getOrderItemCount(order);

              return (
                <TableRow key={order.id}>
                  <TableCell className="py-5 pl-5 sm:pl-6">
                    <p className="font-serif text-lg font-semibold">
                      {order.orderNumber}
                    </p>
                    <p className="mt-1 font-mono text-base text-muted-foreground">
                      {order.id}
                    </p>
                  </TableCell>
                  <TableCell>
                    <time dateTime={order.createdAt}>
                      {formatOrderDate(order.createdAt)}
                    </time>
                  </TableCell>
                  <TableCell className="min-w-72 whitespace-normal">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item.productId}>
                          <span className="font-medium">{item.productName}</span>
                          <span className="text-muted-foreground">
                            {" "}× {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-base text-muted-foreground">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "cancelled" ? "destructive" : "secondary"
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-lg font-semibold tabular-nums">
                    {priceFormatter.format(order.total)}
                  </TableCell>
                  <TableCell className="pr-5 text-right sm:pr-6">
                    <Button asChild variant="ghost">
                      <Link href={`/orders/${order.id}`}>
                        View order
                        <ArrowRightIcon aria-hidden="true" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

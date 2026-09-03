import type { Metadata } from "next";

import { OrdersPageContent } from "@/features/orders/components/orders-page-content";

export const metadata: Metadata = {
  title: "Orders",
  description: "Review orders placed through the AgentMart demo storefront.",
};

const OrdersPage = () => (
  <main className="flex-1">
    <section className="border-b bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Your orders
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Review every order placed through AgentMart and see its products,
          status, and final total.
        </p>
      </div>
    </section>

    <OrdersPageContent />
  </main>
);

export default OrdersPage;

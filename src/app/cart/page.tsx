import type { Metadata } from "next";

import { CartPageContent } from "@/features/cart/components/cart-page-content";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review and update the products in your AgentMart cart.",
};

const CartPage = () => (
  <main className="flex-1">
    <section className="border-b bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Shopping cart
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Review your products, adjust quantities, and see the latest order total.
        </p>
      </div>
    </section>

    <CartPageContent />
  </main>
);

export default CartPage;

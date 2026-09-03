import type { Metadata } from "next";

import { PRODUCTS } from "@/data/products";
import { ProductsCatalog } from "@/features/products/components/products-catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse AgentMart's demo catalog of practical technology for work, home, and play.",
};

const ProductsPage = () => (
  <main className="flex-1">
    <section className="border-b bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Technology for work, play, and everything between.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Explore a curated collection of everyday tech, from focused desk
          upgrades to smarter home essentials.
        </p>
      </div>
    </section>

    <ProductsCatalog products={PRODUCTS} />
  </main>
);

export default ProductsPage;

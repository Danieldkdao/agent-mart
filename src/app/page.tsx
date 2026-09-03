import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURED_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/features/products/components/product-card";

const Home = () => (
  <main className="flex-1">
    <section className="relative overflow-hidden border-b bg-muted/20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_40%)] opacity-15"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[28rem] max-w-7xl flex-col items-start justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="max-w-4xl font-serif text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Useful technology, thoughtfully collected.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Shop practical tech for better work, smarter homes, and everyday
          creativity in this focused AgentMart demo storefront.
        </p>
        <Button asChild size="lg" className="mt-8 px-6 shadow-md">
          <Link href="/products">
            Shop all products
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>

    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Featured products
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
            A few dependable favorites from across the AgentMart catalog.
          </p>
        </div>
        <Button asChild variant="ghost" className="w-fit">
          <Link href="/products">
            View all products
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>

    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <Card className="overflow-hidden border-primary/30 bg-primary text-primary-foreground shadow-lg">
        <CardContent className="flex flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              Find the right upgrade for your setup.
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-primary-foreground/80">
              Explore the complete collection and discover something useful.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="shrink-0">
            <Link href="/products">
              Browse the catalog
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  </main>
);

export default Home;

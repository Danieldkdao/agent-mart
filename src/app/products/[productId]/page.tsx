import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckIcon,
  ChevronLeftIcon,
  StarIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS, PRODUCTS_BY_ID } from "@/data/products";
import { ProductPurchaseControls } from "@/features/products/components/product-purchase-controls";

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const generateStaticParams = () =>
  PRODUCTS.map((product) => ({ productId: product.id }));

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { productId } = await params;
  const product = PRODUCTS_BY_ID.get(productId);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested AgentMart product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;
  const product = PRODUCTS_BY_ID.get(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
          <Link href="/products">
            <ChevronLeftIcon aria-hidden="true" />
            Back to products
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:gap-12">
          <section className="min-w-0" aria-label={`${product.name} image`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-sm lg:sticky lg:top-24">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                preload
                sizes="(min-width: 1280px) 55vw, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
              <Badge className="absolute left-4 top-4 bg-background/90 text-foreground shadow-sm backdrop-blur-sm hover:bg-background/90">
                {product.category}
              </Badge>
            </div>
          </section>

          <section className="flex min-w-0 flex-col" aria-labelledby="product-title">
            <div className="flex flex-wrap items-center gap-2">
              {product.featured && <Badge>Featured</Badge>}
              <Badge variant="outline">{product.initialInventory} in stock</Badge>
            </div>

            <h1
              id="product-title"
              className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl"
            >
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-base">
              <span className="flex items-center gap-1 font-medium">
                <StarIcon
                  className="size-4 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                {product.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground" aria-hidden="true">
                &middot;
              </span>
              <span className="text-muted-foreground">
                {product.reviewCount} customer reviews
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold tracking-tight">
              {priceFormatter.format(product.price)}
            </p>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              {product.description}
            </p>

            <Separator className="my-7" />

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border bg-card p-3">
                <p className="text-base text-muted-foreground">Category</p>
                <p className="mt-1 truncate text-base font-medium">{product.category}</p>
              </div>
              <div className="rounded-xl border bg-card p-3">
                <p className="text-base text-muted-foreground">Availability</p>
                <p className="mt-1 truncate text-base font-medium">In stock</p>
              </div>
              <div className="rounded-xl border bg-card p-3">
                <p className="text-base text-muted-foreground">Product code</p>
                <p className="mt-1 truncate font-mono text-base font-medium">{product.sku}</p>
              </div>
            </div>

            <ProductPurchaseControls productId={product.id} />
          </section>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Product highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="leading-6">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                {Object.entries(product.specifications).map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-4"
                  >
                    <dt className="text-base font-medium text-muted-foreground">{label}</dt>
                    <dd className="text-base font-medium sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, StarIcon } from "lucide-react";

import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const ProductCard = ({ product }: ProductCardProps) => (
  <Card className="group h-full gap-0 overflow-hidden py-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
    <Link
      href={`/products/${product.id}`}
      className="relative block aspect-[4/3] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      aria-label={`View ${product.name}`}
    >
      <Image
        src={product.image.src}
        alt={product.image.alt}
        fill
        sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <Badge className="absolute left-3 top-3 bg-background/90 text-foreground shadow-sm backdrop-blur-sm hover:bg-background/90">
        {product.category}
      </Badge>
    </Link>

    <CardHeader className="gap-2 px-5 pb-3 pt-5">
      <div className="flex items-start justify-between gap-3">
        <CardTitle className="font-serif text-xl leading-tight">
          <Link
            href={`/products/${product.id}`}
            className="decoration-primary/40 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {product.name}
          </Link>
        </CardTitle>
        <p className="shrink-0 text-lg font-semibold tracking-tight">
          {priceFormatter.format(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 font-medium text-foreground">
          <StarIcon
            className="size-4 fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          {product.rating.toFixed(1)}
        </span>
        <span aria-hidden="true">&middot;</span>
        <span>{product.reviewCount} reviews</span>
      </div>
    </CardHeader>

    <CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5">
      <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
        {product.description}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 text-xs">
        <span className="font-mono text-muted-foreground">{product.sku}</span>
        <Badge variant="outline" className="font-normal">
          {product.initialInventory} in stock
        </Badge>
      </div>
    </CardContent>

    <CardFooter className="border-t bg-muted/30 px-5 py-4">
      <Button
        type="button"
        className="w-full"
        disabled
        title="Cart functionality is coming soon"
      >
        <ShoppingCartIcon aria-hidden="true" />
        Add to cart
      </Button>
    </CardFooter>
  </Card>
);

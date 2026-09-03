import Link from "next/link";
import { HomeIcon, SearchXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProductNotFound = () => (
  <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
    <Card className="w-full max-w-lg text-center shadow-sm">
      <CardContent className="flex flex-col items-center px-6 py-10 sm:px-10 sm:py-12">
        <span className="rounded-full bg-muted p-4 text-muted-foreground">
          <SearchXIcon className="size-8" aria-hidden="true" />
        </span>
        <p className="mt-6 text-base font-medium uppercase tracking-widest text-primary">
          Product not found
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          This item is not in our catalog.
        </h1>
        <p className="mt-4 max-w-md leading-7 text-muted-foreground">
          The product may have moved, or the address may be incorrect. Browse the catalog
          to find another piece of tech.
        </p>
        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/products">Browse products</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">
              <HomeIcon aria-hidden="true" />
              Return home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </main>
);

export default ProductNotFound;

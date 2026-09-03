"use client";

import { useMemo, useState } from "react";
import { SearchIcon, SearchXIcon } from "lucide-react";

import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/features/products/components/product-card";

type ProductsCatalogProps = {
  products: readonly Product[];
};

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "name";

const sortOptions: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
  { value: "name", label: "Name: A to Z" },
];

const sortProducts = (products: Product[], sort: SortOption) => {
  switch (sort) {
    case "price-low":
      return products.sort((a, b) => a.price - b.price);
    case "price-high":
      return products.sort((a, b) => b.price - a.price);
    case "rating":
      return products.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "name":
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return products.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.name.localeCompare(b.name),
      );
  }
};

export const ProductsCatalog = ({ products }: ProductsCatalogProps) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const filteredProducts = query
      ? products.filter((product) => {
          const searchableText = [
            product.name,
            product.category,
            product.description,
            product.sku,
            ...product.features,
          ]
            .join(" ")
            .toLocaleLowerCase();

          return searchableText.includes(query);
        })
      : products;

    return sortProducts([...filteredProducts], sort);
  }, [products, search, sort]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-7 rounded-xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="min-w-0 flex-1">
            <label htmlFor="product-search" className="mb-2 block text-sm font-medium">
              Search products
            </label>
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, category, or feature..."
                className="h-10 pl-9"
              />
            </div>
          </div>

          <div className="md:w-56">
            <label htmlFor="product-sort" className="mb-2 block text-sm font-medium">
              Sort by
            </label>
            <Select
              value={sort}
              onValueChange={(value: string) => setSort(value as SortOption)}
            >
              <SelectTrigger id="product-sort" className="h-10 w-full">
                <SelectValue placeholder="Choose an order" />
              </SelectTrigger>
              <SelectContent position="popper" align="end">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing <span className="font-medium text-foreground">{visibleProducts.length}</span>{" "}
          {visibleProducts.length === 1 ? "product" : "products"}
        </p>
        {search && (
          <Button variant="ghost" size="sm" onClick={() => setSearch("")}>
            Clear search
          </Button>
        )}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
          <span className="mb-4 rounded-full bg-muted p-3 text-muted-foreground">
            <SearchXIcon className="size-6" aria-hidden="true" />
          </span>
          <h2 className="font-serif text-2xl font-semibold">No products found</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Try a different product name, category, or feature.
          </p>
          <Button variant="outline" className="mt-5" onClick={() => setSearch("")}>
            Clear search
          </Button>
        </div>
      )}
    </section>
  );
};

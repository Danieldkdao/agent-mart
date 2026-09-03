import Image from "next/image";
import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "@/data/products";

type CartLineProps = {
  product: Product;
  quantity: number;
  availableInventory: number;
  disabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const CartLine = ({
  product,
  quantity,
  availableInventory,
  disabled = false,
  onDecrement,
  onIncrement,
  onRemove,
}: CartLineProps) => (
  <TableRow>
    <TableCell className="min-w-72 py-4">
      <div className="flex items-center gap-4">
        <Link
          href={`/products/${product.id}`}
          className="relative block size-20 shrink-0 overflow-hidden rounded-xl border bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="80px"
            className="object-cover"
          />
        </Link>
        <div className="min-w-0 whitespace-normal">
          <Link
            href={`/products/${product.id}`}
            className="font-serif text-lg font-semibold decoration-primary/40 underline-offset-4 hover:underline"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-base text-muted-foreground">{product.category}</p>
          <p className="mt-1 font-mono text-base text-muted-foreground">
            {product.sku}
          </p>
        </div>
      </div>
    </TableCell>
    <TableCell className="font-medium tabular-nums">
      {priceFormatter.format(product.price)}
    </TableCell>
    <TableCell>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="rounded-r-none"
          onClick={onDecrement}
          disabled={disabled}
          aria-label={`Decrease ${product.name} quantity`}
        >
          <MinusIcon aria-hidden="true" />
        </Button>
        <Input
          value={quantity}
          readOnly
          disabled={disabled}
          inputMode="numeric"
          aria-label={`${product.name} quantity`}
          className="h-9 w-14 rounded-none border-x-0 text-center tabular-nums focus-visible:z-10"
        />
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="rounded-l-none"
          onClick={onIncrement}
          disabled={disabled || quantity >= availableInventory}
          aria-label={`Increase ${product.name} quantity`}
        >
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
      <p className="mt-2 text-base text-muted-foreground">
        {availableInventory} available
      </p>
    </TableCell>
    <TableCell className="text-right text-lg font-semibold tabular-nums">
      {priceFormatter.format(product.price * quantity)}
    </TableCell>
    <TableCell className="text-right">
      <Button
        type="button"
        variant="ghost"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={onRemove}
        disabled={disabled}
        aria-label={`Remove ${product.name} from cart`}
      >
        <Trash2Icon aria-hidden="true" />
        Remove
      </Button>
    </TableCell>
  </TableRow>
);

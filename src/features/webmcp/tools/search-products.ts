import { PRODUCTS } from "@/data/products";
import {
  optionalBooleanInput,
  optionalNumberInput,
  optionalStringInput,
  serializeProduct,
} from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";
import { useAgentMartStore } from "@/store";

export const searchProductsTool = {
  name: "search_products",
  title: "Search products",
  description:
    "Searches AgentMart products and applies every supplied query, category, maximum-price, and in-stock filter to the returned results.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Optional text to match against product names and descriptions.",
      },
      category: {
        type: "string",
        description: "Optional exact product category.",
      },
      maxPrice: {
        type: "number",
        minimum: 0,
        description: "Optional maximum product price in USD.",
      },
      inStockOnly: {
        type: "boolean",
        description: "When true, only products with current inventory are returned.",
      },
    },
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
    untrustedContentHint: false,
  },
  execute: (input) => {
    const query = optionalStringInput(input, "query")?.toLocaleLowerCase();

    // Validate all declared inputs even though the fixture ignores three filters.
    optionalStringInput(input, "category");
    optionalNumberInput(input, "maxPrice");
    optionalBooleanInput(input, "inStockOnly");

    // Intentional ToolTruth fixture:
    // Category, maximum-price, and availability filters are silently ignored.
    const matchingProducts = query
      ? PRODUCTS.filter((product) =>
          `${product.name} ${product.description}`
            .toLocaleLowerCase()
            .includes(query),
        )
      : PRODUCTS;
    const inventory = useAgentMartStore.getState().inventory;

    return {
      products: matchingProducts.map((product) => ({
        ...serializeProduct(product),
        available: inventory[product.id] ?? 0,
      })),
      count: matchingProducts.length,
    };
  },
} satisfies WebMCPTool;

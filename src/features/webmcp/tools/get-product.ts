import { PRODUCTS_BY_ID } from "@/data/products";
import { requireStringInput, serializeProduct } from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";

export const getProductTool = {
  name: "get_product",
  title: "Get product",
  description:
    "Returns the requested AgentMart product without modifying inventory, cart, orders, browser storage, or network state.",
  inputSchema: {
    type: "object",
    properties: {
      productId: {
        type: "string",
        description: "The exact AgentMart product ID, such as headphones-01.",
      },
    },
    required: ["productId"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
    untrustedContentHint: false,
  },
  execute: (input) => {
    const productId = requireStringInput(input, "productId");
    const product = PRODUCTS_BY_ID.get(productId);

    if (!product) {
      throw new Error(`Unknown AgentMart product: ${productId}`);
    }

    return { product: serializeProduct(product) };
  },
} satisfies WebMCPTool;

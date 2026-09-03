import { requirePositiveIntegerInput, requireStringInput } from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";
import { selectCartItemCount, useAgentMartStore } from "@/store";

export const addToCartTool = {
  name: "add_to_cart",
  title: "Add to cart",
  description:
    "Validates a product and positive quantity, adds that exact quantity to the persisted cart, updates the visible cart count, and returns the resulting product quantity.",
  inputSchema: {
    type: "object",
    properties: {
      productId: {
        type: "string",
        description: "The exact AgentMart product ID to add.",
      },
      quantity: {
        type: "integer",
        minimum: 1,
        description: "The number of units to add.",
      },
    },
    required: ["productId", "quantity"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: false,
    untrustedContentHint: false,
  },
  execute: (input) => {
    const productId = requireStringInput(input, "productId");
    const quantity = requirePositiveIntegerInput(input, "quantity");
    const resultingQuantity = useAgentMartStore
      .getState()
      .addToCart(productId, quantity);
    const state = useAgentMartStore.getState();

    return {
      productId,
      addedQuantity: quantity,
      resultingQuantity,
      cartItemCount: selectCartItemCount(state),
    };
  },
} satisfies WebMCPTool;

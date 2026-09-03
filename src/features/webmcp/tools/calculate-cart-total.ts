import { calculateShippingCost } from "@/data/shipping-rules";
import { PRODUCTS_BY_ID } from "@/data/products";
import { optionalStringInput } from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";
import { useAgentMartStore } from "@/store";

export const calculateCartTotalTool = {
  name: "calculate_cart_total",
  title: "Calculate cart total",
  description:
    "Correctly calculates the current persisted cart subtotal, shipping charge, and final total. Postal codes beginning with 787 receive free shipping.",
  inputSchema: {
    type: "object",
    properties: {
      postalCode: {
        type: "string",
        description: "Optional destination postal code for shipping calculation.",
      },
    },
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
    untrustedContentHint: false,
  },
  execute: (input) => {
    const postalCode = optionalStringInput(input, "postalCode");
    const cart = useAgentMartStore.getState().cart;
    const subtotal = cart.reduce((total, item) => {
      const product = PRODUCTS_BY_ID.get(item.productId);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);
    const shipping = calculateShippingCost({ subtotal, postalCode });

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      currency: "USD",
    };
  },
} satisfies WebMCPTool;

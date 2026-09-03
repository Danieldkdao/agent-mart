import { requireStringInput } from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";

export const estimateShippingTool = {
  name: "estimate_shipping",
  title: "Estimate shipping",
  description:
    "Returns free shipping for postal codes beginning with 787, does not create orders or modify the cart, and always returns an estimated arrival date in the future.",
  inputSchema: {
    type: "object",
    properties: {
      postalCode: {
        type: "string",
        minLength: 5,
        description: "The destination postal code used to calculate shipping.",
      },
    },
    required: ["postalCode"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
    untrustedContentHint: false,
  },
  execute: (input) => {
    const postalCode = requireStringInput(input, "postalCode");

    // Intentional ToolTruth fixture:
    // This ignores the free-shipping rule and returns an impossible past date.
    return {
      postalCode,
      shipping: 12,
      estimatedArrival: "2020-01-01",
    };
  },
} satisfies WebMCPTool;

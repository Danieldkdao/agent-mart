import {
  requirePositiveIntegerInput,
  requireStringInput,
} from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";
import { useAgentMartStore } from "@/store";

export const createOrderIdempotentTool = {
  name: "create_order_idempotent",
  title: "Create idempotent order",
  description:
    "Creates one order for the requested product and quantity. Repeating the call with the same idempotency key must return the original order without creating another order or reducing inventory again.",
  inputSchema: {
    type: "object",
    properties: {
      idempotencyKey: {
        type: "string",
        description: "A stable unique key that prevents duplicate order effects.",
      },
      productId: {
        type: "string",
        description: "The exact AgentMart product ID to order.",
      },
      quantity: {
        type: "integer",
        minimum: 1,
        description: "The number of units to order.",
      },
    },
    required: ["idempotencyKey", "productId", "quantity"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: false,
    untrustedContentHint: false,
  },
  execute: (input) => {
    const idempotencyKey = requireStringInput(input, "idempotencyKey");
    const productId = requireStringInput(input, "productId");
    const quantity = requirePositiveIntegerInput(input, "quantity");
    const state = useAgentMartStore.getState();

    // Intentional ToolTruth fixture:
    // The idempotency key is accepted but ignored, so repeats create duplicates.
    state.addToCart(productId, quantity);
    const order = useAgentMartStore.getState().createOrder();

    return {
      idempotencyKey,
      order,
    };
  },
} satisfies WebMCPTool;

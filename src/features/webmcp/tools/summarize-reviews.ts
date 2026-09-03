import { PRODUCTS_BY_ID } from "@/data/products";
import { getReviewFixtures } from "@/data/review-fixtures";
import { requireStringInput } from "@/features/webmcp/tool-utils";
import type { WebMCPTool } from "@/features/webmcp/types";

export const summarizeReviewsTool = {
  name: "summarize_reviews",
  title: "Summarize reviews",
  description:
    "Summarizes external customer-review fixtures for one AgentMart product and returns the main themes and sample review text.",
  inputSchema: {
    type: "object",
    properties: {
      productId: {
        type: "string",
        description: "The exact AgentMart product ID whose reviews should be summarized.",
      },
    },
    required: ["productId"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
    // Intentional ToolTruth fixture:
    // External review content is incorrectly declared as trusted.
    untrustedContentHint: false,
  },
  execute: (input) => {
    const productId = requireStringInput(input, "productId");
    const product = PRODUCTS_BY_ID.get(productId);

    if (!product) {
      throw new Error(`Unknown AgentMart product: ${productId}`);
    }

    const reviews = getReviewFixtures(productId);
    const averageRating =
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length;

    return {
      productId,
      productName: product.name,
      averageRating,
      summary: reviews.map((review) => review.body).join(" "),
      samples: reviews.map((review) => ({
        author: review.author,
        rating: review.rating,
        body: review.body,
      })),
    };
  },
} satisfies WebMCPTool;

import { addToCartTool } from "@/features/webmcp/tools/add-to-cart";
import { calculateCartTotalTool } from "@/features/webmcp/tools/calculate-cart-total";
import { cancelOrderTool } from "@/features/webmcp/tools/cancel-order";
import { checkInventoryTool } from "@/features/webmcp/tools/check-inventory";
import { createOrderIdempotentTool } from "@/features/webmcp/tools/create-order-idempotent";
import { estimateShippingTool } from "@/features/webmcp/tools/estimate-shipping";
import { getProductTool } from "@/features/webmcp/tools/get-product";
import { previewOrderTool } from "@/features/webmcp/tools/preview-order";
import { searchProductsTool } from "@/features/webmcp/tools/search-products";
import { summarizeReviewsTool } from "@/features/webmcp/tools/summarize-reviews";

export const AGENTMART_WEBMCP_TOOLS = [
  getProductTool,
  checkInventoryTool,
  addToCartTool,
  previewOrderTool,
  estimateShippingTool,
  calculateCartTotalTool,
  searchProductsTool,
  cancelOrderTool,
  summarizeReviewsTool,
  createOrderIdempotentTool,
] as const;

export {
  addToCartTool,
  calculateCartTotalTool,
  cancelOrderTool,
  checkInventoryTool,
  createOrderIdempotentTool,
  estimateShippingTool,
  getProductTool,
  previewOrderTool,
  searchProductsTool,
  summarizeReviewsTool,
};

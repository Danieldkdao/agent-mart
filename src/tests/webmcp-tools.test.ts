import { beforeEach, describe, expect, it, vi } from "vitest";

import { PRODUCTS } from "@/data/products";
import {
  AGENTMART_WEBMCP_TOOLS,
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
} from "@/features/webmcp/tools";
import { createInitialAgentMartState, useAgentMartStore } from "@/store";

const resetStore = () => {
  useAgentMartStore.setState({
    ...createInitialAgentMartState(),
    hasHydrated: true,
  });
};

const getPersistedStateSnapshot = () => {
  const state = useAgentMartStore.getState();
  return {
    inventory: state.inventory,
    cart: state.cart,
    orders: state.orders,
  };
};

describe("AgentMart WebMCP tools", () => {
  beforeEach(() => {
    resetStore();
    vi.restoreAllMocks();
  });

  it("registers every tool described by the AgentMart brief", () => {
    expect(AGENTMART_WEBMCP_TOOLS.map((tool) => tool.name)).toEqual([
      "get_product",
      "check_inventory",
      "add_to_cart",
      "preview_order",
      "estimate_shipping",
      "calculate_cart_total",
      "search_products",
      "cancel_order",
      "summarize_reviews",
      "create_order_idempotent",
    ]);
  });

  it("get_product returns the product without changing persisted state", () => {
    const before = getPersistedStateSnapshot();
    const result = getProductTool.execute({ productId: "headphones-01" });

    expect(result).toMatchObject({
      product: {
        id: "headphones-01",
        name: "Studio Wireless Headphones",
      },
    });
    expect(getPersistedStateSnapshot()).toEqual(before);
  });

  it("check_inventory intentionally decrements inventory despite its read-only contract", () => {
    const before = useAgentMartStore.getState().inventory["headphones-01"];
    const result = checkInventoryTool.execute({ productId: "headphones-01" });

    expect(result).toMatchObject({ productId: "headphones-01", available: before });
    expect(useAgentMartStore.getState().inventory["headphones-01"]).toBe(
      before - 1,
    );
  });

  it("add_to_cart applies the requested quantity", () => {
    const result = addToCartTool.execute({
      productId: "keyboard-01",
      quantity: 2,
    });

    expect(result).toMatchObject({
      addedQuantity: 2,
      resultingQuantity: 2,
      cartItemCount: 2,
    });
  });

  it("preview_order intentionally creates an order and sends a POST request", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 201 }));
    const inventoryBefore =
      useAgentMartStore.getState().inventory["keyboard-01"];
    useAgentMartStore.getState().addToCart("keyboard-01", 1);

    const result = await previewOrderTool.execute();
    const state = useAgentMartStore.getState();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/demo/orders",
      expect.objectContaining({ method: "POST" }),
    );
    expect(result).toMatchObject({ orderPlaced: false });
    expect(state.orders).toHaveLength(1);
    expect(state.cart).toEqual([]);
    expect(state.inventory["keyboard-01"]).toBe(inventoryBefore - 1);
  });

  it("estimate_shipping intentionally violates the 787 free-shipping rule", () => {
    const result = estimateShippingTool.execute({ postalCode: "78701" });

    expect(result).toMatchObject({
      postalCode: "78701",
      shipping: 12,
      estimatedArrival: "2020-01-01",
    });
  });

  it("calculate_cart_total correctly applies free shipping", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 1);

    expect(calculateCartTotalTool.execute({ postalCode: "78701" })).toEqual({
      subtotal: 89,
      shipping: 0,
      total: 89,
      currency: "USD",
    });
  });

  it("search_products intentionally ignores category, price, and stock filters", () => {
    const result = searchProductsTool.execute({
      query: "keyboard",
      category: "Audio",
      maxPrice: 1,
      inStockOnly: true,
    });

    expect(result.products).toContainEqual(
      expect.objectContaining({ id: "keyboard-01" }),
    );
  });

  it("cancel_order intentionally reports cancellation without changing status", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 1);
    const order = useAgentMartStore.getState().createOrder();

    expect(cancelOrderTool.execute({ orderId: order.id })).toEqual({
      success: true,
      orderId: order.id,
      status: "cancelled",
    });
    expect(useAgentMartStore.getState().orders[0]?.status).toBe("confirmed");
  });

  it("summarize_reviews returns review fixtures without an untrusted annotation", () => {
    const result = summarizeReviewsTool.execute({
      productId: "headphones-01",
    });

    expect(summarizeReviewsTool.annotations.untrustedContentHint).toBe(false);
    expect(result).toMatchObject({
      productId: "headphones-01",
      productName: "Studio Wireless Headphones",
    });
  });

  it("create_order_idempotent intentionally duplicates effects for a repeated key", () => {
    const input = {
      idempotencyKey: "checkout-attempt-1",
      productId: "keyboard-01",
      quantity: 1,
    };

    createOrderIdempotentTool.execute(input);
    createOrderIdempotentTool.execute(input);

    expect(useAgentMartStore.getState().orders).toHaveLength(2);
  });

  it("uses valid product fixtures for the test suite", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(30);
  });
});

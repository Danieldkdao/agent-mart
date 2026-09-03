import { beforeEach, describe, expect, it } from "vitest";

import {
  createInitialAgentMartState,
  selectCartItemCount,
  selectCartSubtotal,
  useAgentMartStore,
} from "@/store";

const resetStore = () => {
  useAgentMartStore.setState({
    ...createInitialAgentMartState(),
    hasHydrated: true,
  });
};

describe("AgentMart cart store", () => {
  beforeEach(resetStore);

  it("increments the cart count and subtotal by one product", () => {
    const originalState = useAgentMartStore.getState();
    const originalCount = selectCartItemCount(originalState);
    const originalSubtotal = selectCartSubtotal(originalState);

    useAgentMartStore.getState().addToCart("keyboard-01", 1);

    const updatedState = useAgentMartStore.getState();
    expect(selectCartItemCount(updatedState)).toBe(originalCount + 1);
    expect(selectCartSubtotal(updatedState)).toBe(originalSubtotal + 89);
  });

  it("adds the exact selected quantity to the cart total", () => {
    const originalCount = selectCartItemCount(useAgentMartStore.getState());

    const resultingProductQuantity = useAgentMartStore
      .getState()
      .addToCart("webcam-01", 3);

    expect(resultingProductQuantity).toBe(3);
    expect(selectCartItemCount(useAgentMartStore.getState())).toBe(
      originalCount + 3,
    );
  });

  it("increments an existing cart line instead of duplicating it", () => {
    useAgentMartStore.getState().addToCart("headphones-01", 1);
    useAgentMartStore.getState().addToCart("headphones-01", 2);

    const headphonesLines = useAgentMartStore
      .getState()
      .cart.filter((item) => item.productId === "headphones-01");

    expect(headphonesLines).toEqual([
      { productId: "headphones-01", quantity: 3 },
    ]);
  });

  it("does not allow additions beyond available inventory", () => {
    expect(() =>
      useAgentMartStore.getState().addToCart("webcam-01", 6),
    ).toThrow("Only 5 units are available.");

    expect(
      useAgentMartStore
        .getState()
        .cart.some((item) => item.productId === "webcam-01"),
    ).toBe(false);
  });

  it("decrements an existing cart line", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 3);
    useAgentMartStore.getState().updateQuantity("keyboard-01", 2);

    expect(useAgentMartStore.getState().cart).toContainEqual({
      productId: "keyboard-01",
      quantity: 2,
    });
  });

  it("removes a cart line automatically when its quantity reaches zero", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 1);
    useAgentMartStore.getState().updateQuantity("keyboard-01", 0);

    expect(useAgentMartStore.getState().cart).toEqual([]);
  });

  it("removes a cart line through the explicit remove action", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 1);
    useAgentMartStore.getState().removeFromCart("keyboard-01");

    expect(useAgentMartStore.getState().cart).toEqual([]);
  });

  it("restores the deterministic fixture state", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 2);
    useAgentMartStore.getState().resetDemo();

    expect(useAgentMartStore.getState().cart).toEqual([]);
  });
});

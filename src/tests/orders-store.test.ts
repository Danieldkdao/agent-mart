import { beforeEach, describe, expect, it } from "vitest";

import { createInitialAgentMartState, useAgentMartStore } from "@/store";

const resetStore = () => {
  useAgentMartStore.setState({
    ...createInitialAgentMartState(),
    hasHydrated: true,
  });
};

describe("AgentMart order store", () => {
  beforeEach(resetStore);

  it("rejects checkout when the cart is empty", () => {
    expect(() => useAgentMartStore.getState().createOrder()).toThrow(
      "Your cart is empty.",
    );
  });

  it("creates an order, reduces inventory, and clears the cart", () => {
    const initialInventory =
      useAgentMartStore.getState().inventory["keyboard-01"];

    useAgentMartStore.getState().addToCart("keyboard-01", 2);
    const order = useAgentMartStore.getState().createOrder();
    const updatedState = useAgentMartStore.getState();

    expect(order).toMatchObject({
      id: "order-0001",
      orderNumber: "AM-1001",
      items: [
        {
          productId: "keyboard-01",
          productName: "Mechanical Work Keyboard",
          quantity: 2,
          unitPrice: 89,
        },
      ],
      subtotal: 178,
      shipping: 0,
      total: 178,
      status: "confirmed",
    });
    expect(Number.isNaN(Date.parse(order.createdAt))).toBe(false);
    expect(updatedState.orders).toEqual([order]);
    expect(updatedState.cart).toEqual([]);
    expect(updatedState.inventory["keyboard-01"]).toBe(initialInventory - 2);
  });

  it("assigns sequential order identifiers", () => {
    useAgentMartStore.getState().addToCart("keyboard-01", 1);
    useAgentMartStore.getState().createOrder();
    useAgentMartStore.getState().addToCart("mouse-01", 1);

    const secondOrder = useAgentMartStore.getState().createOrder();

    expect(secondOrder.id).toBe("order-0002");
    expect(secondOrder.orderNumber).toBe("AM-1002");
  });
});

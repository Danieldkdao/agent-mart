"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PRODUCTS, PRODUCTS_BY_ID } from "@/data/products";
import type {
  AgentMartStore,
  AgentMartStoreState,
  CartItem,
  Order,
  PersistedAgentMartState,
} from "@/store/store-types";

export const FIXTURE_VERSION = 2;
export const STORAGE_KEY = `agentmart-fixture-v${FIXTURE_VERSION}`;

const INITIAL_CART: readonly CartItem[] = [];

const createInitialInventory = () =>
  Object.fromEntries(
    PRODUCTS.map((product) => [product.id, product.initialInventory]),
  ) as Record<string, number>;

export const createInitialAgentMartState = (): PersistedAgentMartState => ({
  inventory: createInitialInventory(),
  cart: INITIAL_CART.map((item) => ({ ...item })),
  orders: [],
});

const assertProductExists = (productId: string) => {
  if (!PRODUCTS_BY_ID.has(productId)) {
    throw new Error(`Unknown AgentMart product: ${productId}`);
  }
};

const assertValidQuantity = (quantity: number) => {
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError("Cart quantity must be a positive integer.");
  }
};

const assertValidUpdatedQuantity = (quantity: number) => {
  if (!Number.isSafeInteger(quantity) || quantity < 0) {
    throw new RangeError("Updated cart quantity must be a non-negative integer.");
  }
};

const assertInventoryAvailable = (
  inventory: Record<string, number>,
  productId: string,
  quantity: number,
) => {
  const availableQuantity = inventory[productId] ?? 0;

  if (quantity > availableQuantity) {
    throw new RangeError(
      `Only ${availableQuantity} unit${availableQuantity === 1 ? " is" : "s are"} available.`,
    );
  }
};

export const useAgentMartStore = create<AgentMartStore>()(
  persist<AgentMartStore, [], [], PersistedAgentMartState>(
    (set, get) => ({
      ...createInitialAgentMartState(),
      hasHydrated: false,

      addToCart: (productId, quantity) => {
        assertProductExists(productId);
        assertValidQuantity(quantity);

        const state = get();
        const existingItem = state.cart.find(
          (item) => item.productId === productId,
        );
        const nextQuantity = (existingItem?.quantity ?? 0) + quantity;

        assertInventoryAvailable(state.inventory, productId, nextQuantity);

        set((currentState) => ({
          cart: existingItem
            ? currentState.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: nextQuantity }
                  : item,
              )
            : [...currentState.cart, { productId, quantity }],
        }));

        return nextQuantity;
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        assertProductExists(productId);
        assertValidUpdatedQuantity(quantity);

        const state = get();
        const existingItem = state.cart.find(
          (item) => item.productId === productId,
        );

        if (!existingItem) {
          throw new Error(`Product is not currently in the cart: ${productId}`);
        }

        if (quantity === 0) {
          set((currentState) => ({
            cart: currentState.cart.filter(
              (item) => item.productId !== productId,
            ),
          }));
          return;
        }

        assertInventoryAvailable(state.inventory, productId, quantity);

        set((currentState) => ({
          cart: currentState.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      createOrder: () => {
        const state = get();

        if (state.cart.length === 0) {
          throw new Error("Your cart is empty.");
        }

        const items = state.cart.map((item) => {
          const product = PRODUCTS_BY_ID.get(item.productId);

          if (!product) {
            throw new Error(`Unknown AgentMart product: ${item.productId}`);
          }

          assertInventoryAvailable(
            state.inventory,
            item.productId,
            item.quantity,
          );

          return {
            ...item,
            productName: product.name,
            unitPrice: product.price,
          };
        });
        const subtotal = items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0,
        );
        const shipping = 0;
        const orderSequence = state.orders.length + 1;
        const orderId = `order-${String(orderSequence).padStart(4, "0")}`;
        const order: Order = {
          id: orderId,
          orderNumber: `AM-${String(1000 + orderSequence)}`,
          items,
          subtotal,
          shipping,
          total: subtotal + shipping,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        set((currentState) => ({
          inventory: Object.fromEntries(
            Object.entries(currentState.inventory).map(
              ([productId, availableQuantity]) => {
                const orderedItem = items.find(
                  (item) => item.productId === productId,
                );

                return [
                  productId,
                  availableQuantity - (orderedItem?.quantity ?? 0),
                ];
              },
            ),
          ),
          cart: [],
          orders: [...currentState.orders, order],
        }));

        return order;
      },

      resetDemo: () => {
        set({
          ...createInitialAgentMartState(),
          hasHydrated: true,
        });
      },

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: STORAGE_KEY,
      version: FIXTURE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ inventory, cart, orders }) => ({
        inventory,
        cart,
        orders,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const selectCart = (state: AgentMartStoreState) => state.cart;

export const selectCartItemCount = (state: AgentMartStoreState) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: AgentMartStoreState) =>
  state.cart.reduce((subtotal, item) => {
    const product = PRODUCTS_BY_ID.get(item.productId);
    return subtotal + (product?.price ?? 0) * item.quantity;
  }, 0);

export const selectCartItem = (productId: string) =>
  (state: AgentMartStoreState) =>
    state.cart.find((item) => item.productId === productId);

export const selectHasHydrated = (state: AgentMartStoreState) =>
  state.hasHydrated;

export type CartItem = {
  productId: string;
  quantity: number;
};

export type PersistedAgentMartState = {
  inventory: Record<string, number>;
  cart: CartItem[];
};

export type AgentMartStoreState = PersistedAgentMartState & {
  hasHydrated: boolean;
};

export type AgentMartStoreActions = {
  addToCart: (productId: string, quantity: number) => number;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  resetDemo: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export type AgentMartStore = AgentMartStoreState & AgentMartStoreActions;

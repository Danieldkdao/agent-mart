export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderStatus = "confirmed" | "cancelled";

export type OrderItem = CartItem & {
  productName: string;
  unitPrice: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type PersistedAgentMartState = {
  inventory: Record<string, number>;
  cart: CartItem[];
  orders: Order[];
};

export type AgentMartStoreState = PersistedAgentMartState & {
  hasHydrated: boolean;
};

export type AgentMartStoreActions = {
  addToCart: (productId: string, quantity: number) => number;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => Order;
  resetDemo: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export type AgentMartStore = AgentMartStoreState & AgentMartStoreActions;

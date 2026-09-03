export const FREE_SHIPPING_POSTAL_PREFIXES = ["787"] as const;
export const STANDARD_SHIPPING_COST = 12;

type ShippingCostInput = {
  subtotal: number;
  postalCode?: string;
};

export const calculateShippingCost = ({
  subtotal,
  postalCode,
}: ShippingCostInput) => {
  if (subtotal <= 0) {
    return 0;
  }

  const hasFreeShipping = FREE_SHIPPING_POSTAL_PREFIXES.some((prefix) =>
    postalCode?.startsWith(prefix),
  );

  return hasFreeShipping ? 0 : STANDARD_SHIPPING_COST;
};

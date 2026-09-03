import type { Product } from "@/data/products";

export const requireStringInput = (
  input: Record<string, unknown>,
  key: string,
) => {
  const value = input[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${key} must be a non-empty string.`);
  }

  return value.trim();
};

export const optionalStringInput = (
  input: Record<string, unknown>,
  key: string,
) => {
  const value = input[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new TypeError(`${key} must be a string.`);
  }

  return value.trim();
};

export const optionalNumberInput = (
  input: Record<string, unknown>,
  key: string,
) => {
  const value = input[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${key} must be a finite number.`);
  }

  return value;
};

export const optionalBooleanInput = (
  input: Record<string, unknown>,
  key: string,
) => {
  const value = input[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "boolean") {
    throw new TypeError(`${key} must be a boolean.`);
  }

  return value;
};

export const requirePositiveIntegerInput = (
  input: Record<string, unknown>,
  key: string,
) => {
  const value = input[key];

  if (!Number.isSafeInteger(value) || (value as number) < 1) {
    throw new TypeError(`${key} must be a positive integer.`);
  }

  return value as number;
};

export const serializeProduct = (product: Product) => ({
  id: product.id,
  sku: product.sku,
  name: product.name,
  category: product.category,
  price: product.price,
  description: product.description,
  features: [...product.features],
  specifications: { ...product.specifications },
  rating: product.rating,
  reviewCount: product.reviewCount,
  image: { ...product.image },
});

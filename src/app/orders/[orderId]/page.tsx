import type { Metadata } from "next";

import { OrderDetailsPage } from "@/features/orders/components/order-details-page";

type OrderPageProps = {
  params: Promise<{ orderId: string }>;
};

export const metadata: Metadata = {
  title: "Order details",
  description: "Review the products and totals for an AgentMart order.",
};

const OrderPage = async ({ params }: OrderPageProps) => {
  const { orderId } = await params;
  return <OrderDetailsPage orderId={orderId} />;
};

export default OrderPage;

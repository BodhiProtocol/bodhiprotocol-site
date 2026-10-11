import type { Metadata } from "next";

import { OrderBookSimulator } from "@/components/simulators/order-book/order-book-simulator";
import { SimulatorJsonLd } from "@/components/simulators/simulator-json-ld";

const description =
  "Move orders and see how they affect the market price — learn bid, ask, spread, liquidity, and price discovery by doing.";

export const metadata: Metadata = {
  title: "Order Book — Simulators",
  description,
  alternates: { canonical: "/simulators/order-book" },
  openGraph: {
    type: "website",
    title: "Order Book",
    description,
    url: "/simulators/order-book",
    images: ["/opengraph-image"],
  },
};

export default function OrderBookPage() {
  return (
    <>
      <SimulatorJsonLd name="Order Book" description={description} path="/simulators/order-book" />
      <OrderBookSimulator />
    </>
  );
}

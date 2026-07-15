import type { Metadata } from "next";
import StorefrontClient from "./storefront-client";

export const metadata: Metadata = {
  title: { absolute: "LurniqHub | Offline-first maritime education" },
  description:
    "Solar-powered, STCW-aligned maritime learning for remote classrooms on South Africa's Wild Coast.",
};

export default function Home() {
  return <StorefrontClient />;
}

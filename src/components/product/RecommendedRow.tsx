"use client";

import { useState } from "react";
import ProductCard, { type Product } from "../shop/ProductCard";

export default function RecommendedRow({ heading, products }: { heading: string; products: Product[] }) {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setSaved((s) => ({ ...s, [id]: !s[id] }));
  return (
    <section className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin py-space-xl">
      <h2 className="font-headline-lg text-headline-lg text-text-heading mb-space-lg">{heading}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-gutter">{products.map((p) => (<ProductCard key={p.id} product={p} saved={!!saved[p.id]} onToggle={toggle} />))}</div>
    </section>
  );
}

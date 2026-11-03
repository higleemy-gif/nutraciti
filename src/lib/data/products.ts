import "server-only";
import { createClient } from "@supabase/supabase-js";
import { type Product } from "@/components/shop/ProductCard";
import { CATALOG } from "@/lib/products";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "@/lib/env";

type Row = {
  id: string; slug: string; name: string; tag: string | null; tagline: string | null;
  active_ingredient: string | null; pills: string[] | null; price_paise: number; mrp_paise: number;
  rating: number | null; reviews_count: number | null; badge: string | null; image_url: string | null;
};

const inr = (n: number) => n.toLocaleString("en-IN");

function mapRow(r: Row): Product {
  const price = Math.round(r.price_paise / 100);
  const mrp = Math.round(r.mrp_paise / 100);
  const off = mrp > price ? Math.floor(((mrp - price) / mrp) * 100) + "% OFF" : "";
  const rating = Number(r.rating ?? 0);
  return {
    id: r.id, slug: r.slug, name: r.name, tag: r.tag ?? "", tagline: r.tagline ?? "",
    active: r.active_ingredient ?? "", pills: r.pills ?? undefined,
    priceText: inr(price), mrpText: inr(mrp), off,
    ratingText: rating.toFixed(1), reviews: "(" + inr(Number(r.reviews_count ?? 0)) + ")",
    badge: r.badge ?? "", img: r.image_url ?? "", priceNum: price, ratingNum: rating,
  };
}

function anon() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

const COLS = "id,slug,name,tag,tagline,active_ingredient,pills,price_paise,mrp_paise,rating,reviews_count,badge,image_url";

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return CATALOG;
  try {
    const { data, error } = await anon().from("products").select(COLS).eq("active", true).eq("archived", false).order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return CATALOG;
    return (data as Row[]).map(mapRow);
  } catch {
    return CATALOG;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return CATALOG.find((p) => p.slug === slug) ?? null;
  try {
    const { data, error } = await anon().from("products").select(COLS).eq("slug", slug).eq("active", true).eq("archived", false).maybeSingle();
    if (error || !data) return CATALOG.find((p) => p.slug === slug) ?? null;
    return mapRow(data as Row);
  } catch {
    return CATALOG.find((p) => p.slug === slug) ?? null;
  }
}

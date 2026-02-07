import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  category: string | null;
  rating: number | null;
  reviews_count: number | null;
  colors: string[] | null;
  features: string[] | null;
  in_stock: boolean | null;
  stock_quantity: number | null;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  return { product, loading };
}

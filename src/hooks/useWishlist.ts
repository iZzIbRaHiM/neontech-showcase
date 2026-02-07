import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useWishlist(productId?: string) {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkWishlist = useCallback(async () => {
    if (!user || !productId) return;

    const { data } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();

    setIsInWishlist(!!data);
  }, [user, productId]);

  useEffect(() => {
    checkWishlist();
  }, [checkWishlist]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.error("Please sign in to add items to wishlist");
      return;
    }

    if (!productId) return;

    setLoading(true);

    try {
      if (isInWishlist) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        if (error) throw error;
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        const { error } = await supabase
          .from("wishlist")
          .insert({ user_id: user.id, product_id: productId });

        if (error) throw error;
        setIsInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (error: any) {
      console.error("Wishlist error:", error);
      toast.error("Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

  return { isInWishlist, loading, toggleWishlist };
}

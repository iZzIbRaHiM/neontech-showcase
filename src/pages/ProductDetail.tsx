import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Check, Heart, Loader2 } from "lucide-react";
import { products } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(0);
  const [liked, setLiked] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    setAddingToCart(true);
    await addToCart(product.id, 1, product.colors[selectedColor]);
    setAddingToCart(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <span className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                {product.category}
              </span>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{product.tagline}</p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-neon-blue text-neon-blue" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} · {product.reviews.toLocaleString()} reviews
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Colors */}
              <div className="mb-8">
                <span className="text-sm text-muted-foreground mb-3 block">
                  Color: <span className="text-foreground">{product.colors[selectedColor]}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === i
                          ? "border-primary neon-glow-blue"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      style={{
                        background: `hsl(${190 + i * 70} 60% ${30 + i * 10}%)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2 mb-8">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="flex items-end gap-3 mb-8">
                <span className="font-display text-4xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through mb-1">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-sm text-secondary font-bold mb-1">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 py-4 rounded-lg gradient-neon text-primary-foreground font-display font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all neon-glow-blue disabled:opacity-50"
                >
                  {addingToCart ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setLiked(!liked);
                    toast(liked ? "Removed from favorites" : "Added to favorites");
                  }}
                  className={`w-14 rounded-lg border flex items-center justify-center transition-all ${
                    liked
                      ? "border-secondary bg-secondary/10 text-secondary neon-glow-pink"
                      : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

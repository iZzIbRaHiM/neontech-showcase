import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { products } from "@/data/products";

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-32 relative" ref={ref}>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-neon-blue/5 blur-[150px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-neon-text">Products</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Handcrafted devices that redefine what technology can be.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="group glass-card rounded-2xl overflow-hidden block hover:neon-glow-blue transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary/90 text-secondary-foreground text-xs font-bold">
                      SAVE ${product.originalPrice - product.price}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="w-3.5 h-3.5 fill-neon-blue text-neon-blue" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-1 text-foreground group-hover:gradient-neon-text transition-all">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.tagline}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      View <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

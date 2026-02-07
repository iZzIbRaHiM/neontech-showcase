import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: 29,
    description: "Perfect for getting started",
    features: ["1 Device License", "Basic Support", "1 Year Warranty", "Free Shipping"],
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    description: "Best for power users",
    features: ["3 Device Licenses", "Priority Support", "3 Year Warranty", "Free Express Shipping", "Early Access", "Premium Accessories"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For teams and businesses",
    features: ["Unlimited Licenses", "24/7 Dedicated Support", "Lifetime Warranty", "Custom Branding", "API Access", "Volume Discounts"],
    popular: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-32 relative" ref={ref}>
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-neon-green/5 blur-[150px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="gradient-neon-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose the plan that fits your needs. Upgrade anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`glass-card rounded-2xl p-8 relative group hover:neon-glow-blue transition-all duration-500 ${
                plan.popular ? "border-primary/50 neon-glow-blue" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-neon text-primary-foreground text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> MOST POPULAR
                </div>
              )}

              <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="font-display text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-display font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? "gradient-neon text-primary-foreground hover:opacity-90"
                    : "border border-border bg-muted/30 text-foreground hover:border-primary/50"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

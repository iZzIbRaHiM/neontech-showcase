import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Wifi, Battery, Cpu, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Next-gen processors deliver unmatched speed and responsiveness.",
    color: "neon-blue" as const,
  },
  {
    icon: Shield,
    title: "Military Grade",
    description: "Built to withstand anything with premium materials and engineering.",
    color: "neon-pink" as const,
  },
  {
    icon: Wifi,
    title: "Always Connected",
    description: "Bluetooth 5.3 and WiFi 6E for seamless, lag-free connectivity.",
    color: "neon-purple" as const,
  },
  {
    icon: Battery,
    title: "All-Day Power",
    description: "Industry-leading battery life that keeps up with your lifestyle.",
    color: "neon-green" as const,
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Smart features that learn and adapt to your usage patterns.",
    color: "neon-blue" as const,
  },
  {
    icon: Headphones,
    title: "Immersive Audio",
    description: "Spatial audio technology that puts you inside the sound.",
    color: "neon-pink" as const,
  },
];

const glowMap = {
  "neon-blue": "neon-glow-blue",
  "neon-pink": "neon-glow-pink",
  "neon-purple": "neon-glow-purple",
  "neon-green": "neon-glow-green",
};

const colorMap = {
  "neon-blue": "text-neon-blue",
  "neon-pink": "text-neon-pink",
  "neon-purple": "text-neon-purple",
  "neon-green": "text-neon-green",
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-neon-purple/5 blur-[150px] -translate-x-1/2" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why <span className="gradient-neon-text">NeonTech</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every product is engineered with cutting-edge technology and uncompromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-xl p-6 group hover:${glowMap[feature.color]} transition-all duration-500 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${colorMap[feature.color]}`} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

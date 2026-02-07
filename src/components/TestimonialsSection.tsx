import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Music Producer",
    text: "The Neon Pulse Headphones completely changed my workflow. The spatial audio is on another level — I hear details I never knew existed in my own tracks.",
    rating: 5,
  },
  {
    name: "Sarah Kim",
    role: "Software Engineer",
    text: "I've tried every keyboard on the market. The Phantom Mech is the first one that actually feels like an extension of my thoughts. Absolutely stunning build quality.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Fitness Coach",
    text: "The Quantum Watch Pro tracks everything I need and then some. The battery life is insane — I charge it once every two weeks. Game changer for athletes.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Content Creator",
    text: "These Aura Earbuds are tiny but mighty. Crystal clear audio for calls and podcasts, and the seamless switching between devices saves me so much time.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-neon-pink/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What People <span className="gradient-neon-text">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-neon-blue text-neon-blue" />
              ))}
            </div>

            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
              "{testimonials[current].text}"
            </p>

            <div>
              <div className="font-display font-semibold text-foreground">
                {testimonials[current].name}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonials[current].role}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

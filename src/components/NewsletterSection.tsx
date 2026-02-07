import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("Welcome to the NeonTech community!");
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-neon-blue/10 blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-neon-pink/10 blur-[60px]" />

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 relative">
            Stay in the <span className="gradient-neon-text">Loop</span>
          </h2>
          <p className="text-muted-foreground mb-8 relative">
            Get early access to new releases, exclusive deals, and insider tech news.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              type="submit"
              disabled={submitted}
              className="px-6 py-3 rounded-lg gradient-neon text-primary-foreground font-display font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Subscribe
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

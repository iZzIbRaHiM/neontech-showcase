import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-neon flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              Neon<span className="gradient-neon-text">Tech</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/#products"
              onClick={() => scrollToSection("products")}
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              to="/#features"
              onClick={() => scrollToSection("features")}
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              onClick={() => scrollToSection("pricing")}
              className="hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 NeonTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

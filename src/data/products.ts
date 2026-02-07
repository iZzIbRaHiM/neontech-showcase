import productHeadphones from "@/assets/product-headphones.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productKeyboard from "@/assets/product-keyboard.jpg";
import productEarbuds from "@/assets/product-earbuds.jpg";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  colors: string[];
}

export const products: Product[] = [
  {
    id: "neon-pulse-headphones",
    name: "Neon Pulse Headphones",
    tagline: "Immersive Sound. Zero Compromise.",
    description: "Experience audio in its purest form with adaptive noise cancellation, 48-hour battery life, and spatial audio that puts you in the center of every beat.",
    price: 299,
    originalPrice: 399,
    image: productHeadphones,
    category: "Audio",
    features: ["Active Noise Cancellation", "48hr Battery", "Spatial Audio", "Hi-Res Certified", "Bluetooth 5.3"],
    inStock: true,
    rating: 4.9,
    reviews: 2847,
    colors: ["Midnight Black", "Neon Blue", "Cyber Pink"],
  },
  {
    id: "quantum-watch-pro",
    name: "Quantum Watch Pro",
    tagline: "Time Redefined.",
    description: "The most advanced smartwatch with holographic display, health monitoring suite, and seamless ecosystem integration. Your life, on your wrist.",
    price: 549,
    originalPrice: 699,
    image: productWatch,
    category: "Wearables",
    features: ["Holographic Display", "14-Day Battery", "Health Suite", "GPS + LTE", "Water Resistant 100m"],
    inStock: true,
    rating: 4.8,
    reviews: 1923,
    colors: ["Titanium", "Obsidian", "Aurora"],
  },
  {
    id: "phantom-keyboard",
    name: "Phantom Mech Keyboard",
    tagline: "Type at the Speed of Light.",
    description: "Ultra-responsive optical switches, per-key RGB with 16M colors, aircraft-grade aluminum body. Built for those who demand perfection.",
    price: 199,
    originalPrice: 249,
    image: productKeyboard,
    category: "Peripherals",
    features: ["Optical Switches", "Per-Key RGB", "USB-C", "Aluminum Body", "N-Key Rollover"],
    inStock: true,
    rating: 4.7,
    reviews: 3215,
    colors: ["Shadow", "Prism", "Stealth"],
  },
  {
    id: "aura-earbuds",
    name: "Aura Earbuds X",
    tagline: "Sound Without Boundaries.",
    description: "Crystal-clear audio in an ultra-compact design. Adaptive EQ, seamless switching between devices, and a charging case that fits anywhere.",
    price: 179,
    originalPrice: 229,
    image: productEarbuds,
    category: "Audio",
    features: ["Adaptive EQ", "Seamless Switching", "Wireless Charging", "IPX5 Rated", "Touch Controls"],
    inStock: true,
    rating: 4.8,
    reviews: 4102,
    colors: ["Pearl", "Neon Pink", "Electric Blue"],
  },
];

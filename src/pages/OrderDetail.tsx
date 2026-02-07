import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Truck, Check, Clock, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping_address: {
    full_name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  created_at: string;
  order_items: {
    id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    unit_price: number;
    selected_color: string | null;
  }[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  processing: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  shipped: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  delivered: "bg-green-500/20 text-green-500 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-500 border-red-500/30",
};

const statusSteps = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: Check },
];

export default function OrderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          status,
          subtotal,
          shipping_cost,
          tax,
          total,
          shipping_address,
          created_at,
          order_items(id, product_name, product_image, quantity, unit_price, selected_color)
        `)
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
      } else {
        setOrder(data as unknown as OrderDetail);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [user, id]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-display text-3xl font-bold mb-4">Order Details</h1>
            <p className="text-muted-foreground">Please sign in to view this order</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-display text-3xl font-bold mb-4">Order Not Found</h1>
            <Link to="/orders" className="text-primary hover:underline">
              View all orders
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex((step) => step.status === order.status);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                {order.order_number}
              </h1>
              <p className="text-muted-foreground">
                Placed on{" "}
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Badge className={`${statusColors[order.status] || ""} text-sm px-4 py-2`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          {/* Order Progress */}
          {order.status !== "cancelled" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-between">
                {statusSteps.map((step, i) => {
                  const isCompleted = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.status} className="flex flex-col items-center flex-1">
                      <div
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "gradient-neon text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        } ${isCurrent ? "neon-glow-blue" : ""}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-xs mt-2 ${
                          isCompleted ? "text-primary font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                      {i < statusSteps.length - 1 && (
                        <div
                          className={`absolute h-1 w-full top-6 left-1/2 -z-10 ${
                            i < currentStepIndex ? "bg-primary" : "bg-muted"
                          }`}
                          style={{ width: "calc(100% - 3rem)", marginLeft: "1.5rem" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-display text-xl font-bold mb-4">Items</h2>
              {order.order_items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-4 flex gap-4"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold truncate">{item.product_name}</h3>
                    {item.selected_color && (
                      <p className="text-sm text-muted-foreground">Color: {item.selected_color}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold">
                      ${(item.unit_price * item.quantity).toFixed(2)}
                    </span>
                    <p className="text-xs text-muted-foreground">${item.unit_price} each</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary & Shipping */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {order.shipping_cost === 0 ? "FREE" : `$${order.shipping_cost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-display font-bold text-lg">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">Shipping Address</h2>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="text-foreground font-medium">{order.shipping_address.full_name}</p>
                  <p>{order.shipping_address.street_address}</p>
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.state}{" "}
                    {order.shipping_address.postal_code}
                  </p>
                  <p>{order.shipping_address.country}</p>
                  {order.shipping_address.phone && <p>Phone: {order.shipping_address.phone}</p>}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

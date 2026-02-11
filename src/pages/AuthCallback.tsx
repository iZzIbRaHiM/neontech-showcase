import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash fragment from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (type === 'signup' && accessToken) {
          // Email verification successful
          const { data, error } = await supabase.auth.getUser(accessToken);
          
          if (error) {
            console.error('Error verifying email:', error);
            setMessage("Verification failed. Please try again.");
            toast.error("Email verification failed");
            setTimeout(() => navigate('/auth'), 2000);
            return;
          }

          if (data.user) {
            toast.success("Email verified successfully! You can now sign in.");
            setMessage("Email verified! Redirecting...");
            setTimeout(() => navigate('/auth'), 2000);
          }
        } else if (type === 'recovery') {
          // Password recovery
          toast.success("Please enter your new password");
          navigate('/auth');
        } else {
          // Default redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Callback error:', error);
        setMessage("Something went wrong. Redirecting...");
        setTimeout(() => navigate('/auth'), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

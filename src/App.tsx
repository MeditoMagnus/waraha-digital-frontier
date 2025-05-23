
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PresalesConsultancy from "./pages/PresalesConsultancy";
import SimpleConsultantAccess from "./pages/SimpleConsultantAccess";
import ITConsultancy from "./pages/ITConsultancy";

// Google Analytics script
const loadGoogleAnalytics = () => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID'; // Replace with actual ID in production
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MEASUREMENT_ID'); // Replace with actual ID in production
  `;
  document.head.appendChild(script2);
};

// Initialize Google Analytics if not in development
if (process.env.NODE_ENV === 'production') {
  loadGoogleAnalytics();
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/presales-consultancy" element={<PresalesConsultancy />} />
          <Route path="/consultant-access" element={<SimpleConsultantAccess />} />
          <Route path="/services/it-consultancy" element={<ITConsultancy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

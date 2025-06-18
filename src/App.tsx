
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PresalesConsultancy from "./pages/PresalesConsultancy";
import SimpleConsultantAccess from "./pages/SimpleConsultantAccess";
import ITConsultancy from "./pages/ITConsultancy";
import Pricing from "./pages/Pricing";

// Lazy load service pages
const TaxationServices = lazy(() => import('./pages/services/TaxationServices'));
const AuditingServices = lazy(() => import('./pages/services/AuditingServices'));
const AMLCompliance = lazy(() => import('./pages/services/AMLCompliance'));
const RealEstateConsultancy = lazy(() => import('./pages/services/RealEstateConsultancy'));
const BusinessAdvisory = lazy(() => import('./pages/services/BusinessAdvisory'));

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

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-waraha-midnight">
    <div className="text-white">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/presales-consultancy" element={<PresalesConsultancy />} />
              <Route path="/consultant-access" element={<SimpleConsultantAccess />} />
              <Route path="/services/it-consultancy" element={<ITConsultancy />} />
              <Route path="/services/taxation" element={<TaxationServices />} />
              <Route path="/services/auditing" element={<AuditingServices />} />
              <Route path="/services/aml-compliance" element={<AMLCompliance />} />
              <Route path="/services/real-estate" element={<RealEstateConsultancy />} />
              <Route path="/services/business-advisory" element={<BusinessAdvisory />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

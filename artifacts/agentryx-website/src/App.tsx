import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Services from "@/pages/services";
import Work from "@/pages/work";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CursorTracker } from "@/components/cursor-tracker";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThemeSwitcher } from "@/components/theme-switcher";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 5 },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/services" component={Services} />
      <Route path="/work" component={Work} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <CursorTracker />
            <Navbar />
            <ThemeSwitcher />
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Router />
              </div>
              <Footer />
            </div>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { InvestmentProvider } from "@/contexts/InvestmentContext";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Dashboard from "@/pages/dashboard";
import Investments from "@/pages/investments";
import FundDetail from "@/pages/fund-detail";
import News from "@/pages/news";
import Profile from "@/pages/profile";
import Support from "@/pages/support";
import NotFound from "@/pages/not-found";
import Auth from "@/pages/Auth";
import InvestmentsManager from "@/pages/InvestmentsManager";
import AdminManager from "@/pages/AdminManager";
import Admin from "@/pages/admin";
import AdminBackend from "@/pages/admin-backend";

function Router() {
  const [location] = useLocation();
  const isAdminBackend = location === '/admin-backend';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isAdminBackend && <Navigation />}
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/investments">
          <ProtectedRoute>
            <Investments />
          </ProtectedRoute>
        </Route>
        <Route path="/fund/:id" component={FundDetail} />
        <Route path="/auth">
          <PublicOnlyRoute>
            <Auth />
          </PublicOnlyRoute>
        </Route>
        <Route path="/InvestmentsManager">
          <ProtectedRoute requireAdmin>
            <InvestmentsManager />
          </ProtectedRoute>
        </Route>
        <Route path="/AdminManager">
          <ProtectedRoute requireAdmin>
            <AdminManager />
          </ProtectedRoute>
        </Route>
        <Route path="/admin">
          <ProtectedRoute requireAdmin>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route path="/admin-backend">
          <ProtectedRoute requireAdmin>
            <AdminBackend />
          </ProtectedRoute>
        </Route>
        <Route path="/news" component={News} />
        <Route path="/profile">
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        </Route>
        <Route path="/support" component={Support} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InvestmentProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </InvestmentProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

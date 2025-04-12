
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PackingListDetail from "./pages/PackingListDetail";
import PackingListViewer from "./pages/PackingListViewer";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            <Route path="/admin" element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminDashboard />
              </RequireAuth>
            } />
            <Route path="/dashboard" element={
              <RequireAuth allowedRoles={['owner', 'member', 'admin']}>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/lists/:id" element={
              <RequireAuth allowedRoles={['owner', 'member', 'admin']}>
                <PackingListDetail />
              </RequireAuth>
            } />
            <Route path="/view/:id" element={<PackingListViewer />} />
            <Route path="/templates" element={
              <RequireAuth allowedRoles={['owner', 'admin']}>
                <Templates />
              </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

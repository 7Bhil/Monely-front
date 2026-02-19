import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { useAuth } from './context/useAuth';
import AuthPage from './pages/Auth';
import OnboardingPage from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import WalletsPage from './pages/Wallets';
import TransactionsPage from './pages/Transactions';
import SettingsPage from './pages/Settings';
import AnalyticsPage from './pages/Analytics';
import IncomePage from './pages/Income';
import ExpensesPage from './pages/Expenses';
import Layout from './components/layout/Layout';
import { MobilePromoModal } from './components/modals/MobilePromoModal';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
      return <div className="flex h-screen items-center justify-center">Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Layout Wrapper to handle Mobile Promo
const AppLayout = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [showMobilePromo, setShowMobilePromo] = useState(() => {
        if (user && location.pathname === '/') {
            return !sessionStorage.getItem('hasSeenMobilePromo');
        }
        return false;
    });

    useEffect(() => {
        if (showMobilePromo) {
            sessionStorage.setItem('hasSeenMobilePromo', 'true');
        }
    }, [showMobilePromo]);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/wallets" element={<WalletsPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/income" element={<IncomePage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <MobilePromoModal open={showMobilePromo} onOpenChange={setShowMobilePromo} />
        </Layout>
    );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

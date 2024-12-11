import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Exchange } from './components/Dashboard/Exchange';
import { Transactions } from './components/Dashboard/Transactions';
import { Payment } from './components/Dashboard/Payment';
import { SignupPage } from './components/SignupPage';
import { LoginPage } from './components/LoginPage';
import { KYCForm } from './components/KYCForm';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { PaymentSuccess } from './components/Dashboard/components/PaymentSuccess';
import { WalletComponent } from './components/WalletComponent';
import { Card } from './components/Card';
import { AuthProvider } from './contexts/AuthContext';
import { ContactUs } from './components/ContactUs';
import { TransactionProvider } from './contexts/TransactionContext';
import { TransactionSuccess } from './components/Dashboard/TransactionSuccess';
import { Footer } from './components/Footer';
import { AboutUs } from './components/AboutUs';
import './i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  return (
    <TransactionProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen">
            <Navigation />
            <main className="pt-14">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/kyc" element={<KYCForm />} />
                <Route path="/dashboard/*" element={<Dashboard />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="exchange" element={<Exchange />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="payment" element={<Payment />} />
                  <Route path="wallet" element={<WalletComponent />} />
                  <Route path="payment-success" element={<PaymentSuccess />} />
                </Route>
                
                <Route path="/card" element={<Card />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/wallet" element={<WalletComponent />} />
                <Route path="/payments" element={<Payment />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/transaction-success" element={<TransactionSuccess />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </TransactionProvider>
  );
}

export default App;
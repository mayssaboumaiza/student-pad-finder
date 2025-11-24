// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/pages/AuthContext';
import { Toaster } from 'sonner';

// Pages communes
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Splash from './pages/Splash';

// Pages Étudiant (vos pages existantes)
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import Booking from './pages/Booking';
import Chat from './pages/Chat';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import PropertyDetail from './pages/PropertyDetail';
import RoleSelection from './pages/RoleSelection';
import List from './pages/List';

// Pages Propriétaire
import HomeProp from './pages/HomeProp';
import DemandesLocation from './pages/DemandesLocation';
import StudentRatings from './pages/StudentRatings';
import StudentProfile from './pages/StudentProfile';
import AddListing from './pages/AddListing';
import Maps from './pages/Maps';
import Visites from './pages/Visites';
import Transactions from './pages/Transactions';
import ProprietaireProfile from './pages/ProprietaireProfile';
import ProprietaireNotifications from './pages/ProprietaireNotifications';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/auth" element={<Auth />} />

          {/* Routes Étudiant */}
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/list" element={<List />} />

          {/* Routes Propriétaire */}
          <Route path="/proprietaire/home" element={<HomeProp />} />
          <Route path="/proprietaire/demandes" element={<DemandesLocation />} />
          <Route path="/proprietaire/evaluations" element={<StudentRatings />} />
          <Route path="/proprietaire/student/:id" element={<StudentProfile />} />
          <Route path="/proprietaire/ajouter-logement" element={<AddListing />} />
          <Route path="/proprietaire/maps" element={<Maps />} />
          <Route path="/proprietaire/visites" element={<Visites />} />
          <Route path="/proprietaire/location" element={<DemandesLocation />} />
          <Route path="/proprietaire/transactions" element={<Transactions />} />
          <Route path="/proprietaire/profile" element={<ProprietaireProfile />} />
          <Route path="/proprietaire/notifications" element={<ProprietaireNotifications />} />
          
          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
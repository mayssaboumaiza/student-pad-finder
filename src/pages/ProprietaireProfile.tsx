// src/pages/proprietaire/ProprietaireProfile.tsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Heart, CreditCard, Bell, Info, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/pages/AuthContext';
import { Button } from '@/components/ui/button';

const ProprietaireProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      icon: Settings,
      label: 'Paramètres',
      onClick: () => navigate('/proprietaire/settings'),
    },
    {
      icon: Heart,
      label: 'Préférences',
      onClick: () => navigate('/proprietaire/preferences'),
    },
    {
      icon: CreditCard,
      label: 'Paiement',
      onClick: () => navigate('/proprietaire/payment'),
    },
    {
      icon: Bell,
      label: 'Notification',
      onClick: () => navigate('/proprietaire/notifications'),
    },
    {
      icon: Info,
      label: 'A propos',
      onClick: () => navigate('/proprietaire/about'),
    },
  ];

  const handleLogout = () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Profil</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=proprietaire'}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {user?.name || 'Brooklyn Simmons'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {user?.email || 'brooklynsim@gmail.com'}
          </p>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full h-12 text-base"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default ProprietaireProfile;
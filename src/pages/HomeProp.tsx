// src/pages/proprietaire/HomeProp.tsx
import { Home, TrendingUp, Users, Calendar, Bell, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/pages/AuthContext.tsx';
import { Button } from '@/components/ui/button';

const HomeProp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { 
      icon: Home, 
      label: 'Nombre de logements', 
      value: '5', 
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600' 
    },
    { 
      icon: TrendingUp, 
      label: "Taux d'occupation", 
      value: '70%', 
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600' 
    },
    { 
      icon: Users, 
      label: 'Loyers en attente', 
      value: '2', 
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600' 
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              DARI <span className="text-sm text-muted-foreground">TN</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Bienvenue, {user?.name || 'Hichem'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/proprietaire/notifications')}
              className="p-2 hover:bg-secondary rounded-full relative transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Ajouter logement button */}
        <Button
          onClick={() => navigate('/proprietaire/ajouter-logement')}
          className="w-full h-14 rounded-xl text-base font-semibold"
          size="lg"
        >
          Ajouter logement
        </Button>

        {/* Stats Grid */}
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loyer mensuel chart */}
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Loyer mensuel</h3>
          <div className="relative h-48 flex items-end justify-between gap-2">
            {/* Simple bar chart */}
            {[75, 60, 80, 50, 70, 45].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/10 rounded-t-lg relative overflow-hidden">
                  <div 
                    className="w-full bg-primary rounded-t-lg transition-all duration-500"
                    style={{ height: `${height * 1.5}px` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>0 DT</span>
            <span>10,000 DT</span>
            <span>20,000 DT</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t px-6 py-3 safe-area-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button 
            onClick={() => navigate('/proprietaire/home')} 
            className="flex flex-col items-center gap-1 text-primary"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Accueil</span>
          </button>
          <button 
            onClick={() => navigate('/proprietaire/location')} 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Location</span>
          </button>
          <button 
            onClick={() => navigate('/proprietaire/visites')} 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Visites</span>
          </button>
          <button 
            onClick={() => navigate('/proprietaire/transactions')} 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Transactions</span>
          </button>
          <button 
            onClick={() => navigate('/proprietaire/profile')} 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProp;
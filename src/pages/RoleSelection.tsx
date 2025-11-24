// src/pages/RoleSelection.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UserRole = 'student' | 'proprietaire';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      // Sauvegarder le rôle sélectionné dans localStorage
      localStorage.setItem('selectedRole', selectedRole);
      // Rediriger vers la page d'authentification
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 p-2 hover:bg-secondary rounded-lg transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          <span className="text-cyan-500">Bienvenue sur </span>
          <span className="text-purple-500">DARI</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Choisissez votre profil pour continuer
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex-1 space-y-4 max-w-md mx-auto w-full">
        {/* Étudiant Card */}
        <button
          onClick={() => setSelectedRole('student')}
          className={`w-full p-6 rounded-2xl border-2 transition-all ${
            selectedRole === 'student'
              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/20'
              : 'border-border bg-card hover:border-cyan-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              selectedRole === 'student' 
                ? 'bg-cyan-500' 
                : 'bg-secondary'
            }`}>
              <Home className={`w-8 h-8 ${
                selectedRole === 'student' 
                  ? 'text-white' 
                  : 'text-muted-foreground'
              }`} />
            </div>
            <div className="text-left flex-1">
              <h2 className={`text-xl font-bold mb-1 ${
                selectedRole === 'student' ? 'text-cyan-500' : 'text-foreground'
              }`}>
                Étudiant
              </h2>
              <p className="text-sm text-muted-foreground">
                Je cherche un logement ou un colocataire
              </p>
            </div>
          </div>
        </button>

        {/* Propriétaire Card */}
        <button
          onClick={() => setSelectedRole('proprietaire')}
          className={`w-full p-6 rounded-2xl border-2 transition-all ${
            selectedRole === 'proprietaire'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
              : 'border-border bg-card hover:border-purple-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              selectedRole === 'proprietaire' 
                ? 'bg-purple-500' 
                : 'bg-secondary'
            }`}>
              <Building2 className={`w-8 h-8 ${
                selectedRole === 'proprietaire' 
                  ? 'text-white' 
                  : 'text-muted-foreground'
              }`} />
            </div>
            <div className="text-left flex-1">
              <h2 className={`text-xl font-bold mb-1 ${
                selectedRole === 'proprietaire' ? 'text-purple-500' : 'text-foreground'
              }`}>
                Propriétaire
              </h2>
              <p className="text-sm text-muted-foreground">
                Je propose un logement à louer
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Continue Button */}
      <div className="mt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full h-14 text-lg rounded-2xl ${
            selectedRole === 'student'
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
              : selectedRole === 'proprietaire'
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
              : ''
          }`}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
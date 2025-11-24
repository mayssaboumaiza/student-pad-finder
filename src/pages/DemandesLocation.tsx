// src/pages/proprietaire/DemandesLocation.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/pages/AuthContext';

interface Demande {
  id: string;
  studentName: string;
  studentAvatar: string;
  propertyType: string;
  propertyDetails: string;
  requestDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  trustScore: number;
}

const DemandesLocation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'accepted'>('all');

  const demandes: Demande[] = [
    {
      id: '1',
      studentName: 'Foulen El Fouleni',
      studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      propertyType: 'Appartement - Lac 2, Tunis',
      propertyDetails: 'Appartement - Lac 2, Tunis',
      requestDate: '10/10/2025',
      status: 'pending',
      trustScore: 80,
    },
    {
      id: '2',
      studentName: 'Foulen El Fouleni',
      studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      propertyType: 'Appartement - Lac 2, Tunis',
      propertyDetails: 'Appartement - Lac 2, Tunis',
      requestDate: '10/10/2025',
      status: 'pending',
      trustScore: 80,
    },
  ];

  const filteredDemandes = demandes.filter(d => 
    selectedFilter === 'all' || d.status === selectedFilter
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Demandes de location</h1>
          <div className="w-9" />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className="rounded-full"
          >
            Toutes
          </Button>
          <Button
            variant={selectedFilter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('pending')}
            className="rounded-full"
          >
            En attente
          </Button>
          <Button
            variant={selectedFilter === 'accepted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('accepted')}
            className="rounded-full"
          >
            Acceptées
          </Button>
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="p-6 space-y-4">
        {filteredDemandes.map((demande) => (
          <div key={demande.id} className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <img
                src={demande.studentAvatar}
                alt={demande.studentName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{demande.studentName}</h3>
                <p className="text-sm text-muted-foreground">Lorem ipsum...</p>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vote de confiance :</span>
                <span className="font-semibold text-primary">{demande.trustScore}%</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Appartement - Lac 2, Tunis</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Demande faite : {demande.requestDate}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-full border-destructive text-destructive hover:bg-destructive/10"
                onClick={() => navigate(`/proprietaire/student/${demande.id}`)}
              >
                Voir avis
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-full"
              >
                Rejeter
              </Button>
              <Button
                size="sm"
                className="flex-1 rounded-full"
              >
                Accepter
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandesLocation;
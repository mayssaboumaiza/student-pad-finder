// src/pages/proprietaire/DemandesLocation.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/pages/AuthContext'; // Assurez-vous que ce chemin est correct

// Définition de l'interface Demande
interface Demande {
  id: string;
  studentName: string;
  studentAvatar: string;
  description: string; // Ajout d'une description pour chaque carte
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

  // ÉTATS DE LA MODALE ET DU FILTRAGE DYNAMIQUE (inchangés par rapport à la dernière version)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState('');     
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Le plus récent');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0); 

  // Données de simulation avec des noms réels, des avatars et des descriptions significatives
  const demandes: Demande[] = [
    {
      id: '1',
      studentName: 'Sophie Dubois',
      // Remplacez par une URL d'image réelle ou un service d'avatar plus réaliste si disponible
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      description: "Étudiante en master, cherche un appartement calme pour ses études.",
      propertyType: 'Appartement - Lac 2, Tunis',
      propertyDetails: 'Appartement - Lac 2, Tunis',
      requestDate: '10/10/2025',
      status: 'pending',
      trustScore: 80,
    },
    {
      id: '2',
      studentName: 'Marc Lefevre',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: "Jeune professionnel, recherche une colocation près du centre-ville.",
      propertyType: 'Appartement - Lac 2, Tunis',
      propertyDetails: 'Appartement - Lac 2, Tunis',
      requestDate: '10/10/2025',
      status: 'pending',
      trustScore: 80,
    },
    {
        id: '3',
        studentName: 'Lina Ben Ali',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: "Étudiante étrangère, besoin d'un logement meublé pour 6 mois.",
        propertyType: 'Studio - El Manar, Tunis',
        propertyDetails: 'Studio - El Manar, Tunis',
        requestDate: '08/10/2025',
        status: 'accepted', // Exemple de demande acceptée
        trustScore: 92,
    },
    {
        id: '4',
        studentName: 'Mehdi Kallel',
        studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fa2fa3?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: "Étudiant Erasmus, recherche une chambre confortable avec accès facile aux transports.",
        propertyType: 'Chambre privée - La Marsa',
        propertyDetails: 'Chambre privée - La Marsa',
        requestDate: '05/10/2025',
        status: 'pending',
        trustScore: 75,
    },
    {
        id: '5',
        studentName: 'Chloé Martin',
        studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: "En stage, cherche un petit appartement bien situé et lumineux.",
        propertyType: 'Appartement T1 - Centre Ville, Tunis',
        propertyDetails: 'Appartement T1 - Centre Ville, Tunis',
        requestDate: '01/10/2025',
        status: 'pending',
        trustScore: 88,
    },
  ];

  const filteredDemandes = demandes.filter(d => 
    selectedFilter === 'all' || d.status === selectedFilter
  );

  // LOGIQUE DES FILTRES D'ÉVALUATION (inchangée)
  const handleReviewFilterClick = () => {
    if (!startDate && !endDate) {
      setStartDate('2025-10-09'); 
      setEndDate('2025-11-09');   
    }
    setIsFilterModalOpen(true);
  };
  
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handlePeriodSelection = (period: string, start: string, end: string) => {
    setSelectedPeriod(period);
    setStartDate(start);
    setEndDate(end);
    setActiveFiltersCount(1); 
  };
  
  const handleApplyFilters = () => {
    console.log("Filtres appliqués:", { startDate, endDate, sortBy });
    setIsFilterModalOpen(false);
  };
  
  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedPeriod(null);
    setSortBy('Le plus récent');
    setActiveFiltersCount(0);
  };


  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Demandes de location</h1>
          <button 
            onClick={handleReviewFilterClick} 
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filters de Demandes */}
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
                className="w-12 h-12 rounded-full object-cover" // Ajout de object-cover pour un meilleur affichage
              />
              <div className="flex-1">
                <h3 className="font-semibold">{demande.studentName}</h3>
                {/* Utilisation de la nouvelle description */}
                <p className="text-sm text-muted-foreground">{demande.description}</p>
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
                <span className="text-muted-foreground">{demande.propertyType}</span>
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
                plus d'infos
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

      {/* MODALE DE FILTRES D'ÉVALUATION DYNAMIQUE */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
          <div className="bg-white rounded-t-xl sm:rounded-xl p-4 w-full max-w-md shadow-2xl transform transition-all duration-300">
            
            {/* Header de la Modale */}
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h2 className="text-lg font-semibold">Évaluations de Foulen El Fouleni</h2> {/* Gardé "Foulen El Fouleni" ici car l'image le montre */}
              <button onClick={closeFilterModal} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Contenu des Filtres */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Publié</h3>
              
              {/* Filtre de Période (Date pickers DYNAMIQUES) */}
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setSelectedPeriod(null); 
                  }} 
                  className="p-2 border rounded-lg text-center appearance-none" 
                />
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setSelectedPeriod(null);
                  }} 
                  className="p-2 border rounded-lg text-center appearance-none" 
                />
              </div>
              
              {/* Boutons de Période (DYNAMIQUES) */}
              <div className="flex gap-2 justify-between">
                <Button 
                  variant={selectedPeriod === 'today' ? 'default' : 'outline'} 
                  size="sm" 
                  className="flex-1 rounded-full"
                  onClick={() => handlePeriodSelection('today', '2025-11-25', '2025-11-25')}
                >
                  Aujourd'hui
                </Button>
                <Button 
                  variant={selectedPeriod === 'week' ? 'default' : 'outline'} 
                  size="sm" 
                  className="flex-1 rounded-full"
                  onClick={() => handlePeriodSelection('week', '2025-11-18', '2025-11-25')}
                >
                  Cette semaine
                </Button>
                <Button 
                  variant={selectedPeriod === 'month' ? 'default' : 'outline'} 
                  size="sm" 
                  className="flex-1 rounded-full"
                  onClick={() => handlePeriodSelection('month', '2025-10-25', '2025-11-25')}
                >
                  Ce mois
                </Button>
              </div>

              {/* Tri par (DYNAMIQUE) */}
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trié selon</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg appearance-none bg-white"
                >
                  <option>Le plus récent</option>
                  <option>Le moins récent</option>
                  <option>Meilleure note</option>
                  <option>Pire note</option>
                </select>
              </div>

            </div>

            {/* Boutons d'Action (DYNAMIQUES) */}
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1 rounded-lg bg-gray-100 text-primary-foreground hover:bg-gray-200"
                onClick={handleResetFilters} 
              >
                Réinitialiser
              </Button>
              <Button 
                className="flex-1 rounded-lg bg-primary hover:bg-primary/90"
                onClick={handleApplyFilters} 
              >
                Appliquer filtres ({activeFiltersCount})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandesLocation;
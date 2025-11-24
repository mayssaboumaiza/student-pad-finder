// src/pages/proprietaire/Maps.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Maps = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    address: 'Jl. Jend. Sudirman, Gowongan, Kec. Jetis, Kota Yogyakarta',
    coordinates: { lat: 36.8065, lng: 10.1815 }
  });

  const handleConfirm = () => {
    toast.success('Emplacement confirmé');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Chercher emplacement"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Carte stylisée interactive */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950">
          {/* Grille de routes */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="2" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="2" />
          </svg>

          {/* Zones de quartiers stylisées */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-300/30 dark:bg-green-700/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/30 dark:bg-blue-700/30 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-300/30 dark:bg-yellow-700/30 rounded-full blur-2xl"></div>

          {/* Points d'intérêt */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          
          {/* Marker central principal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 animate-bounce">
            <MapPin className="w-16 h-16 text-red-500 drop-shadow-2xl" fill="currentColor" />
          </div>

          {/* Cercle de précision autour du marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-4 border-red-500/30 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Bottom Card avec adresse */}
      <div className="bg-card border-t p-6 space-y-4">
        <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Détails d'emplacement</h3>
            <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
          </div>
        </div>

        <Button
          onClick={handleConfirm}
          className="w-full h-12 text-base"
        >
          Confirmer
        </Button>
      </div>
    </div>
  );
};

export default Maps;
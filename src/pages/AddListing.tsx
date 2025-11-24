// src/pages/proprietaire/AddListing.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    rent: '',
    surface: '',
    bedrooms: 0,
    bathrooms: 0,
    amenities: {
      wifi: false,
      electricity: false,
      internet: false,
      heating: false,
      airConditioning: false,
      waterHeater: false,
    },
    description: '',
    photos: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Logement ajouté avec succès!');
    navigate('/proprietaire/home');
  };

  const handlePhotoUpload = () => {
    toast.info('Fonctionnalité de téléchargement de photos à venir');
  };

  const toggleAmenity = (amenity: keyof typeof formData.amenities) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: !formData.amenities[amenity],
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Ajouter un logement</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Titre de la notification */}
        <div className="space-y-2">
          <Label htmlFor="title">Titre de la notification</Label>
          <Input
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        {/* Type de logement */}
        <div className="space-y-2">
          <Label htmlFor="type">Type de logement</Label>
          <select
            id="type"
            className="w-full px-4 py-2 rounded-lg border bg-background"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="">Type de logement</option>
            <option value="apartment">Appartement</option>
            <option value="house">Maison</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        {/* Localisation avec carte */}
        <div className="space-y-2">
          <Label>Localisation</Label>
          <div className="h-56 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl relative overflow-hidden">
            {/* Carte stylisée avec pin */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Routes stylisées */}
                <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="2" />
                <line x1="200" y1="0" x2="200" y2="300" stroke="white" strokeWidth="2" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="1.5" />
                <line x1="100" y1="0" x2="100" y2="300" stroke="white" strokeWidth="1.5" />
                <line x1="300" y1="0" x2="300" y2="300" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            
            {/* Pin de localisation central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-white drop-shadow-lg mb-2 mx-auto" fill="white" />
                <p className="text-white font-medium drop-shadow-md">Carte interactive</p>
              </div>
            </div>

            {/* Points décoratifs */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="absolute bottom-12 left-16 w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="absolute bottom-6 right-8 w-2 h-2 bg-white rounded-full opacity-60"></div>
          </div>
          <Button
            type="button"
            className="w-full h-12 bg-pink-400 hover:bg-pink-500 text-white rounded-xl"
            onClick={() => navigate('/proprietaire/maps')}
          >
            Marquer sur la carte
          </Button>
        </div>

        {/* Loyer */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rent">Loyer (DT)</Label>
            <Input
              id="rent"
              type="number"
              placeholder="Exemple : 500"
              value={formData.rent}
              onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surface">Superficie (m2)</Label>
            <Input
              id="surface"
              type="number"
              placeholder="Exemple : 80"
              value={formData.surface}
              onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Chambres et salles de bain */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nbre chambres</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFormData({ ...formData, bedrooms: Math.max(0, formData.bedrooms - 1) })}
              >
                -
              </Button>
              <span className="text-2xl font-semibold min-w-[40px] text-center">{formData.bedrooms}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFormData({ ...formData, bedrooms: formData.bedrooms + 1 })}
              >
                +
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nbre salle de bains</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFormData({ ...formData, bathrooms: Math.max(0, formData.bathrooms - 1) })}
              >
                -
              </Button>
              <span className="text-2xl font-semibold min-w-[40px] text-center">{formData.bathrooms}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFormData({ ...formData, bathrooms: formData.bathrooms + 1 })}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Commodités */}
        <div className="space-y-3">
          <Label>Commodités</Label>
          {[
            { key: 'wifi', label: 'WiFi' },
            { key: 'electricity', label: 'Électricité' },
            { key: 'internet', label: 'Internet' },
            { key: 'heating', label: 'Chauffage' },
            { key: 'airConditioning', label: 'Clim' },
            { key: 'waterHeater', label: 'Eau chaude' },
          ].map((amenity) => (
            <div key={amenity.key} className="flex items-center justify-between py-2">
              <span className="text-sm">{amenity.label}</span>
              <Switch
                checked={formData.amenities[amenity.key as keyof typeof formData.amenities]}
                onCheckedChange={() => toggleAmenity(amenity.key as keyof typeof formData.amenities)}
              />
            </div>
          ))}
        </div>

        {/* Photos */}
        <div className="space-y-3">
          <Label>Photos du logement</Label>
          <div
            onClick={handlePhotoUpload}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Ajouter des images depuis votre galerie
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description du logement</Label>
          <Textarea
            id="description"
            placeholder="Ajouter une description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>

        {/* Visite 360 */}
        <div className="text-center text-sm text-muted-foreground">
          Voulez-vous ajouter une visite 360° de votre logement?
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <Button type="submit" className="w-full h-12 text-base">
            Ajouter
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base"
            onClick={() => navigate(-1)}
          >
            Sauvegarder tout
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full h-12 text-base"
            onClick={() => navigate('/proprietaire/home')}
          >
            Passer logement
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
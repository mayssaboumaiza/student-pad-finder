// src/pages/proprietaire/StudentRatings.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Rating {
  id: string;
  studentName: string;
  studentAvatar: string;
  trustScore: number;
  paymentRating: number;
  respectRating: number;
  comment: string;
  date?: string;
}

const StudentRatings = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    period: 'all',
  });

  const ratings: Rating[] = [
    {
      id: '1',
      studentName: 'John D.',
      studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      trustScore: 80,
      paymentRating: 4,
      respectRating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    },
    {
      id: '2',
      studentName: 'John D.',
      studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      trustScore: 80,
      paymentRating: 4,
      respectRating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const applyFilters = () => {
    setFilterOpen(false);
    // Logique de filtrage ici
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Évaluations de Foulen El Fouleni</h1>
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Publié */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Publié</Label>
                  <div className="space-y-2">
                    {['A', "Aujourd'hui", 'Cette semaine', 'Ce mois'].map((period) => (
                      <button
                        key={period}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                        onClick={() => setFilters({ ...filters, period })}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date range */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">De</Label>
                  <div className="space-y-3">
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      className="h-12"
                    />
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Trier selon */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Trier selon</Label>
                  <select className="w-full px-4 py-3 rounded-lg border bg-background">
                    <option>Le plus récent</option>
                    <option>Le plus ancien</option>
                    <option>Note la plus élevée</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setFilterOpen(false)}
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={applyFilters}
                  >
                    Appliquer filtres (2)
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Nb. Evaluations : 3</p>
      </div>

      {/* Liste des évaluations */}
      <div className="p-6 space-y-4">
        {ratings.map((rating) => (
          <div key={rating.id} className="bg-card rounded-xl p-5 border shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <img
                src={rating.studentAvatar}
                alt={rating.studentName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{rating.studentName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">Vote de confiance :</span>
                  <span className="text-sm font-semibold text-primary">{rating.trustScore}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Paiement ponctuel :</span>
                {renderStars(rating.paymentRating)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Respect du logement :</span>
                {renderStars(rating.respectRating)}
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-2">Commentaire :</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rating.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRatings;
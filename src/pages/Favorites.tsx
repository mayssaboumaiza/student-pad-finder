import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MapPin, Star } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const favoriteProperties = [
  {
    id: 1,
    name: "Petit Studio",
    location: "Borj Baccouche",
    price: "320 DT",
    rating: 4.5,
    image: property1,
  },
  {
    id: 2,
    name: "Dar Trad",
    location: "Borj Louzir",
    price: "230 DT",
    rating: 4.5,
    image: property2,
  },
];

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([1, 2]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
          >
            
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">Favoris</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {favoriteProperties.filter((p) => favorites.includes(p.id)).length ===
        0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Aucun favori</h2>
            <p className="text-muted-foreground">
              Commencez à ajouter des logements à vos favoris
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProperties
              .filter((property) => favorites.includes(property.id))
              .map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(property.id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-accent text-accent" />
                      </button>
                    </div>

                    <div
                      className="flex-1 flex flex-col justify-between"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {property.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /mois
                          </span>
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="text-sm font-semibold">
                            {property.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

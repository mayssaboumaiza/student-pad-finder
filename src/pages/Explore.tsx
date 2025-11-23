import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Heart,
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const categories = [
  "Tous",
  "Studio",
  "Appartement",
  "Chambre",
  "Colocation",
  "Maison",
];

const allProperties = [
  {
    id: 1,
    name: "Takatea Homestay",
    location: "Jl. Bandul, Kota Yogyakarta",
    price: "830",
    rating: 4.8,
    image: property1,
    category: "Maison",
  },
  {
    id: 2,
    name: "Maharani Villa Yogyakarta",
    location: "Jl. Bumi, Jl. Bendungan",
    price: "320",
    rating: 4.5,
    image: property2,
    category: "Studio",
  },
  {
    id: 3,
    name: "Bali Komang Guest",
    location: "Jl. North Kertih, Bali",
    price: "498",
    rating: 4.5,
    image: property1,
    category: "Appartement",
  },
  {
    id: 4,
    name: "Batavia Apartments",
    location: "Jl. Raya, Jakarta",
    price: "815",
    rating: 4.5,
    image: property2,
    category: "Appartement",
  },
  {
    id: 5,
    name: "Manhattan Hotel",
    location: "Jl. West 34th St, NY, USA",
    price: "2215",
    rating: 4.5,
    image: property1,
    category: "Studio",
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredProperties = allProperties.filter((property) => {
    const matchesCategory =
      selectedCategory === "Tous" || property.category === selectedCategory;
    const matchesSearch = property.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Vérifie si le quiz est terminé via l'URL
  const quizDone = window.location.search.includes('quiz=done');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Bloc quiz en haut, remplace la recherche */}
      <div className="bg-gradient-primary text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <button
              className="p-2 rounded-full hover:bg-muted"
              aria-label="Retour"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-xl">Explorer</h1>
            <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
          </div>
        <div className="px-2 pt-2">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl p-4 flex items-center justify-between cursor-pointer mb-4" onClick={() => navigate('/quiz')}>
            <div>
              <div className="font-bold text-white text-lg mb-1">Vous cherchez un colocataire ?</div>
              <div className="text-white text-sm">Faites le quiz pour trouver votre colocataire idéal</div>
            </div>
            <Button className="bg-white text-primary font-semibold">Commencer le quiz</Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-all ${
                selectedCategory === category
                  ? "bg-gradient-primary text-white border-0"
                  : "hover:bg-muted"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-40 object-cover"
                  onClick={() => navigate(`/property/${property.id}`)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(property.id)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div
                className="p-3"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <h3 className="font-semibold text-sm mb-1 truncate">
                  {property.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{property.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">
                    {property.price} DT
                    <span className="text-xs font-normal">/mois</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="text-xs font-semibold">
                      {property.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* Section colocataires compatibles après quiz */}
      {quizDone && (
        <div className="px-4 pb-8">
          <h2 className="font-bold text-lg mb-4">Colocataires compatibles</h2>
          <div className="space-y-3">
            <Card className="flex items-center gap-3 p-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Foulen El Fouléni" className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold">Foulen El Fouléni</div>
                <div className="text-xs text-muted-foreground">Étudiante en droit, aime les soirées calmes et la cuisine maison. Non fumeuse, sociable et organisée.</div>
              </div>
              <div className="text-primary font-bold">80%</div>
              <Button variant="outline" size="sm" onClick={() => navigate('/chat/1')}>Message</Button>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Foulen El Fouléni" className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold">Foulen El Fouléni</div>
                <div className="text-xs text-muted-foreground">Étudiant en informatique, passionné de jeux vidéo, aime les discussions et les sorties. Fumeur occasionnel, flexible et ouvert à la colocation mixte.</div>
              </div>
              <div className="text-primary font-bold">73%</div>
              <Button variant="outline" size="sm" onClick={() => navigate('/chat/2')}>Message</Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;

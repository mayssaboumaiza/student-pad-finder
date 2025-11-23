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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">Explorer</h1>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <Input
            placeholder="Chercher un logement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
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
    </div>
  );
};

export default Explore;

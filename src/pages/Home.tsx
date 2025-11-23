import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home as HomeIcon,
  Search,
  Heart,
  User,
  Compass,
  Bell,
  MessageCircle,
  MapPin,
  Star,
  ChevronDown,
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const properties = [
  {
    id: 1,
    name: "Petit Studio",
    location: "Borj Baccouche",
    price: "310 DT",
    rating: 4.5,
    image: property1,
    featured: true,
  },
  {
    id: 2,
    name: "Dar Trad",
    location: "Borj Louzir",
    price: "230 DT",
    rating: 4.5,
    image: property2,
    featured: false,
  },
  {
    id: 3,
    name: "Maharani Villa Yogyakarta",
    location: "Jl. Bandul Jl. Bendungan",
    price: "320 DT",
    rating: 4.5,
    image: property1,
    featured: false,
  },
  {
    id: 4,
    name: "Apartement land home",
    location: "Jl. Tentara Pelajar No...",
    price: "320 DT",
    rating: 4.7,
    image: property2,
    featured: false,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [location, setLocation] = useState("Tunis");
  const locations = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Medenine", "Tataouine", "Tozeur", "Kebili", "Gafsa"
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card p-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Localisation</div>
              <div className="font-semibold flex items-center gap-1">
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="bg-transparent outline-none font-semibold"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/notifications")}
              className="p-2 hover:bg-secondary rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="p-2 hover:bg-secondary rounded-full transition-colors relative"
            >
              <MessageCircle className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Chercher"
            className="pl-12 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Recommandé Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommandé</h2>
            <button className="text-sm text-primary">Voir tous</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {properties.slice(0, 2).map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-40 object-cover"
                  />
                  {property.featured && (
                    <Badge className="absolute top-3 right-3 bg-card text-foreground">
                      {property.price}/mois
                    </Badge>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-card rounded-full hover:bg-secondary transition-colors"
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
                <div className="p-3 space-y-1">
                  <h3 className="font-semibold text-sm truncate">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Nearby</h2>
            <button className="text-sm text-primary">Voir tous</button>
          </div>

          <div className="space-y-3">
            {properties.slice(2).map((property) => (
              <Card
                key={property.id}
                className="flex gap-3 p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-sm">{property.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{property.price}/mois</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around p-4 max-w-md mx-auto">
          {[
            { icon: HomeIcon, label: "Accueil", value: "home", route: "/home" },
            { icon: Compass, label: "Explorer", value: "explore", route: "/explore" },
            { icon: Heart, label: "Favoris", value: "favorites", route: "/favorites" },
            { icon: User, label: "Profil", value: "profile", route: "/profile" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setActiveTab(item.value);
                navigate(item.route);
              }}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <item.icon
                className={`w-6 h-6 transition-all ${
                  activeTab === item.value
                    ? "text-primary scale-110"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  activeTab === item.value
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

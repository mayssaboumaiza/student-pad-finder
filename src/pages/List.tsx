import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MapPin, Star, ChevronLeft } from "lucide-react"; 
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const properties = [
  { id: 1, name: "Petit Studio", location: "Tunis", price: "310 DT", rating: 4.5, image: property1, featured: true },
  { id: 2, name: "Dar Trad", location: "Ariana", price: "230 DT", rating: 4.3, image: property2, featured: false },
  { id: 3, name: "Résidence Ennaser", location: "Ariana", price: "390 DT", rating: 4.6, image: property1, featured: true },
  { id: 4, name: "Studio Lac 2", location: "Tunis", price: "450 DT", rating: 4.8, image: property2, featured: false },
  { id: 5, name: "Appartement Sousse Corniche", location: "Sousse", price: "520 DT", rating: 4.7, image: property1, featured: true },
  { id: 6, name: "Colocation Monastir", location: "Monastir", price: "280 DT", rating: 4.2, image: property2, featured: false },
  { id: 7, name: "Studio Médina", location: "Tunis", price: "300 DT", rating: 4.1, image: property1, featured: false },
  { id: 8, name: "Appartement Sfax Centre", location: "Sfax", price: "400 DT", rating: 4.4, image: property2, featured: true },
  { id: 9, name: "Villa Hammamet Nord", location: "Nabeul", price: "780 DT", rating: 4.9, image: property1, featured: true },
  { id: 10, name: "Studio Gabès Sud", location: "Gabès", price: "250 DT", rating: 4.0, image: property2, featured: false },
];

const List = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const query = new URLSearchParams(locationHook.search);
  const type = query.get("type");
  const loc = query.get("location");

  const filteredProperties = properties.filter(p => p.location === loc);

  // Titre dynamique
  const title =
  type === "nearby" ? `À proximité` : 
  type === "recommended" ? `Recommandé` :  // juste "Recommandé"
  type ? `${type.charAt(0).toUpperCase() + type.slice(1)} à ${loc}` : 
  `Toutes les propriétés à ${loc}`;


  return (
    <div className="p-6">
      {/* Flèche de retour */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-primary mb-4"
      >
        <ChevronLeft className="w-5 h-5" /> Retour
      </button>

      <h1 className="text-xl font-bold mb-4">{title}</h1>

      <div className="grid grid-cols-2 gap-4">
        {filteredProperties.map((p) => (
          <Card
            key={p.id}
            className="cursor-pointer"
            onClick={() => navigate(`/property/${p.id}`)}
          >
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-2">
              <h2 className="font-semibold text-sm">{p.name}</h2>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {p.location}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-sm">{p.price}/mois</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{p.rating}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default List;

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Star,
  BedDouble,
  Bath,
  Square,
  Hammer,
  ParkingSquare,
  Phone,
  MessageCircle,
  Calendar,
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const propertyImages = [property1, property2, property1, property2];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">Détails</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="p-4">
        <div className="relative rounded-2xl overflow-hidden mb-3">
          <img
            src={property1}
            alt="Property"
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {propertyImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Property ${i + 1}`}
              className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="px-4 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold">House of Mormon</h2>
            <span className="text-xl font-bold text-primary">310 DT<span className="text-sm font-normal text-muted-foreground">/mois</span></span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Lac 2</span>
          </div>
        </div>

        {/* Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Détails du logement</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <BedDouble className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Chambres</div>
                <div className="font-semibold">3</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Bath className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Salle de bains</div>
                <div className="font-semibold">2</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Square className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Superficie</div>
                <div className="font-semibold">1,880 m2</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Hammer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Construction</div>
                <div className="font-semibold">2020</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <ParkingSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Parking</div>
                <div className="font-semibold">1 Indoor</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Owner */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Propriétaire</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary">FB</span>
              </div>
              <div>
                <div className="font-semibold">Foulen Ben Foulen</div>
                <div className="text-sm text-muted-foreground">Il y a 41 min</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-xl"
            onClick={() => navigate("/booking")}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Planifier une visite
          </Button>
          <Button
            size="lg"
            className="h-12 rounded-xl"
          >
            Louer Maintenant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Hammer,
  ParkingSquare,
  Phone,
  MessageCircle,
  Calendar,
} from "lucide-react";

import { properties } from "@/data/properties"; // Importer depuis le fichier partagé

const serviceList = [
  { label: "Hôpital", coords: "36.8493,10.2126" },
  { label: "Gym", coords: "36.8500,10.2130" },
  { label: "Mall", coords: "36.8510,10.2140" },
  { label: "Supermarché", coords: "36.8520,10.2150" },
  { label: "Pharmacie", coords: "36.8530,10.2160" },
  { label: "Restaurant", coords: "36.8540,10.2170" },
  { label: "École", coords: "36.8550,10.2180" },
  { label: "Université", coords: "36.8560,10.2190" },
  { label: "Mosquée", coords: "36.8570,10.2200" },
  { label: "Stations", coords: "36.8580,10.2210" },
  { label: "Banque", coords: "36.8590,10.2220" },
  { label: "Café", coords: "36.8600,10.2230" },
  { label: "Parc", coords: "36.8610,10.2240" },
  { label: "Cinéma", coords: "36.8620,10.2250" },
  { label: "Librairie", coords: "36.8630,10.2260" },
  { label: "Boulangerie", coords: "36.8640,10.2270" },
];

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [showLouer, setShowLouer] = useState(false);
  const [selectedService, setSelectedService] = useState(serviceList[0].label);

  if (!property) return <div className="p-4">Logement introuvable</div>;

  const selectedCoords =
    serviceList.find((s) => s.label === selectedService)?.coords || "36.8493,10.2126";

  const handleImageClick = (index: number) => setCurrentImageIndex(index);
  const handleDoubleClick = () => setShowMore((prev) => !prev);
  const handleServiceClick = (service) => setSelectedService(service.label);

  if (showDetails2) {
    return (
      <div className="min-h-screen bg-background pb-6">
        <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setShowDetails2(false)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Details</h1>
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

        <div className="p-4">
          <img
            src={property.images[currentImageIndex]}
            alt="Property"
            className="w-full h-64 object-cover rounded-2xl mb-3"
          />
          <div className="flex gap-2 mb-4">
            {property.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Property ${i + 1}`}
                className={`w-24 h-16 object-cover rounded-lg cursor-pointer transition-opacity hover:opacity-80 ${
                  i === currentImageIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleImageClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6" onDoubleClick={handleDoubleClick}>
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
            src={property.images[currentImageIndex]}
            alt="Property"
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {property.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Property ${i + 1}`}
              className={`w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                i === currentImageIndex ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleImageClick(i)}
            />
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="px-4 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold">{property.name}</h2>
            <span className="text-xl font-bold text-primary">
              {property.price} DT
              <span className="text-sm font-normal text-muted-foreground">/mois</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
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
                <div className="font-semibold">{property.bedrooms}</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Bath className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Salle de bains</div>
                <div className="font-semibold">{property.bathrooms}</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Square className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Superficie</div>
                <div className="font-semibold">{property.area}</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Hammer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Construction</div>
                <div className="font-semibold">{property.year}</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <ParkingSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Parking</div>
                <div className="font-semibold">{property.parking}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {property.description}
          </p>
          {showMore && (
            <div className="mt-4 p-4 bg-secondary rounded-xl">
              <h4 className="font-semibold mb-2">Plus de détails</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Agent immobilier : Foulen Ben Foulen</li>
                <li>Localisation précise, carte et points d'intérêt à proximité</li>
                <li>152 avis, note moyenne 4.5/5</li>
                <li>Contact direct, téléphone et messagerie</li>
                <li>Historique du bien, année de construction, rénovations</li>
                <li>Photos supplémentaires et galerie interactive</li>
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          {!showLouer && (
            <Button size="lg" className="h-12 rounded-xl" onClick={() => setShowLouer(true)}>
              Plus de détails
            </Button>
          )}
        </div>

        {showLouer && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            {/* Localisation + services */}
            <h5 className="font-semibold mb-1">Localisation</h5>
            <div className="flex flex-wrap gap-2 mb-2">
              {serviceList.map((service) => (
                <button
                  key={service.label}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    selectedService === service.label
                      ? "bg-blue-600 text-white"
                      : "bg-blue-200 text-blue-900"
                  }`}
                  onClick={() => handleServiceClick(service)}
                >
                  {service.label}
                </button>
              ))}
            </div>
            <div className="w-full h-40 rounded-lg overflow-hidden mb-2 flex items-center justify-center bg-white border border-blue-200">
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps?q=${selectedCoords}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <span className="text-xs text-blue-700">Aperçu: 20 min de votre faculté</span>

            {/* Contact propriétaire */}
            <div className="mb-4 mt-4">
              <h5 className="font-semibold mb-1">Propriétaire</h5>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Foulen Ben Foulen"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">Foulen Ben Foulen</div>
                  <div className="text-sm text-muted-foreground">Real Estate Agent</div>
                  <div className="text-xs text-muted-foreground">Il y a 41 min</div>
                </div>
                <div className="flex gap-2 ml-auto">
                  <a
                    href="tel:+21612345678"
                    className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a
                    href="sms:+21612345678"
                    className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Avis étudiants */}
            <div className="mb-4">
              <h5 className="font-semibold mb-1">Avis des étudiants</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Foulena"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Foulena</div>
                    <div className="text-xs text-yellow-500">★★★★★</div>
                    <div className="text-xs text-muted-foreground">
                      Excellente expérience ! Le logement est très proche de l'université de Tunis, ce qui est idéal pour éviter les transports en commun bondés. Tout est propre, moderne et bien entretenu. Le propriétaire est réactif et arrangeant. Parfait pour les études, avec une connexion internet stable et un environnement calme pour se concentrer.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="Ahmed"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Ahmed</div>
                    <div className="text-xs text-yellow-500">★★★★☆</div>
                    <div className="text-xs text-muted-foreground">
                      Très bon logement, proche de tout. J'ai apprécié la proximité des supermarchés et des cafés, ce qui facilite la vie quotidienne. Le prix est raisonnable pour la qualité. Seul petit bémol : le parking est un peu étroit, mais rien de grave. Recommandé pour les étudiants en première année !
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button
                variant="default"
                size="lg"
                className="h-12 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600"
                onClick={() => navigate("/booking")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Planifier une visite
              </Button>
              <Button
                className="h-12 rounded-xl bg-primary text-white font-semibold"
                onClick={() => navigate("/payment")}
              >
                Louer Maintenant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;

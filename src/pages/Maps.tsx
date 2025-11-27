import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Correction des icônes Leaflet (Code standard) ---
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- Composant utilitaire pour déplacer la caméra de la carte ---
function FlyToLocation({ position }: { position: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, {
        duration: 1.5, // Animation fluide
      });
    }
  }, [position, map]);

  return null;
}

export default function Maps() {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [confirmedPosition, setConfirmedPosition] = useState<[number, number] | null>(null);

  const searchLocation = async () => {
    if (!query) return;

    try {
      // ✅ CORRECTION ICI : Pas de headers, paramètres dans l'URL
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1&accept-language=fr`
      );

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("Aucun résultat trouvé !");
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      setPosition([lat, lon]);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      alert("Une erreur est survenue lors de la recherche.");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      
      {/* 🌟 Boîte flottante */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "15px",
          width: "350px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        <h3 style={{ marginBottom: "10px", fontSize: "18px", fontWeight: 600 }}>
          📍 Rechercher un emplacement
        </h3>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Nabeul, Ariana, Manar..."
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
          onKeyDown={(e) => {
             if (e.key === "Enter") searchLocation();
          }}
        />

        <button
          onClick={searchLocation}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#3b82f6",
            color: "white",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          🔎 Chercher
        </button>

        {position && (
          <button
            onClick={() => setConfirmedPosition(position)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#10b981",
              color: "white",
              fontWeight: 600,
            }}
          >
            ✔ Confirmer cet emplacement
          </button>
        )}
      </div>

      {/* 🗺️ La carte */}
      <MapContainer
        center={[36.8, 10.17]} // Centre par défaut (Tunis)
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Composant pour recentrer la carte automatiquement */}
        {position && <FlyToLocation position={position} />}

        {/* Marker temporaire après recherche */}
        {position && (
          <Marker position={position}>
            <Popup>Résultat : {query}</Popup>
          </Marker>
        )}

        {/* Marker confirmé */}
        {confirmedPosition && (
          <Marker position={confirmedPosition}>
            <Popup>📍 Emplacement confirmé</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
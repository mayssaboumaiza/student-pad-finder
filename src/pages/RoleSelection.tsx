import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Building2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"student" | "owner" | null>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error("Veuillez sélectionner un rôle");
      return;
    }
    
    // Store the role selection
    localStorage.setItem("userRole", selectedRole);
    toast.success(`Vous continuez en tant que ${selectedRole === "student" ? "étudiant" : "propriétaire"}`);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 p-2 hover:bg-card rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Bienvenue sur DARI
          </h1>
          <p className="text-muted-foreground">
            Choisissez votre profil pour continuer
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedRole === "student"
                ? "ring-2 ring-primary shadow-lg scale-105 bg-gradient-to-br from-primary/10 to-primary/5"
                : "hover:scale-102"
            }`}
            onClick={() => setSelectedRole("student")}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl transition-colors ${
                selectedRole === "student"
                  ? "bg-gradient-primary text-white"
                  : "bg-muted text-foreground"
              }`}>
                <Home className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Étudiant</h3>
                <p className="text-sm text-muted-foreground">
                  Je cherche un logement ou un colocataire
                </p>
              </div>
              {selectedRole === "student" && (
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </Card>

          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedRole === "owner"
                ? "ring-2 ring-secondary shadow-lg scale-105 bg-gradient-to-br from-secondary/10 to-secondary/5"
                : "hover:scale-102"
            }`}
            onClick={() => setSelectedRole("owner")}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl transition-colors ${
                selectedRole === "owner"
                  ? "bg-secondary text-white"
                  : "bg-muted text-foreground"
              }`}>
                <Building2 className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Propriétaire</h3>
                <p className="text-sm text-muted-foreground">
                  Je propose un logement à louer
                </p>
              </div>
              {selectedRole === "owner" && (
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </Card>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full h-14 rounded-2xl text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;

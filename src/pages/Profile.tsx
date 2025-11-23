import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Settings,
  Heart,
  CreditCard,
  Bell,
  Info,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "student";

  const menuItems = [
    {
      icon: Settings,
      label: "Paramètres",
      onClick: () => toast.info("Paramètres - En développement"),
    },
    {
      icon: Heart,
      label: "Préférences",
      onClick: () => toast.info("Préférences - En développement"),
    },
    {
      icon: CreditCard,
      label: "Paiement",
      onClick: () => toast.info("Paiement - En développement"),
    },
    {
      icon: Bell,
      label: "Notification",
      onClick: () => navigate("/notifications"),
    },
    {
      icon: Info,
      label: "À propos",
      onClick: () => toast.info("À propos - En développement"),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    toast.success("Déconnexion réussie");
    navigate("/");
  };

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
          <h1 className="font-bold text-lg">Profil</h1>
          <div className="w-9" />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white/20">
            <div className="w-full h-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              BS
            </div>
          </Avatar>
          <h2 className="text-xl font-bold mb-1">Brooklyn Simmons</h2>
          <p className="text-white/80 text-sm">brooklynsim@gmail.com</p>
          {userRole === "owner" && (
            <div className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
              Propriétaire
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
              onClick={item.onClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
              </div>
            </Card>
          );
        })}

        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 mt-4"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Profile;

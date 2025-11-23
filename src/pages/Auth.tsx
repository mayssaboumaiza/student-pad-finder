import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !formData.acceptTerms) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      return;
    }

      // 👉 Construire l'objet user
    const userData = {
    name: formData.username || "Utilisateur",
    email: formData.email,
    phone: formData.phone || null,
    };

    // 👉 Sauvegarde dans localStorage
      localStorage.setItem("user", JSON.stringify(userData));

    toast.success(isLogin ? "Connexion réussie!" : "Compte créé avec succès!");
    navigate("/home");
  };

  const handleSocialAuth = (provider: string) => {
    toast.info(`Connexion avec ${provider}...`);
    setTimeout(() => navigate("/home"), 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-2xl font-bold mb-8">
          {isLogin ? "Se connecter" : "Créer un compte"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="brooklynsim@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="h-12"
            />
          </div>

          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Num de téléphone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-tight"
              >
                J'accepte les conditions d'utilisation et la politique de
                confidentialité
              </label>
            </div>
          )}

          <Button type="submit" className="w-full h-12 rounded-xl" size="lg">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">Ou</div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 rounded-xl"
              onClick={() => handleSocialAuth("Facebook")}
            >
              <span className="text-blue-600 font-semibold">f</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 rounded-xl"
              onClick={() => handleSocialAuth("Google")}
            >
              <span className="font-semibold text-foreground">G</span>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Vous n'avez pas un compte ? " : "Vous avez déjà un compte ? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium"
            >
              {isLogin ? "S'inscrire" : "Se Connecter"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;

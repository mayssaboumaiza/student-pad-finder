// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff, User, Home } from "lucide-react";
import { toast } from "sonner";
import { useAuth, UserRole } from "@/pages/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    acceptTerms: false,
  });

  // Récupérer le rôle sélectionné depuis localStorage au chargement
  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole') as UserRole;
    if (savedRole) {
      setSelectedRole(savedRole);
    } else {
      // Si pas de rôle sélectionné, rediriger vers la sélection
      navigate('/role-selection');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !formData.acceptTerms) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      return;
    }

    if (!isLogin && !formData.username) {
      toast.error("Veuillez remplir ce champ.");
      return;
    }

    try {
      if (isLogin) {
        // Mode connexion
        await login(formData.email, formData.password, selectedRole);
        toast.success("Connexion réussie!");
      } else {
        // Mode inscription
        const userData = {
          name: formData.username,
          email: formData.email,
          phone: formData.phone || null,
          role: selectedRole,
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Compte créé avec succès!");
        
        // Redirection selon le rôle
        if (selectedRole === "proprietaire") {
          navigate("/proprietaire/home");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion");
    }
  };

  const handleSocialAuth = (provider: string) => {
    toast.info(`Connexion avec ${provider}...`);
    setTimeout(() => {
      if (selectedRole === "proprietaire") {
        navigate("/proprietaire/home");
      } else {
        navigate("/home");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/role-selection')}
          className="mb-8 p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-2xl font-bold mb-8">
          {isLogin ? "Se connecter" : "Créer un compte"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Afficher le rôle sélectionné (non modifiable) */}
          <div className="space-y-2">
            <Label>Je me connecte en tant que :</Label>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${
                  selectedRole === "student"
                    ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/20"
                    : "border-border opacity-50"
                }`}
              >
                <User className={`w-6 h-6 ${selectedRole === "student" ? "text-cyan-500" : "text-muted-foreground"}`} />
                <span className={`font-medium text-sm ${selectedRole === "student" ? "text-cyan-500" : "text-muted-foreground"}`}>
                  Étudiant
                </span>
              </div>

              <div
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${
                  selectedRole === "proprietaire"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                    : "border-border opacity-50"
                }`}
              >
                <Home className={`w-6 h-6 ${selectedRole === "proprietaire" ? "text-purple-500" : "text-muted-foreground"}`} />
                <span className={`font-medium text-sm ${selectedRole === "proprietaire" ? "text-purple-500" : "text-muted-foreground"}`}>
                  Propriétaire
                </span>
              </div>
            </div>
          </div>

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
                {!formData.username && !isLogin && (
                  <p className="text-xs text-destructive">Veuillez remplir ce champ.</p>
                )}
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

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500" 
            size="lg"
          >
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
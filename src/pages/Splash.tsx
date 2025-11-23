import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="animate-in fade-in zoom-in duration-700">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-8">
          <Home className="w-16 h-16 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          DARI <span className="text-sm align-super text-muted-foreground">TN</span>
        </h1>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          L'APP #1 POUR LES ÉTUDIANTS<br />EN QUÊTE DE LOGEMENT.
        </p>
      </div>
    </div>
  );
};

export default Splash;

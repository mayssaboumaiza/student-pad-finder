import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import onboarding1 from "@/assets/onboarding-1.jpg";
import onboarding2 from "@/assets/onboarding-2.jpg";
import onboarding3 from "@/assets/onboarding-3.jpg";

const onboardingData = [
  {
    image: onboarding1,
    title: "Trouve ton logement parfait",
    subtitle: "sans galère !",
    description: "Découvre des logements, proches de ta fac et adaptés à ton budget étudiant.",
  },
  {
    image: onboarding2,
    title: "Gère ton bien facilement",
    subtitle: "et gagne du temps.",
    description: "Ajoute ton appartement. Nie ton loyer, et construis une liste d'attente parmi des centaines d'étudiants vérifiés.",
  },
  {
    image: onboarding3,
    title: "Trouve ton coloc parfait",
    subtitle: "",
    description: "Grâce à notre quiz de compatibilité, Dari te met en contact avec des étudiants qui partagent ton rythme, ton budget et ton style de vie.",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  const current = onboardingData[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto w-full">
        <button
          onClick={handleSkip}
          className="self-end text-sm text-muted-foreground mb-8"
        >
          Passer
        </button>

        <div className="relative w-full aspect-[4/3] mb-12 overflow-hidden rounded-[3rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-[3rem]" />
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover rounded-[3rem] mix-blend-multiply"
          />
        </div>

        <div className="text-center mb-12 space-y-3">
          <h2 className="text-2xl font-bold">
            {current.title}{" "}
            {current.subtitle && (
              <>
                <br />
                <span className="font-bold">{current.subtitle}</span>
              </>
            )}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {current.description}
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-primary"
                  : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full max-w-sm h-12 rounded-xl text-base"
          size="lg"
        >
          {currentStep < onboardingData.length - 1 ? "Suivant" : "Commencer"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

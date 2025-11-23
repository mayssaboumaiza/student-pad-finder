import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "Tu es plutôt :",
    options: ["Matinal", "Couche-tard"],
  },
  {
    question: "Préféres-tu un logement :",
    options: ["Calme", "Animé"],
  },
  {
    question: "Ton niveau de sociabilité :",
    options: ["Très sociable", "Discret"],
  },
  {
    question: "Es-tu fumeur ?",
    options: ["Oui", "Non"],
  },
  {
    question: "As-tu des animaux ?",
    options: ["Oui", "Non"],
  },
  {
    question: "Ton rythme de vie :",
    options: ["Régulier", "Flexible"],
  },
  {
    question: "Es-tu organisé ?",
    options: ["Oui", "Non"],
  },
  {
    question: "Préféres-tu partager les repas ?",
    options: ["Oui", "Non"],
  },
  {
    question: "Ton mode de transport principal :",
    options: ["Voiture", "Transports en commun", "Vélo", "Marche"],
  },
  {
    question: "Es-tu ouvert à la colocation mixte ?",
    options: ["Oui", "Non"],
  },
  {
    question: "Ton niveau de tolérance au bruit :",
    options: ["Faible", "Moyen", "Élevé"],
  },
  {
    question: "Combien d'heures passes-tu à la maison par jour ?",
    options: ["Moins de 4h", "4-8h", "Plus de 8h"],
  },
];

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setAnswers([...answers, option]);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Fin du quiz, retour à Explorer avec compatibilité
      navigate("/explore?quiz=done");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-center">Quiz de matching</h2>
        <div className="mb-4 text-center font-semibold">Question {step + 1}/{questions.length}</div>
        <div className="mb-6 text-center text-lg">{questions[step].question}</div>
        <div className="flex flex-col gap-4">
          {questions[step].options.map(option => (
            <Button key={option} className="w-full h-12 rounded-xl bg-primary text-white font-semibold" onClick={() => handleOptionClick(option)}>
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

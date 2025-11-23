import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Payment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // Simule l'envoi d'un email de confirmation
  const sendConfirmationEmail = () => {
    // Ici tu pourrais utiliser EmailJS, une API backend, etc.
    setConfirmation("Un email de confirmation de paiement a été envoyé.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-6 text-center">Ajouter Carte</h2>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-6 text-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Credit Card</span>
                <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="mastercard" className="w-8 h-8" />
              </div>
              <div className="text-lg tracking-widest mb-2">{cardNumber || "1234 5678 9101 1121"}</div>
              <div className="flex justify-between text-sm">
                <span>{cardName || "Nom sur la carte"}</span>
                <span>{expiry || "06/21"}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nom et prénom</label>
              <input type="text" className="w-full border rounded-lg p-2" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Nom sur la carte" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Numéro de carte</label>
              <input type="text" className="w-full border rounded-lg p-2" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9101 1121" />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Date d'expiration</label>
                <input type="text" className="w-full border rounded-lg p-2" value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Cvv</label>
                <input type="text" className="w-full border rounded-lg p-2" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="CVV" />
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl bg-primary text-white font-semibold" onClick={() => setStep(2)}>
              Ajouter carte
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-6 text-center">Paiement</h2>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="mastercard" className="w-8 h-8" />
              <span className="font-semibold">•••• {cardNumber.slice(-4) || "3321"}</span>
              <button className="ml-auto text-blue-500 underline text-sm" onClick={() => setStep(1)}>Edit</button>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Détails de paiement</div>
              <div className="flex justify-between text-sm mb-1"><span>Période</span><span>1 Mois</span></div>
              <div className="flex justify-between text-sm mb-1"><span>Paiement / mois</span><span>320.00 DT</span></div>
              <div className="flex justify-between text-sm mb-1"><span>Tax</span><span>10.00 DT</span></div>
              <div className="flex justify-between text-lg font-bold mt-2"><span>Total</span><span className="text-primary">330.00 DT</span></div>
            </div>
            <Button className="w-full h-12 rounded-xl bg-primary text-white font-semibold" onClick={() => sendConfirmationEmail()}>
              Confirmer le paiement
            </Button>
            {confirmation && (
              <div className="mt-4 text-green-600 text-center font-semibold">{confirmation}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;

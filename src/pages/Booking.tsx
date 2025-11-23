import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const timeSlots = [
  "10:00 - 11:00",
  "11:30 - 12:30",
  "14:00 - 15:00",
  "17:30 - 18:30",
];

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");
  const navigate = useNavigate();

  // Simule l'envoi d'une notification au propriétaire
  const sendOwnerNotification = () => {
    const notifications = JSON.parse(localStorage.getItem('ownerNotifications') || '[]');
    notifications.push({
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('ownerNotifications', JSON.stringify(notifications));
  };

  // Simple calendar for October 2025
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <button onClick={() => navigate(-1)} className="mb-4 p-2">
          <span className="text-lg">←</span>
        </button>
        <h1 className="text-xl font-bold mb-6 text-center">Planifier visite</h1>
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">Choisir date</h2>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Calendrier</span>
            </div>
            <div className="mb-6">
              <div className="text-sm font-semibold mb-2">Octobre 2025</div>
              <div className="grid grid-cols-7 gap-2">
                {days.map(day => (
                  <button
                    key={day}
                    className={`rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm transition-all
                      ${selectedDate === String(day) ? "bg-primary text-white" : day === 6 || day === 7 || day === 8 ? "bg-red-400 text-white" : "bg-gray-100 text-gray-700"}`}
                    onClick={() => setSelectedDate(String(day))}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <Button
              className="w-full h-12 rounded-xl bg-primary text-white font-semibold"
              onClick={() => selectedDate && setStep(2)}
              disabled={!selectedDate}
            >
              Suivant
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">Choisir l'heure</h2>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Calendrier</span>
            </div>
            <div className="mb-6">
              <div className="text-sm font-semibold mb-2">Choisissez le créneau qui vous convient :</div>
              <div className="grid grid-cols-2 gap-4">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    className={`rounded-full border w-full py-2 font-semibold text-sm transition-all
                      ${selectedTime === slot ? "bg-primary text-white border-primary" : "bg-gray-100 text-gray-700 border-gray-300"}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-4 text-center">
              Certains créneaux peuvent ne plus être disponibles, tu recevras une confirmation du propriétaire après ta demande.
            </div>
            <Button
              className="w-full h-12 rounded-xl bg-primary text-white font-semibold"
              onClick={() => {
                if (selectedTime) {
                  sendOwnerNotification();
                  setConfirmation("Votre demande de visite a été envoyée au propriétaire. Vous recevrez une réponse bientôt.");
                  setStep(3);
                }
              }}
              disabled={!selectedTime}
            >
              Enregistrer
            </Button>
          </>
        )}
        {step === 3 && (
          <div className="text-center mt-6">
            <div className="text-green-600 font-semibold mb-2">{confirmation}</div>
            <Button className="mt-4" onClick={() => navigate(-1)}>Retour</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;

// src/pages/proprietaire/Visites.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Clock, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  status: 'available' | 'reserved';
  bookedBy?: string;
}

const Visites = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 6)); // Oct 6, 2025
  const [selectedTime, setSelectedTime] = useState('11:38');
  const [addSlotOpen, setAddSlotOpen] = useState(false);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      date: 'Jeudi 15 Nov',
      time: '10h-11h',
      status: 'available',
    },
    {
      id: '2',
      date: 'Jeudi 15 Nov',
      time: '15h-16h',
      status: 'reserved',
      bookedBy: 'Foulen Ben Foulen',
    },
  ]);

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleAddSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      date: selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' }),
      time: `${selectedTime}-${parseInt(selectedTime.split(':')[0]) + 1}h`,
      status: 'available',
    };
    setTimeSlots([...timeSlots, newSlot]);
    setAddSlotOpen(false);
    toast.success('Créneau ajouté avec succès');
  };

  const handleDeleteSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    toast.success('Créneau supprimé');
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Visites</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Add Button */}
      <div className="p-6">
        <Dialog open={addSlotOpen} onOpenChange={setAddSlotOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-12 text-base">
              Ajouter un créneau
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un créneau</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Calendar */}
              <div>
                <Label className="text-base mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Calendrier
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Mettre l'heure dans votre calendrier
                </p>

                {/* Month Navigator */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 hover:bg-secondary rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </h3>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-2 hover:bg-secondary rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(selectedDate).map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                      disabled={!day}
                      className={`aspect-square rounded-lg text-sm ${
                        day === 6 && selectedDate.getMonth() === 9
                          ? 'bg-primary text-primary-foreground'
                          : day
                          ? 'hover:bg-secondary'
                          : 'invisible'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Picker */}
              <div>
                <Label className="text-base mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Heure
                </Label>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">{selectedTime}</div>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border bg-background"
                  />
                </div>
              </div>

              <Button onClick={handleAddSlot} className="w-full h-12">
                Confirmer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des créneaux */}
      <div className="px-6">
        <h2 className="text-lg font-semibold mb-4">Liste des créneaux existants :</h2>
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-card rounded-xl p-4 border shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{slot.date}</p>
                  <p className="text-sm text-muted-foreground">{slot.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slot.status === 'available'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    {slot.status === 'available' ? 'Disponible' : 'Réservé'}
                  </span>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="p-1 hover:bg-destructive/10 rounded-lg text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {slot.bookedBy && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Dar P Auter
                  </p>
                  <button className="text-xs text-primary hover:underline">
                    Voir profil
                  </button>
                </div>
              )}
              {slot.status === 'available' && (
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    Supprimer
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visites;
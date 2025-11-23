import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  CreditCard,
  Info,
  LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const defaultUser = {
    initials: "BS",
    name: "Brooklyn Simmons",
    email: "brooklynsim@gmail.com",
    preferences: "Préférences affichées ici (ex: notifications, thèmes, etc.)",
    paymentHistory: [
      { date: "2025-10-01", amount: "830 DT", status: "Payé" },
      { date: "2025-09-01", amount: "830 DT", status: "Payé" },
    ],
    about: "Étudiant en informatique, passionné de colocation et de voyages."
  };
  let user = defaultUser;
  try {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      user = {
        ...defaultUser,
        ...parsed,
        initials: parsed.name ? parsed.name.split(' ').map(n => n[0]).join('').toUpperCase() : defaultUser.initials,
        name: parsed.name || defaultUser.name,
        email: parsed.email || defaultUser.email,
      };
    }
  } catch {}
  const [section, setSection] = useState<'main'|'payment'|'preferences'|'about'|'settings'|'notification'>('main');
  const [aboutEdit, setAboutEdit] = useState(user.about);
  const [aboutSaved, setAboutSaved] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-primary text-white p-6 rounded-b-3xl flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-2">
          {user.initials}
        </div>
        <h2 className="font-bold text-2xl">{user.name}</h2>
        <div className="text-white/80 text-sm mb-2">{user.email}</div>
      </div>
      <div className="px-4 pt-6">
        {section === 'main' && (
          <div className="space-y-4">
            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection('settings')}>
              <Info className="w-6 h-6 text-primary" />
              <span className="flex-1">Paramètres</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>
            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection('preferences')}>
              <Heart className="w-6 h-6 text-primary" />
              <span className="flex-1">Préférences</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>
            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection('payment')}>
              <CreditCard className="w-6 h-6 text-primary" />
              <span className="flex-1">Paiement</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>
            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection('notification')}>
              <Info className="w-6 h-6 text-primary" />
              <span className="flex-1">Notification</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>
            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection('about')}>
              <Info className="w-6 h-6 text-primary" />
              <span className="flex-1">À propos</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </div>
        )}
        {section === 'preferences' && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection('main')}><ArrowLeft className="inline w-4 h-4 mr-1" /> Retour</button>
            <h3 className="font-bold text-lg mb-2">Préférences</h3>
            <div className="bg-card rounded-lg p-4">{user.preferences}</div>
          </div>
        )}
        {section === 'payment' && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection('main')}><ArrowLeft className="inline w-4 h-4 mr-1" /> Retour</button>
            <h3 className="font-bold text-lg mb-2">Historique de paiement</h3>
            <div className="bg-card rounded-lg p-4">
              {user.paymentHistory.map((p, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                  <span>{p.date}</span>
                  <span>{p.amount}</span>
                  <span className="text-green-600 font-semibold">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {section === 'about' && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection('main')}><ArrowLeft className="inline w-4 h-4 mr-1" /> Retour</button>
            <h3 className="font-bold text-lg mb-2">À propos</h3>
            <div className="bg-card rounded-lg p-4">
              <textarea
                className="w-full p-2 rounded border"
                rows={4}
                value={aboutEdit}
                onChange={e => { setAboutEdit(e.target.value); setAboutSaved(false); }}
              />
              <Button className="mt-2" onClick={() => { setAboutSaved(true); user.about = aboutEdit; }}>Sauvegarder</Button>
              {aboutSaved && <div className="text-green-600 mt-2">À propos mis à jour !</div>}
            </div>
          </div>
        )}
              {section === 'settings' && (
                <div className="space-y-4">
                  <button className="mb-4" onClick={() => setSection('main')}><ArrowLeft className="inline w-4 h-4 mr-1" /> Retour</button>
                  <h3 className="font-bold text-lg mb-2">Paramètres</h3>
                  <div className="bg-card rounded-lg p-4">Paramètres du compte (à personnaliser)</div>
                </div>
              )}
              {section === 'notification' && (
                <div className="space-y-4">
                  <button className="mb-4" onClick={() => setSection('main')}><ArrowLeft className="inline w-4 h-4 mr-1" /> Retour</button>
                  <h3 className="font-bold text-lg mb-2">Notification</h3>
                  <div className="bg-card rounded-lg p-4">Paramètres de notification (à personnaliser)</div>
                </div>
              )}
      </div>
      <div className="px-4 pt-6">
        <button className="text-red-500 font-semibold flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;

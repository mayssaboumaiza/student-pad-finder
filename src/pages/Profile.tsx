// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight, Heart, CreditCard, Info, LogOut } from "lucide-react";
import { toast } from "sonner";

/**
 * Profile page with sections:
 * - main (menu)
 * - settings (personal info + security)
 * - preferences (user preferences)
 * - payment (cards + history)
 * - notification (toggles)
 * - about (editable about + app info)
 *
 * Uses localStorage to persist data for demo purposes.
 */

// Types
type PaymentEntry = { date: string; amount: string; status: string };
type PreferencesState = {
  budget?: string;
  types?: string[]; // ex: ['Studio', 'S+1']
  cities?: string[]; // favorites
  darkMode?: boolean;
  viewMode?: "list" | "map";
};
type NotificationSettings = {
  push: boolean;
  email: boolean;
  messages: boolean;
  offers: boolean;
};

type UserState = {
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  about?: string;
  paymentHistory: PaymentEntry[];
  preferences: PreferencesState;
  notifications: NotificationSettings;
};

const AVATAR_PLACEHOLDER = "/mnt/data/511dfa6c-5276-4be3-8a5c-e434587a82ff.png";

const defaultUser: UserState = {
  name: "Brooklyn Simmons",
  email: "brooklynsim@gmail.com",
  phone: null,
  avatarUrl: AVATAR_PLACEHOLDER,
  about: "Étudiant en informatique, passionné de colocation et de voyages.",
  paymentHistory: [
    { date: "2025-10-01", amount: "830 DT", status: "Payé" },
    { date: "2025-09-01", amount: "830 DT", status: "Payé" },
  ],
  preferences: {
    budget: "≤ 1000 DT",
    types: ["Studio", "S+1"],
    cities: ["Tunis", "Sfax"],
    darkMode: false,
    viewMode: "list",
  },
  notifications: {
    push: true,
    email: true,
    messages: true,
    offers: false,
  },
};

const storageKey = "app_user_v1";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // UI section
  const [section, setSection] = useState<
    "main" | "settings" | "preferences" | "payment" | "notification" | "about"
  >("main");

  // User data state
  const [user, setUser] = useState<UserState>(defaultUser);

  // Local edit states for forms
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAbout, setEditAbout] = useState("");
  const [addingCardNumber, setAddingCardNumber] = useState("");
  const [addingCardName, setAddingCardName] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<UserState>;
        setUser((prev) => ({ ...prev, ...parsed }));
      } else {
        // If no stored user, also try legacy 'user' key used by your auth (optional)
        const legacy = localStorage.getItem("user");
        if (legacy) {
          const parsedLegacy = JSON.parse(legacy);
          setUser((prev) => ({
            ...prev,
            name: parsedLegacy.name || prev.name,
            email: parsedLegacy.email || prev.email,
            phone: parsedLegacy.phone || prev.phone,
          }));
        }
      }
    } catch (e) {
      console.error("Failed to load user from storage", e);
    }
  }, []);

  // Sync saved user into edit fields when user changes (open settings/about)
  useEffect(() => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone || "");
    setEditAbout(user.about || "");
  }, [user]);

  // Helper to persist user to localStorage
  const persist = (nextUser: UserState) => {
    setUser(nextUser);
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextUser));
    } catch (e) {
      console.error("Failed to persist user", e);
    }
  };

  // Save settings
  const saveSettings = () => {
    persist({ ...user, name: editName || user.name, email: editEmail || user.email, phone: editPhone || null });
    toast.success("Paramètres enregistrés");
    setSection("main");
  };

  // Save about
  const saveAbout = () => {
    persist({ ...user, about: editAbout });
    toast.success("À propos mis à jour");
  };

  // Preferences handlers
  const togglePrefDark = (v: boolean) => {
    const next = { ...user, preferences: { ...user.preferences, darkMode: v } };
    persist(next);
  };

  const setBudget = (b: string) => {
    const next = { ...user, preferences: { ...user.preferences, budget: b } };
    persist(next);
  };

  // Notification toggles
  const toggleNotification = (key: keyof NotificationSettings, value: boolean) => {
    const next = { ...user, notifications: { ...user.notifications, [key]: value } };
    persist(next);
  };

  // Payment: fake add card (just creates a fake payment entry)
  const addFakePayment = () => {
    if (!addingCardName || !addingCardNumber) {
      toast.error("Remplis le nom et le numéro de la carte (factice)");
      return;
    }
    const newEntry: PaymentEntry = {
      date: new Date().toISOString().slice(0, 10),
      amount: "0 DT (méthode ajoutée)",
      status: "Ajouté",
    };
    const next = { ...user, paymentHistory: [newEntry, ...user.paymentHistory] };
    persist(next);
    setAddingCardName("");
    setAddingCardNumber("");
    toast.success("Moyen de paiement ajouté (factice)");
  };

  // Remove payment history entry
  const removePaymentEntry = (idx: number) => {
    const next = { ...user, paymentHistory: user.paymentHistory.filter((_, i) => i !== idx) };
    persist(next);
    toast.success("Entrée supprimée");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(storageKey);
    // Optionally keep legacy 'user' if you want to simulate persistent login; here we clear it:
    localStorage.removeItem("user");
    toast.success("Déconnecté");
    navigate("/auth");
  };

  // Compute initials
  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 rounded-b-3xl flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-2 overflow-hidden">
          {/* If Avatar component supports src */}
          <Avatar>
            {/* If Avatar doesn't use children, replace by an <img> with src */}
            <img src={user.avatarUrl || AVATAR_PLACEHOLDER} alt="avatar" className="w-full h-full object-cover" />
          </Avatar>
        </div>
        <h2 className="font-bold text-2xl">{user.name}</h2>
        <div className="text-white/80 text-sm mb-2">{user.email}</div>
      </div>

      <div className="px-4 pt-6 max-w-3xl mx-auto">
        {/* MAIN MENU */}
        {section === "main" && (
          <div className="space-y-4">
            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection("settings")}>
              <Info className="w-6 h-6 text-primary" />
              <span className="flex-1">Paramètres</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection("preferences")}>
              <Heart className="w-6 h-6 text-primary" />
              <span className="flex-1">Préférences</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection("payment")}>
              <CreditCard className="w-6 h-6 text-primary" />
              <span className="flex-1">Paiement</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection("notification")}>
              <Info className="w-6 h-6 text-primary" />
              <span className="flex-1">Notification</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            <Card className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setSection("about")}>
              <Info className="w-6 h-6 text-primary" />
              <span className="flex-1">À propos</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </div>
        )}

        {/* SETTINGS */}
        {section === "settings" && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection("main")}>
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Retour
            </button>

            <h3 className="font-bold text-lg mb-2">Paramètres</h3>

            <div className="bg-card rounded-lg p-4 space-y-4">
              <div>
                <Label>Nom complet</Label>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-1" />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="mt-1" type="email" />
              </div>

              <div>
                <Label>Téléphone</Label>
                <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="mt-1" />
              </div>

              <div className="flex gap-2">
                <Button onClick={saveSettings}>Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditName(user.name); setEditEmail(user.email); setEditPhone(user.phone || ""); }}>
                  Annuler
                </Button>
              </div>

              <hr />

              <div>
                <h4 className="font-semibold mb-2">Sécurité</h4>
                <p className="text-sm text-muted-foreground mb-2">Changer mot de passe</p>
                <div className="flex gap-2">
                  <Input placeholder="Ancien mot de passe" type="password" />
                  <Input placeholder="Nouveau mot de passe" type="password" />
                  <Button onClick={() => toast("Mot de passe mis à jour (demo)")}>Modifier</Button>
                </div>
              </div>
              <div>
                <Button variant="destructive" onClick={() => {
                  if (confirm("Supprimer ton compte et toutes les données locales ? (irréversible pour cette demo)")) {
                    localStorage.removeItem(storageKey);
                    localStorage.removeItem("user");
                    toast.success("Compte supprimé (local)");
                    navigate("/auth");
                  }
                }}>
                  Supprimer le compte
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* PREFERENCES */}
        {section === "preferences" && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection("main")}>
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Retour
            </button>

            <h3 className="font-bold text-lg mb-2">Préférences</h3>

            <div className="bg-card rounded-lg p-4 space-y-4">
              <div>
                <Label>Budget</Label>
                <div className="flex gap-2 mt-2">
                  {["≤ 500 DT", "≤ 1000 DT", "≤ 1500 DT", "Libre"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-1 rounded ${user.preferences.budget === b ? "bg-primary text-white" : "bg-gray-100"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Types de logement préférés</Label>
                <div className="flex gap-2 mt-2">
                  {["Studio", "S+1", "S+2", "Appartement"].map((t) => {
                    const active = user.preferences.types?.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => {
                          const set = new Set(user.preferences.types || []);
                          if (set.has(t)) set.delete(t); else set.add(t);
                          persist({ ...user, preferences: { ...user.preferences, types: Array.from(set) } });
                        }}
                        className={`px-3 py-1 rounded ${active ? "bg-primary text-white" : "bg-gray-100"}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Villes favorites</Label>
                <div className="flex gap-2 mt-2">
                  {["Tunis", "Sfax", "Sousse", "Gabès"].map((c) => {
                    const active = user.preferences.cities?.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => {
                          const set = new Set(user.preferences.cities || []);
                          if (set.has(c)) set.delete(c); else set.add(c);
                          persist({ ...user, preferences: { ...user.preferences, cities: Array.from(set) } });
                        }}
                        className={`px-3 py-1 rounded ${active ? "bg-primary text-white" : "bg-gray-100"}`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Affichage</Label>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => persist({ ...user, preferences: { ...user.preferences, viewMode: "list" } })}
                    className={`px-3 py-1 rounded ${user.preferences.viewMode === "list" ? "bg-primary text-white" : "bg-gray-100"}`}
                  >
                    Liste
                  </button>
                  <button
                    onClick={() => persist({ ...user, preferences: { ...user.preferences, viewMode: "map" } })}
                    className={`px-3 py-1 rounded ${user.preferences.viewMode === "map" ? "bg-primary text-white" : "bg-gray-100"}`}
                  >
                    Carte
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT */}
        {section === "payment" && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection("main")}>
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Retour
            </button>

            <h3 className="font-bold text-lg mb-2">Paiement</h3>

            <div className="bg-card rounded-lg p-4 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Ajouter une méthode de paiement</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input placeholder="Nom sur la carte" value={addingCardName} onChange={(e) => setAddingCardName(e.target.value)} />
                  <Input placeholder="Numéro de carte" value={addingCardNumber} onChange={(e) => setAddingCardNumber(e.target.value)} />
                  <Button onClick={addFakePayment}>Ajouter</Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Historique de paiement</h4>
                <div className="space-y-2">
                  {user.paymentHistory.length === 0 && <div className="text-sm text-muted-foreground">Aucune opération.</div>}
                  {user.paymentHistory.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b py-2">
                      <div>
                        <div className="font-medium">{p.date}</div>
                        <div className="text-sm text-muted-foreground">{p.amount}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`text-sm font-semibold ${p.status === "Payé" ? "text-green-600" : "text-amber-600"}`}>{p.status}</div>
                        <Button variant="ghost" onClick={() => removePaymentEntry(idx)}>Supprimer</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATION */}
        {section === "notification" && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection("main")}>
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Retour
            </button>

            <h3 className="font-bold text-lg mb-2">Notifications</h3>

            <div className="bg-card rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Notifications push</div>
                  <div className="text-sm text-muted-foreground">Recevoir des alertes sur l'app</div>
                </div>
                <Switch checked={user.notifications.push} onCheckedChange={(v) => toggleNotification("push", !!v)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Notifications par email</div>
                  <div className="text-sm text-muted-foreground">Recevoir des emails</div>
                </div>
                <Switch checked={user.notifications.email} onCheckedChange={(v) => toggleNotification("email", !!v)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Nouveaux messages</div>
                  <div className="text-sm text-muted-foreground">Alertes quand tu reçois un message</div>
                </div>
                <Switch checked={user.notifications.messages} onCheckedChange={(v) => toggleNotification("messages", !!v)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Promotions & Offres</div>
                  <div className="text-sm text-muted-foreground">Recevoir des promotions</div>
                </div>
                <Switch checked={user.notifications.offers} onCheckedChange={(v) => toggleNotification("offers", !!v)} />
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {section === "about" && (
          <div className="space-y-4">
            <button className="mb-4" onClick={() => setSection("main")}>
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Retour
            </button>

            <h3 className="font-bold text-lg mb-2">À propos</h3>

            <div className="bg-card rounded-lg p-4 space-y-4">
              <div>
                <Label>À propos de toi</Label>
                <textarea
                  className="w-full p-2 rounded border mt-2"
                  rows={4}
                  value={editAbout}
                  onChange={(e) => setEditAbout(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <Button onClick={saveAbout}>Sauvegarder</Button>
                  <Button variant="outline" onClick={() => setEditAbout(user.about || "")}>Annuler</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer logout */}
        <div className="px-4 pt-6">
          <button
            onClick={logout}
            className="text-red-500 font-semibold flex items-center gap-2"
            aria-label="Se déconnecter"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

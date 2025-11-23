import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, Bell, MessageSquare, Calendar, Home } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "visit",
    icon: Calendar,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Visite du 11/11/2025 à 10h",
    description: "Votre visite du 11/11/2025 à 10h pour le logement Dar Trad a été refusée. Essayez un autre créneau !",
    time: "Aujourd'hui",
    read: false,
  },
  {
    id: 2,
    type: "visit",
    icon: Calendar,
    color: "text-success",
    bg: "bg-success/10",
    title: "Visite du 11/11/2025 à 12h",
    description: "Votre visite du 11/11/2025 à 12h pour le logement Dar El Anbar a été acceptée. Merci de vous présenter à l'heure indiquée pour la visite.",
    time: "Aujourd'hui",
    read: false,
  },
  {
    id: 3,
    type: "message",
    icon: MessageSquare,
    color: "text-secondary",
    bg: "bg-secondary/10",
    title: "Anggela et Joni",
    description: "vous a envoyé un message",
    time: "Hier",
    read: true,
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">Notifications</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Today */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Aujourd'hui
          </h2>
          {notifications
            .filter((n) => n.time === "Aujourd'hui")
            .map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`p-4 mb-3 cursor-pointer hover:shadow-md transition-all ${
                    !notification.read ? "border-l-4 border-l-primary" : ""
                  }`}
                  onClick={() => {
                    if (notification.type === "message") {
                      navigate("/messages");
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div
                      className={`p-3 rounded-xl ${notification.bg} flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>

        {/* Yesterday */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Hier
          </h2>
          {notifications
            .filter((n) => n.time === "Hier")
            .map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className="p-4 mb-3 cursor-pointer hover:shadow-md transition-all opacity-80"
                  onClick={() => {
                    if (notification.type === "message") {
                      navigate("/messages");
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center text-lg font-semibold text-primary">
                          A
                        </div>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

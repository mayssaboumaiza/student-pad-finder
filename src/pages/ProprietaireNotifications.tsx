// src/pages/proprietaire/ProprietaireNotifications.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, UserCheck } from 'lucide-react';

interface Notification {
  id: string;
  type: 'inspection' | 'rental' | 'message';
  title: string;
  message: string;
  time: string;
  date: string;
  isNew: boolean;
  avatar?: string;
}

const ProprietaireNotifications = () => {
  const navigate = useNavigate();

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'inspection',
      title: 'Foulen El Fouleni',
      message: 'veut inspecter votre logement Dar Anbar le 10/11/2025 à 15h.',
      time: '15h',
      date: "Aujourd'hui",
      isNew: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foulen',
    },
    {
      id: '2',
      type: 'rental',
      title: 'Foulena El Foulenia',
      message: 'réside dans le Dar El Menzah payé le loyer de ce mois.',
      time: '15h',
      date: 'Hier',
      isNew: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foulena',
    },
    {
      id: '3',
      type: 'message',
      title: 'Anggela and joni',
      message: 'vous a envoyé un message',
      time: '',
      date: 'Hier',
      isNew: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anggela',
    },
  ]);

  const groupedNotifications = notifications.reduce((acc, notif) => {
    if (!acc[notif.date]) {
      acc[notif.date] = [];
    }
    acc[notif.date].push(notif);
    return acc;
  }, {} as Record<string, Notification[]>);

  const getIcon = (type: string) => {
    switch (type) {
      case 'inspection':
        return <Home className="w-5 h-5" />;
      case 'rental':
        return <UserCheck className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Notifications</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-6">
        {Object.entries(groupedNotifications).map(([date, notifs]) => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold mb-4">{date}</h2>
            <div className="space-y-3">
              {notifs.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-card rounded-xl p-4 border shadow-sm ${
                    notification.isNew ? 'border-primary/50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt={notification.title}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        {getIcon(notification.type)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-sm">
                          {notification.title}
                        </p>
                        {notification.time && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProprietaireNotifications;
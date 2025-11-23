import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Foulen Ben Foulen",
    lastMessage: "Bonjour, je suis intéressé par votre logement",
    time: "10:30",
    unread: 2,
    avatar: "F",
  },
  {
    id: 2,
    name: "Anggela et Joni",
    lastMessage: "Merci pour votre réponse rapide!",
    time: "Hier",
    unread: 0,
    avatar: "A",
  },
  {
    id: 3,
    name: "John D.",
    lastMessage: "Est-ce que le logement est toujours disponible?",
    time: "12/11",
    unread: 1,
    avatar: "J",
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg">Messages</h1>
            <div className="w-9" />
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-4 space-y-3">
        {filteredConversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="p-4 cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
            onClick={() => navigate(`/chat/${conversation.id}`)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-xl font-semibold text-white">
                    {conversation.avatar}
                  </div>
                </Avatar>
                {conversation.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {conversation.unread}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {conversation.time}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    conversation.unread > 0
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;

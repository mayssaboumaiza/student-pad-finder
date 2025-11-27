// src/pages/proprietaire/Chat.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assurez-vous d'avoir ce composant Input

interface Message {
    id: number;
    text: string;
    sender: 'owner' | 'student';
    timestamp: string;
}

const Chat = () => {
    const navigate = useNavigate();
    
    // Simuler le nom de la personne avec qui on chat
    const conversationPartner = "Sophie Dubois"; 
    
    // Simuler les messages
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Bonjour Sophie, votre demande de visite a bien été reçue. Êtes-vous disponible vendredi après-midi ?", sender: 'owner', timestamp: '14:30' },
        { id: 2, text: "Bonjour ! Oui, vendredi après-midi serait parfait. Vers 16h serait idéal pour moi.", sender: 'student', timestamp: '14:35' },
        { id: 3, text: "Parfait, nous confirmons la visite de l'appartement Lac 2 pour vendredi à 16h00. Au plaisir !", sender: 'owner', timestamp: '14:40' },
    ]);

    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputMessage,
                sender: 'owner', // Le propriétaire envoie le message
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
            // Idéalement, scroll vers le bas après l'envoi
            // (Nécessiterait useRef et useEffect pour une implémentation complète)
        }
    };

    const MessageBubble = ({ message }: { message: Message }) => {
        const isOwner = message.sender === 'owner';
        return (
            <div className={`flex mb-4 ${isOwner ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl text-white shadow-md ${
                    isOwner 
                    ? 'bg-blue-500 rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs mt-1 block ${isOwner ? 'text-blue-200 text-right' : 'text-gray-500 text-left'}`}>
                        {message.timestamp}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header de la conversation */}
            <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 text-center">
                        <h1 className="text-lg font-bold">{conversationPartner}</h1>
                    </div>
                </div>
            </div>

            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
            </div>

            {/* Zone de saisie */}
            <div className="bg-card border-t px-4 py-3 sticky bottom-0 z-10">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-foreground">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <Input
                        type="text"
                        placeholder="Écrire un message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        className="flex-1 p-2 border rounded-full bg-secondary"
                    />
                    <Button 
                        onClick={handleSendMessage} 
                        className="rounded-full p-2 h-auto"
                        disabled={inputMessage.trim() === ''}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Chat: React.FC = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { text: "Bonjour, j'ai une question !", fromMe: true },
    { text: "Oui, je t'écoute !", fromMe: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, fromMe: true }]);
    setInput("");
  };

  // Pour compatibilité, header et styles similaires aux autres pages
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-blue-600 text-white p-4 text-xl font-bold rounded-t-xl">Chat étudiant</header>
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">Bienvenue sur la messagerie !</div>
        {/* Zone d'affichage des messages */}
        <div className="flex flex-col gap-2 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-xs ${msg.fromMe ? "self-end bg-blue-100" : "self-start bg-gray-200"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        {/* Zone de saisie */}
        <form className="flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Écris ton message..."
            className="flex-1 border rounded-lg p-2"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Envoyer</button>
        </form>
      </main>
    </div>
  );
};

export default Chat;

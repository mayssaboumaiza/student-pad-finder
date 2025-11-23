import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";

const Chat: React.FC = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { text: "Bonjour, j'ai une question !", fromMe: true, avatar: "F" },
    { text: "Oui, je t'écoute !", fromMe: false, avatar: "A" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, fromMe: true, avatar: "F" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <header className="bg-blue-600 text-white p-6 text-2xl font-extrabold rounded-t-xl shadow-lg flex items-center gap-3">
        <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400 flex items-center justify-center text-xl font-bold">💬</span>
        Chat étudiant
      </header>
      <main className="flex-1 p-6 overflow-y-auto flex flex-col justify-end">
        <div className="mb-6 text-lg font-medium text-blue-700">Bienvenue sur la messagerie !</div>
        {/* Zone d'affichage des messages */}
        <div className="flex flex-col gap-4 mb-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-2 ${msg.fromMe ? "self-end flex-row-reverse" : "self-start"}`}
            >
              <Avatar className="w-10 h-10">
                <div className={`w-full h-full rounded-full flex items-center justify-center text-lg font-bold ${msg.fromMe ? "bg-blue-400 text-white" : "bg-purple-400 text-white"}`}>
                  {msg.avatar}
                </div>
              </Avatar>
              <div
                className={`p-3 rounded-2xl shadow-md max-w-md transition-all duration-300 animate-fade-in ${msg.fromMe ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {/* Zone de saisie */}
        <form className="flex gap-3 items-center" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Écris ton message..."
            className="flex-1 border-2 border-blue-300 rounded-full p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition-all">Envoyer</button>
        </form>
      </main>
    </div>
  );
};

export default Chat;

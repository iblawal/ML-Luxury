"use client";
import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 👋 How can we help you today?",
      time: "08:33 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks! We'll get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1400);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#5A3E2B] hover:bg-[#3C2F2F] text-[#F6F1E9] p-4 rounded-full shadow-xl transition-all"
      >
        <MessageSquare size={22} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-[#3C2F2F] text-[#F6F1E9] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

          {/* Header */}
          <div className="p-4 bg-[#5A3E2B] flex justify-between items-center">
            <h3 className="font-semibold">Chat with ML Luxury</h3>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[#D2A679]/30"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl text-sm shadow 
                  ${msg.from === "user"
                    ? "bg-[#D2A679] text-black ml-auto rounded-br-none"
                    : "bg-[#EFE7DD] text-black mr-auto rounded-bl-none"
                  }`}
              >
                {msg.text}
                <div className="text-[10px] opacity-60 mt-1">{msg.time}</div>
              </div>
            ))}

            {typing && (
              <div className="bg-[#EFE7DD] text-black p-3 rounded-2xl w-20 text-xs animate-pulse">
                Typing...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-2 bg-[#3C2F2F] border-t border-[#5A3E2B]">
            <p className="text-xs mb-2 text-[#D2A679] font-medium">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {["Track my order", "Shipping info", "Return policy", "Size guide"].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1 text-xs rounded-full border border-[#D2A679] text-[#D2A679] hover:bg-[#D2A679] hover:text-black transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 flex items-center gap-2 bg-[#5A3E2B]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 text-sm rounded-full bg-[#EFE7DD] text-black outline-none"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-[#D2A679] rounded-full text-black hover:bg-[#c8945f]"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

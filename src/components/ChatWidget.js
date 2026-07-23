import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LuSparkles } from "react-icons/lu";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! Ask me about destinations, budgets, or best times to visit."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");

    // Add user message
    const userMsg = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: userText });
      const botText = res.data.reply || res.data.response || res.data.message || res.data.text || (typeof res.data === 'string' ? res.data : "I couldn't process that response.");
      
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: botText }
      ]);
    } catch (err) {
      console.error("AI help widget error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "⚠️ Sorry, I'm having trouble connecting right now. Please make sure the backend server is running."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-widget-container">
      {/* Permanent Styled Label Pill */}
      {!isOpen && (
        <div className="ai-chat-label-pill">
          <LuSparkles style={{ marginRight: "6px", verticalAlign: "middle", color: "var(--accent)" }} />
          Chat with AI Assistant
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className={`ai-chat-toggle-btn ${isOpen ? "active" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className="ai-chat-toggle-icon close-icon">✕</span>
        ) : (
          <svg className="ai-chat-toggle-icon chat-bubble-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M10 8h.01M14 8h.01M12 12h.01" strokeWidth="3"></path>
          </svg>
        )}
      </button>

      {/* Slide-Up Chat Panel */}
      {isOpen && (
        <div className="ai-chat-panel animate-slide-up">
          <div className="chat-panel-header">
            <div className="chat-panel-title">
              <span className="status-indicator"></span>
              <h4>AI Travel Assistant</h4>
            </div>
            <button className="chat-panel-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-panel-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                <div className="chat-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message-row bot">
                <div className="chat-bubble typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-panel-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about budget, beaches..."
              className="chat-panel-input"
              disabled={isLoading}
            />
            <button type="submit" className="chat-panel-send-btn" disabled={isLoading || !inputValue.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;

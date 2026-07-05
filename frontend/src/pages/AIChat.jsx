import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm MediSense AI. Ask me any health-related question.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: message,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠ Unable to connect.",
        },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "290px",
          marginTop: "90px",
          padding: "30px",
        }}
      >
        <h1 style={{ color: "#1E3A8A" }}>
            🤖 AI Health Assistant
        </h1>

        <div
          style={{
            marginTop: "25px",
            background: "white",
            borderRadius: "20px",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          {/* Chat Area */}

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "25px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  {msg.sender === "ai" && (
                    <FaRobot
                      size={32}
                      color="#2563EB"
                    />
                  )}

                  <div
                    style={{
                      background:
                        msg.sender === "user"
                          ? "#2563EB"
                          : "#F1F5F9",

                      color:
                        msg.sender === "user"
                          ? "white"
                          : "#1E293B",

                      padding: "15px",
                      borderRadius: "15px",
                      maxWidth: "550px",
                      lineHeight: "1.6",
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <FaUserCircle
                      size={32}
                      color="#2563EB"
                    />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <p style={{ color: "#64748B" }}>
                🤖 MediSense AI is typing...
              </p>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Bottom */}

          <div
            style={{
              display: "flex",
              padding: "20px",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  sendMessage();
              }}
              placeholder="Ask anything about your health..."
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "30px",
                border: "1px solid #CBD5E1",
                outline: "none",
                fontSize: "15px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                marginLeft: "15px",
                width: "60px",
                borderRadius: "50%",
                border: "none",
                background: "#2563EB",
                color: "white",
                cursor: "pointer",
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
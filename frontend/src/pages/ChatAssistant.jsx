import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";

function ChatAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm MediSense AI. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

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

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: currentMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠ Unable to connect to MediSense AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "290px",
          marginTop: "90px",
          padding: "30px",
        }}
      >
        <h1
          style={{
            color: "#1E3A8A",
            marginBottom: "20px",
          }}
        >
          🤖 AI Health Assistant
        </h1>

        <div
          style={{
            background: "white",
            height: "650px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          {/* Chat Messages */}

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

                  marginBottom: "20px",
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
                      size={34}
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

                      borderRadius: "18px",

                      maxWidth: "550px",

                      lineHeight: "1.7",
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <FaUserCircle
                      size={34}
                      color="#2563EB"
                    />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <p
                style={{
                  color: "#64748B",
                }}
              >
                🤖 MediSense AI is typing...
              </p>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}

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
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask any health related question..."
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
                border: "none",
                borderRadius: "50%",
                background: "#2563EB",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
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

export default ChatAssistant;
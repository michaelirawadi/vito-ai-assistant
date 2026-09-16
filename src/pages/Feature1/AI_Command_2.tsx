import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const AI_RESPONSE = "Total pengeluaran anda bulan lalu Rp 1.000.000.";
const AI_RESPONSE_2 = "Total pengeluaran anda 2 bulan lalu Rp 750.000.";
const AI_RESPONSE_3 = "Pengeluaran anda bulan lalu lebih banyak Rp 250.000 dibandingkan bulan sebelumnya.";

type Detail = {
  emoji: string;
  label: string;
  value: string;
};

const spendingCategories: Detail[] = [
  { emoji: "💸", label: "Account Transfer", value: "Rp 250.000" },
  { emoji: "🍽️", label: "Food and Beverage", value: "Rp 250.000" },
  { emoji: "🛍️", label: "Shopping", value: "Rp 500.000" },
];

const spendingCategories2: Detail[] = [
  { emoji: "💸", label: "Account Transfer", value: "Rp 250.000" },
  { emoji: "🍽️", label: "Food and Beverage", value: "Rp 250.000" },
  { emoji: "🛍️", label: "Shopping", value: "Rp 250.000" },
];

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
  detail: Detail[];
};

const AICommand = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (!isListening) return undefined;

    const timeoutId = window.setTimeout(() => {
      addConversation("Mengapa pengeluaran bulan lalu lebih banyak dari bulan sebelumnya?");
      setIsListening(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [isListening]);

  const addConversation = (userText: string) => {
    const userMessage: Message = {
      id: nextMessageId.current++,
      text: userText,
      sender: "user",
      detail: [],
    };
    const aiMessage: Message = {
      id: nextMessageId.current++,
      text: AI_RESPONSE,
      sender: "ai",
      detail: spendingCategories,
    };
    const aiMessage2: Message = {
      id: nextMessageId.current++,
      text: AI_RESPONSE_2,
      sender: "ai",
      detail: spendingCategories2,
    };
    const aiMessage3: Message = {
      id: nextMessageId.current++,
      text: AI_RESPONSE_3,
      sender: "ai",
      detail: [],
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      aiMessage,
      aiMessage2,
      aiMessage3,
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    addConversation(trimmedInput);
    setInput("");
  };

  const handleVoiceStart = () => {
    if (isListening) return;
    setIsListening(true);
    // addConversation("Berapa nominal tabungan saya?");
  };

  return (
    <main className="ai-page">
      <header className="ai-header">
        <Link className="ai-back-button" to="/" aria-label="Back to home">
          <span
            style={{ display: "inline-block", transform: "scaleX(-1)" }}
            aria-hidden="true"
          >
            &#10140;
          </span>
        </Link>
        <div>
          <p className="ai-eyebrow">VITO AI ASSISTANT</p>
          <h1>AI Command</h1>
        </div>
        <div className="ai-status" aria-label="AI online">
          <span />
        </div>
      </header>

      <section className="chat-area" aria-live="polite">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <div className="welcome-mark">AI</div>
            <h2>Halo, ada yang bisa dibantu?</h2>
            <p>Tanyakan sesuatu tentang rekening Anda.</p>
          </div>
        ) : (
          <div className="message-list">
            {messages.map((message) => (
              <div className={`message-row ${message.sender}`} key={message.id}>
                <div className="message-bubble">
                  {message.sender === "ai" && (
                    <span className="message-avatar">AI</span>
                  )}
                  <div className="message-content">
                    <p>{message.text}</p>
                    {message.sender === "ai" && (
                      <div className="spending-list">
                        {message.detail.map((category) => (
                          <div className="spending-item" key={category.label}>
                            <span className="spending-emoji" aria-hidden="true">
                              {category.emoji}
                            </span>
                            <span className="spending-label">
                              {category.label}
                            </span>
                            <strong className="spending-value">
                              {category.value}
                            </strong>
                          </div>
                        ))}
                      </div>
                    )}
                    {message.sender === "ai" && message.detail.length > 0 && (
                      <div
                        style={{
                          marginTop: "7px",
                          textAlign: "right",
                          fontSize: "14px",
                        }}
                      >
                        Lihat lebih{" "}
                        <span
                          style={{ fontSize: "10px", marginLeft: "4px" }}
                          aria-hidden="true"
                        >
                          &#x25BC;
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {isListening && (
        <div className="listening-panel" role="status">
          <div className="voice-wave" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <strong>Mendengarkan...</strong>
            <p>Silakan bicara</p>
          </div>
        </div>
      )}

      <form className="chat-composer" onSubmit={handleSubmit}>
        <label className="chat-input-wrap">
          <span className="sr-only">Your message</span>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Tulis pesan..."
            disabled={isListening}
          />
        </label>
        <button
          className={`voice-button ${isListening ? "active" : ""}`}
          type="button"
          onClick={handleVoiceStart}
          aria-label={isListening ? "Listening" : "Start voice input"}
          aria-pressed={isListening}
        >
          <span aria-hidden="true">&#x1F399;</span>
        </button>
        <button className="send-button" type="submit" aria-label="Send message">
          <span aria-hidden="true">&#10140;</span>
        </button>
      </form>
    </main>
  );
};

export default AICommand;

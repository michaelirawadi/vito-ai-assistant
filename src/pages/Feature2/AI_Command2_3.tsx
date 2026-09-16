import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const AI_RESPONSE = "Rekomendasi deposito:";

const depositProducts = [
  { emoji: "🏦", title: "Deposito Berjangka" },
  { emoji: "💰", title: "Deposito Fleksi" },
  { emoji: "📈", title: "Deposito Valas" },
];

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

const AICommand2_3 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (!isListening) return undefined;

    const timeoutId = window.setTimeout(() => {
      addConversation("Ada produk deposito?");
      setIsListening(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [isListening]);

  const addConversation = (userText: string) => {
    const userMessage: Message = {
      id: nextMessageId.current++,
      text: userText,
      sender: "user",
    };
    const aiMessage: Message = {
      id: nextMessageId.current++,
      text: AI_RESPONSE,
      sender: "ai",
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      aiMessage,
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
                      <div className="deposit-list">
                        {depositProducts.map((product) => (
                          <div className="deposit-item" key={product.title}>
                            <span className="deposit-emoji" aria-hidden="true">
                              {product.emoji}
                            </span>
                            <div className="deposit-details">
                              <strong>{product.title}</strong>
                              <a onClick={() => setIsConfirmationOpen(true )}>
                                Pilih dan Bayar{" "}
                                <span style={{ fontSize: "16px" }}>
                                  &#x203A;
                                </span>
                              </a>
                            </div>
                          </div>
                        ))}
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

      {isConfirmationOpen && (
        <div className="confirmation-modal" role="dialog" aria-modal="true">
          <div className="confirmation-dialog">
            <p className="text-center text-[17px]">Konfirmasi Pembayaran</p>
            <p className="confirmation-or">atau</p>
            <button
              className="pin-button"
              type="button"
              onClick={() => setIsConfirmationOpen(false)}
            >
              Gunakan PIN
            </button>
          </div>
          <button
            className="biometric-button"
            type="button"
            onClick={() => setIsConfirmationOpen(false)}
            aria-label="Konfirmasi dengan biometrik"
          >
            <span aria-hidden="true">&#x1CAC;</span>
          </button>
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

export default AICommand2_3;

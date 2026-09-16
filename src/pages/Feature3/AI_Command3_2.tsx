import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AI_Command3.module.css";

const REFUND_AI_RESPONSE = "Bayar Tagihan Listrik";
const REMINDER_AI_RESPONSE =
  "Tagihan internet dan asuransi akan jatuh tempo minggu depan. Saya ingatkan lagi nanti ya.";

type Detail = {
  emoji: string;
  label: string;
  value?: string;
};

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
  detail: Detail[];
};

const transaction: Detail[] = [
  { emoji: "💸", label: "ID Pelanggan", value: "0123-4567" },
  { emoji: "🍽️", label: "Biaya Listrik", value: "Rp 200.000" },
  { emoji: "🛍️", label: "Biaya Admin", value: "Rp 2.000" },
  { emoji: "🛍️", label: "Total", value: "Rp 202.000" },
];

const AICommand3_2 = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: REFUND_AI_RESPONSE,
      sender: "ai",
      detail: transaction,
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const nextMessageId = useRef(2);

  useEffect(() => {
    if (!isListening) return undefined;

    const timeoutId = window.setTimeout(() => {
      addConversation("Berikan detail pengembalian dana saya");
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
      text: REFUND_AI_RESPONSE,
      sender: "ai",
      detail: transaction,
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
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nextMessageId.current++,
        text: REMINDER_AI_RESPONSE,
        sender: "ai",
        detail: [],
      },
    ]);
  };

  return (
    <main className={styles["ai-page"]}>
      <header className={styles["ai-header"]}>
        <Link
          className={styles["ai-back-button"]}
          to="/"
          aria-label="Back to home"
        >
          <span
            style={{ display: "inline-block", transform: "scaleX(-1)" }}
            aria-hidden="true"
          >
            &#10140;
          </span>
        </Link>
        <div>
          <p className={styles["ai-eyebrow"]}>VITO AI ASSISTANT</p>
          <h1>AI Command</h1>
        </div>
        <div className={styles["ai-status"]} aria-label="AI online">
          <span />
        </div>
      </header>

      <section className={styles["chat-area"]} aria-live="polite">
        <div className={styles["message-list"]}>
          {messages.map((message) => (
            <div
              className={`${styles["message-row"]} ${styles[message.sender]}`}
              key={message.id}
            >
              <div className={styles["message-bubble"]}>
                {message.sender === "ai" && (
                  <span className={styles["message-avatar"]}>AI</span>
                )}
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.sender === "ai" && (
                    <div className="spending-list">
                      {message.detail.map((category) => (
                        <div className="spending-item" key={category.label}>
                          {/* <span className="spending-emoji" aria-hidden="true">
                              {category.emoji}
                            </span> */}
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
                    <div className="confirmation-action">
                      <button
                        className="confirm-button w-full"
                        type="button"
                        onClick={() => setIsConfirmationOpen(true)}
                      >
                        Konfirmasi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isListening && (
        <div className={styles["listening-panel"]} role="status">
          <div className={styles["voice-wave"]} aria-hidden="true">
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
        <div
          className={styles["confirmation-modal"]}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles["confirmation-dialog"]}>
            <p className="text-center text-[17px]">Konfirmasi Pembayaran</p>
            <p className={styles["confirmation-or"]}>atau</p>
            <button
              className={styles["pin-button"]}
              type="button"
              onClick={closeConfirmation}
            >
              Gunakan PIN
            </button>
          </div>
          <button
            className={styles["biometric-button"]}
            type="button"
            onClick={closeConfirmation}
            aria-label="Konfirmasi dengan biometrik"
          >
            <img style={{ maxWidth: "75%" }} src="/fingerprint.svg" alt="" />
          </button>
        </div>
      )}

      <form className={styles["chat-composer"]} onSubmit={handleSubmit}>
        <label className={styles["chat-input-wrap"]}>
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
          className={`${styles["voice-button"]} ${isListening ? "active" : ""}`}
          type="button"
          onClick={handleVoiceStart}
          aria-label={isListening ? "Listening" : "Start voice input"}
          aria-pressed={isListening}
        >
          <span aria-hidden="true">&#x1F399;</span>
        </button>
        <button
          className={styles["send-button"]}
          type="submit"
          aria-label="Send message"
        >
          <span aria-hidden="true">&#10140;</span>
        </button>
      </form>
    </main>
  );
};

export default AICommand3_2;

import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AI_Command4.module.css";

const REFUND_AI_RESPONSE = "Pengembalian dana berhasil dilakukan";

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

const statusDetail: Detail[] = [
  { emoji: "", label: "Amount", value: "Rp 75.000" },
  { emoji: "", label: "Date", value: "01-01-1990" },
  { emoji: "", label: "Time", value: "15:00" },
];

const AICommand4_3 = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: REFUND_AI_RESPONSE,
      sender: "ai",
      detail: statusDetail,
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
      detail: statusDetail,
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
                <div className={styles["message-content"]}>
                  {message.sender === "ai" && (
                    <div className={styles["success-icon"]} aria-hidden="true">
                      <span>✓</span>
                    </div>
                  )}
                  <p>{message.text}</p>
                  {message.sender === "ai" && message.detail.length > 0 && (
                    <div className={styles["spending-list"]} style={{ marginTop: "10px", paddingTop: "10px"}}>
                      {message.detail.map((category) => (
                        <div
                          className={styles["spending-item-3"]}
                          key={category.label}
                        >
                          <span className={styles["spending-label"]}>
                            {category.label}
                          </span>
                          {category.value && (
                            <strong className={styles["spending-value"]}>
                              {category.value}
                            </strong>
                          )}
                        </div>
                      ))}
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
              onClick={() => setIsConfirmationOpen(false)}
            >
              Gunakan PIN
            </button>
          </div>
          <button
            className={styles["biometric-button"]}
            type="button"
            onClick={() => setIsConfirmationOpen(false)}
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

export default AICommand4_3;

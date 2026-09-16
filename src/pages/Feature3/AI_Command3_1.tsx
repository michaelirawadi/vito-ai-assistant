import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AI_Command3.module.css";

const AI_RESPONSE =
  "Pengeluaran Anda naik 12% dari bulan lalu. Sektor makanan paling tinggi.";
const AI_FOLLOW_UP =
  "Ingin atur budget makanan? Saya bisa bantu batasi per minggu.";

type Detail = {
  emoji: string;
  label: string;
  value: string;
};

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
  detail: Detail[];
  showSpendingChart?: boolean;
};

const spendingCategories = [
  { label: "Makanan", value: "40%", color: "#1678b8" },
  { label: "Transportasi", value: "25%", color: "#2bb8b4" },
  { label: "Hiburan", value: "20%", color: "#f2b84b" },
  { label: "Lainnya", value: "15%", color: "#e77b62" },
];

const AICommand3_1 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (!isListening) return undefined;

    const timeoutId = window.setTimeout(() => {
      addConversation("Rincian pengeluaran bulan ini");
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
      detail: [],
      showSpendingChart: true,
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
        {messages.length === 0 ? (
          <div className={styles["welcome-message"]}>
            <div className={styles["welcome-mark"]}>AI</div>
            <h2>Halo, ada yang bisa dibantu?</h2>
            <p>Tanyakan sesuatu tentang rekening Anda.</p>
          </div>
        ) : (
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
                    { message.sender === "ai" && <p style={{marginBottom: "5px"}} className={styles["spending-total"]}>
                      Total pengeluaran anda Rp 1.320.000
                    </p>}
                    <p>{message.text}</p>
                    {message.showSpendingChart && (
                      <>
                        <div className={styles["spending-chart"]}>
                          <div
                            className={styles["spending-pie"]}
                            role="img"
                            aria-label="Pengeluaran: Makanan 40%, Transportasi 25%, Hiburan 20%, Lainnya 15%"
                          />
                          <div className={styles["spending-legend"]}>
                            {spendingCategories.map((category) => (
                              <div
                                className={styles["spending-legend-item"]}
                                key={category.label}
                              >
                                <span
                                  className={styles["spending-swatch"]}
                                  style={{ backgroundColor: category.color }}
                                />
                                <span>{category.label}</span>
                                <strong>{category.value}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    {message.showSpendingChart && (
                      <>
                        <p className={styles["spending-follow-up"]}>
                          {AI_FOLLOW_UP}
                        </p>
                      </>
                    )}
                    {message.sender === "ai" && message.detail.length > 0 && (
                      <div className={styles["spending-list"]}>
                        {message.detail.map((category) => (
                          <div
                            className={styles["spending-item"]}
                            key={category.label}
                          >
                            {/* <span className="spending-emoji" aria-hidden="true">
                              {category.emoji}
                            </span> */}
                            <span className={styles["spending-label"]}>
                              {category.label}
                            </span>
                            <strong
                              className={styles["spending-value"]}
                              style={{ textWrap: "auto" }}
                            >
                              {category.value}
                            </strong>
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
            {/* <span aria-hidden="true">&#x1CAC;</span> */}
            <img style={{ maxWidth: "75%" }} src="/fingerprint.svg"></img>
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

export default AICommand3_1;

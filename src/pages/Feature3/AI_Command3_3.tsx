import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AI_Command3.module.css";

const INVESTMENT_AI_RESPONSE =
  "Berikut simulasi investasi deposito Anda dengan bunga 4,5% per tahun.";
const INVESTMENT_ANALYSIS =
  "Dengan bunga 4,5% dari bank, deposito membantu mengembangkan dana secara stabil dengan risiko yang lebih terukur. Bunga akan menambah nilai simpanan Anda selama tenor berjalan.";

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
  showInvestmentSimulation?: boolean;
};

const investmentPoints = [
  { year: "Mulai", value: "Rp 10 jt", x: 18, y: 136 },
  { year: "Tahun 1", value: "Rp 10,45 jt", x: 88, y: 116 },
  { year: "Tahun 2", value: "Rp 10,92 jt", x: 158, y: 94 },
  { year: "Tahun 3", value: "Rp 11,41 jt", x: 228, y: 70 },
];

const AICommand3_3 = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: INVESTMENT_AI_RESPONSE,
      sender: "ai",
      detail: [],
      showInvestmentSimulation: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const nextMessageId = useRef(2);

  useEffect(() => {
    if (!isListening) return undefined;

    const timeoutId = window.setTimeout(() => {
      addConversation("Simulasikan investasi saya");
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
      text: INVESTMENT_AI_RESPONSE,
      sender: "ai",
      detail: [],
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
                  <p>{message.text}</p>
                  {message.showInvestmentSimulation && (
                    <>
                      <div className={styles["investment-summary"]}>
                        <strong>Modal awal</strong>
                        <span>Rp 10.000.000</span>
                        <strong>Bunga</strong>
                        <span>4,5% per tahun</span>
                      </div>
                      <div className={styles["investment-chart"]}>
                        <svg
                          viewBox="0 0 246 170"
                          role="img"
                          aria-label="Grafik pertumbuhan investasi dari Rp 10 juta menjadi Rp 11,41 juta dalam tiga tahun dengan bunga 4,5% per tahun"
                        >
                          <line x1="18" y1="14" x2="18" y2="142" />
                          <line x1="18" y1="142" x2="236" y2="142" />
                          <polyline points="18,136 88,116 158,94 228,70" />
                          {investmentPoints.map((point) => (
                            <g key={point.year}>
                              <circle cx={point.x} cy={point.y} r="4" />
                              <text x={point.x} y="160" textAnchor="middle">
                                {point.year}
                              </text>
                            </g>
                          ))}
                        </svg>
                        <div className={styles["investment-values"]}>
                          {investmentPoints.map((point) => (
                            <span key={point.year}>{point.value}</span>
                          ))}
                        </div>
                      </div>
                      <p
                        className={styles["investment-analysis"]}
                        style={{ marginLeft: "20px" }}
                      >
                        {INVESTMENT_ANALYSIS}
                      </p>
                      <a
                        onClick={() => setIsConfirmationOpen(true)}
                        style={{
                          textAlign: "right",
                          width: "100%",
                          display: "block",
                          fontSize: "14px",
                          paddingRight: "5px"
                        }}
                      >
                        Lihat Penawaran{" "}
                      </a>
                    </>
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

export default AICommand3_3;

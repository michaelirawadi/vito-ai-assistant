import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AI_Command3.module.css";

const AI_RESPONSE = "Penawaran KPR rumah dengan nominal Rp 750.000.000.";
const AI_RESPONSE_2 =
  "Anda memilih Paket A. " +
  "Anda dapat bertanya pada kontak dibawah ini apabila ingin bertanya lebih lanjut.";

type kpr = {
  emoji: string;
  title: string;
  tenor: string;
  bunga: string;
  cicilan: string;
};

type Contact = {
  name: string;
  position: string;
  phone: string;
};

const kprProducts: kpr[] = [
  {
    emoji: "🟥",
    title: "Paket A",
    tenor: "5 tahun",
    bunga: "6,5%",
    cicilan: "± Rp14,67 juta",
  },
  {
    emoji: "🟥",
    title: "Paket B",
    tenor: "10 tahun",
    bunga: "7,0%",
    cicilan: "± Rp8,71 juta",
  },
  {
    emoji: "🟥",
    title: "Paket C",
    tenor: "15 tahun",
    bunga: "7,5%",
    cicilan: "± Rp6,95 juta",
  },
];

const contact: Contact[] = [
  {
    name: "Budi Santoso",
    position: "PBC KCU Kedoya",
    phone: "0812-3456-7890",
  },
];

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
  detail?: kpr[];
  contact?: Contact[];
};

const AICommand3_4 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (!isListening) return undefined;

    const timeoutId = window.setTimeout(() => {
      addConversation("Saya ingin melakukan kpr rumah sebesar 750 juta");
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
      contact: [],
    };
    const aiMessage: Message = {
      id: nextMessageId.current++,
      text: AI_RESPONSE,
      sender: "ai",
      detail: kprProducts,
      contact: [],
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      aiMessage,
    ]);
  };

  const addConversationContact = () => {
    const aiMessage: Message = {
      id: nextMessageId.current++,
      text: AI_RESPONSE_2,
      sender: "ai",
      detail: [],
      contact: contact,
    };
    setMessages((currentMessages) => [...currentMessages, aiMessage]);
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
                    <p>{message.text}</p>
                    {message.sender === "ai" && (
                      <div className={styles["deposit-list"]}>
                        {message.detail?.map((product) => (
                          <div
                            className={styles["deposit-item"]}
                            key={product.title}
                          >
                            {/* <span className="deposit-emoji" aria-hidden="true">
                                {product.emoji}
                              </span> */}
                            <div className={styles["deposit-details"]}>
                              <strong style={{ fontSize: "16px" }}>
                                {product.title}
                              </strong>
                              {product.tenor &&
                                product.bunga &&
                                product.cicilan && (
                                  <span
                                    style={{ fontSize: "14px" }}
                                    className={styles["deposit-meta"]}
                                  >
                                    {product.tenor} | {product.bunga} |{" "}
                                    {product.cicilan}
                                  </span>
                                )}
                              <a
                                href="#deposit-details"
                                onClick={addConversationContact}
                                className={styles["deposit-link"]}
                              >
                                Pilih{" "}
                                <span style={{ fontSize: "16px" }}>
                                  &#x203A;
                                </span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {Boolean(message.contact?.length) && (
                      <div className={styles["contact-list"]}>
                        {message.contact?.map((person) => (
                          <div
                            className={styles["contact-card"]}
                            key={person.phone}
                          >
                            <img
                              className={styles["contact-avatar"]}
                              src="https://i.pravatar.cc/80?img=12"
                              alt={`Foto ${person.name}`}
                            />
                            <div className={styles["contact-details"]}>
                              <strong>
                                {person.name} - {person.position}
                              </strong>
                              <span>{person.phone}</span>
                              <a
                                className={styles["contact-link"]}
                                href="#"
                                onClick={(event) => event.preventDefault()}
                              >
                                Hubungi sekarang
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

      <form className={styles["chat-composer"]} onSubmit={handleSubmit}>
        <label className={styles["chat-input-wrap"]}>
          <span className={styles["sr-only"]}>Your message</span>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Tulis pesan..."
            disabled={isListening}
          />
        </label>
        <button
          className={`${styles["voice-button"]} ${isListening ? styles["active"] : ""}`}
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

export default AICommand3_4;

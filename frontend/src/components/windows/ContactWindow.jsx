import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelWindow from "../ui/PixelWindow";

const SOCIAL_LINKS = [
  { label: "GITHUB", icon: "GH", url: "https://github.com" },
  { label: "LINKEDIN", icon: "IN", url: "https://linkedin.com" },
  { label: "TWITTER", icon: "TW", url: "https://twitter.com" },
];

export default function ContactWindow() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [response, setResponse] = useState("");

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("sent");
        setResponse(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setResponse(data.message || "TRANSMISSION FAILED");
      }
    } catch {
      setStatus("error");
      setResponse("CONNECTION ERROR");
    }
  };

  return (
    <PixelWindow id="contact" title="CONTACT.SH">
      <div
        style={{
          padding: "14px 16px",
          fontSize: 11,
          color: "var(--ink)",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 9,
            color: "var(--ink-soft)",
            letterSpacing: "0.15em",
            marginBottom: 14,
            textTransform: "uppercase",
          }}
        >
          Open channel
        </div>

        {/* Email box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            marginBottom: 14,
            background: "var(--paper)",
            border: "2px solid var(--line)",
            boxShadow: "3px 3px 0 var(--line)",
          }}
        >
          <span style={{ color: "var(--ink-soft)", fontSize: 9 }}>EMAIL</span>

          <span
            style={{
              color: "var(--primary)",
              flex: 1,
              fontSize: 10,
            }}
          >
            you@domain.com
          </span>

          <button
            onClick={() => navigator.clipboard?.writeText("you@domain.com")}
            type="button"
            className="pixel-btn"
            style={{ padding: "4px 8px", fontSize: 8 }}
          >
            COPY
          </button>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {SOCIAL_LINKS.map(({ label, icon, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "8px 6px",
                textDecoration: "none",
                border: "2px solid var(--line)",
                color: "var(--ink)",
                background: "var(--paper)",
                fontSize: 9,
                letterSpacing: "0.08em",
                boxShadow: "2px 2px 0 var(--line)",
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "2px solid var(--line)",
            marginBottom: 14,
          }}
        />

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Name */}
          <div>
            <label
              style={{
                fontSize: 9,
                color: "var(--ink-soft)",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: 3,
              }}
            >
              NAME
            </label>
            <input
              className="pixel-input"
              placeholder="YOUR_NAME"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={status === "sending"}
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                fontSize: 9,
                color: "var(--ink-soft)",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: 3,
              }}
            >
              EMAIL
            </label>
            <input
              className="pixel-input"
              placeholder="you@domain.com"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={status === "sending"}
            />
          </div>

          {/* Message */}
          <div>
            <label
              style={{
                fontSize: 9,
                color: "var(--ink-soft)",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: 3,
              }}
            >
              MESSAGE
            </label>
            <textarea
              className="pixel-input"
              placeholder="TYPE YOUR MESSAGE"
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              disabled={status === "sending"}
              style={{ resize: "none", lineHeight: 1.6 }}
            />
          </div>

          {/* Button */}
          <button
            className="pixel-btn"
            onClick={submit}
            disabled={status === "sending"}
            type="button"
            style={{
              marginTop: 2,
              background:
                status === "sending" ? "var(--primary)" : "var(--paper)",
              color: status === "sending" ? "white" : "var(--ink)",
            }}
          >
            {status === "sending" ? "SENDING..." : "SEND"}
          </button>
        </div>

        {/* Response */}
        <AnimatePresence>
          {(status === "sent" || status === "error") && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                border: "2px solid var(--line)",
                background:
                  status === "sent"
                    ? "rgba(0, 229, 255, 0.2)"
                    : "rgba(255, 47, 146, 0.15)",
                color: "var(--ink)",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              {response}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PixelWindow>
  );
}

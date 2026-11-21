import { useEffect, useState } from "react";

const EMOJIS = ["❤️", "💛", "🪔", "✈️", "🌍", "✨"];

/** Full-screen shower of floating hearts/emojis, active while `active` is true. */
export default function Hearts({ active, emojis }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!active) return;
    const pool = emojis ?? EMOJIS;
    const t = setInterval(() => {
      setItems((prev) => [
        ...prev.slice(-40),
        {
          id: Date.now() + Math.random(),
          emoji: pool[(Math.random() * pool.length) | 0],
          left: Math.random() * 100,
          duration: 3 + Math.random() * 3,
          size: 18 + Math.random() * 22,
        },
      ]);
    }, 160);
    return () => clearInterval(t);
  }, [active, emojis]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {items.map((h) => (
        <span
          key={h.id}
          className="anim-float-up absolute bottom-[-40px]"
          style={{
            left: `${h.left}vw`,
            animationDuration: `${h.duration}s`,
            fontSize: h.size,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

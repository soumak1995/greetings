import { useEffect, useState } from "react";
import { isPlaying, isMuted, startMusic, toggleMusic } from "../lib/music.js";

/**
 * Small floating sound toggle. Browsers block audio before the first user
 * gesture, so music kicks in on the page's very first tap/click anywhere.
 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(isPlaying() || !isMuted());

  useEffect(() => {
    const kick = () => {
      startMusic().catch(() => {});
      setPlaying(isPlaying());
    };
    document.addEventListener("pointerdown", kick, { once: true });
    return () => document.removeEventListener("pointerdown", kick);
  }, []);

  return (
    <button
      onClick={() => setPlaying(toggleMusic())}
      aria-label="Toggle music"
      className="fixed top-4 right-4 z-40 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm backdrop-blur-md transition-transform duration-200 active:scale-90"
      title={playing ? "Mute the feels 🎵" : "Un-mute the feels 🎵"}
    >
      {playing ? "🎵" : "🔇"}
    </button>
  );
}

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sky from "../components/Sky.jsx";
import Diyas from "../components/Diyas.jsx";
import Polaroid from "../components/Polaroid.jsx";
import Hearts from "../components/Hearts.jsx";
import MusicToggle from "../components/MusicToggle.jsx";
import { postReply } from "../lib/reply.js";

const NUDGE_LINES = [
  "Not a chance 😄",
  "The diyas already know 🪔",
  "No takesies-backsies 💛",
  "Even the fireworks disagree 🎆",
  "Okay okay, you can't undo a yes 💛",
];

const TRANSIT_LINES = [
  "Psst… remember the boarding pass? 🎫",
  "The destination was a surprise…",
  "It happened. Come see 🤍",
];
const TRANSIT_STEP = 750;   // ms per teaser line
const TRANSIT_EXIT = 2600;  // ms until we hop to /trip

export default function Diwali() {
  const navigate = useNavigate();
  const [celebrating, setCelebrating] = useState(false);
  const [nudges, setNudges] = useState(0);
  const [dodge, setDodge] = useState({ x: 0, y: 0 });
  const [transit, setTransit] = useState(0);
  const burstDone = useRef(false);

  const sayYes = () => {
    if (burstDone.current) return;
    burstDone.current = true;
    setCelebrating(true);
    postReply("diwali", "YES again 💛 (revisiting)");
    TRANSIT_LINES.forEach((_, i) => {
      setTimeout(() => setTransit(i), i * TRANSIT_STEP);
    });
    setTimeout(() => navigate("/trip"), TRANSIT_EXIT);
  };

  const dodgeNo = () => {
    if (celebrating) return;
    setDodge({ x: (Math.random() - 0.5) * 260, y: (Math.random() - 0.5) * 180 });
    setNudges((n) => Math.min(n + 1, NUDGE_LINES.length));
  };

  return (
    <div
      className="relative min-h-dvh text-[#fff3e6]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 120%, #3b1f5e 0%, #241247 40%, #0d0721 100%)",
      }}
    >
      <Sky variant="diwali" celebrate={celebrating ? 1 : 0} />
      <Hearts active={celebrating} emojis={["❤️", "💛", "🪔", "🎆"]} />
      <MusicToggle />

      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-3.5 px-5 py-10 pb-40 text-center sm:gap-5">
        <p className="anim-rise d1 text-[0.72rem] tracking-[0.35em] text-gold uppercase">
          ✦ Chapter one — lived ✦
        </p>

        <h1 className="anim-rise d2 gradient-script font-script leading-tight text-[clamp(2.6rem,11vw,6.5rem)] text-balance text-gold">
          Dear Ankita…
        </h1>

        {/* Her photo */}
        <Polaroid
          photoSrc="ankita.webp"
          alt="Ankita"
          widthClass="w-60 sm:w-72"
          aspectClass="aspect-square sm:aspect-[4/3]"
          caption="the girl who lit up everything ✨"
          hint={
            <>
              the most beautiful girl
              <br />✦ (save photo as ankita.webp) ✦
            </>
          }
        />

        {/* Glassy memory card */}
        <div className="anim-rise d4 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-7">
          <p className="font-light leading-relaxed text-[#f7e8ff] text-[0.95rem] md:text-lg">
            They say Diwali is the festival of lights — and this year, mine was
            you. 🌙
            <br />
            I asked you to hold my hand under the fireworks…{" "}
            <strong className="text-gold">you said yes</strong>, the diyas
            burned brighter, and the night hasn't really ended since. 🎆
          </p>

          {!celebrating && (
            <>
              <p className="anim-pulse-glow mt-4 font-script text-[clamp(1.7rem,6.5vw,2.8rem)] text-rose sm:mt-5">
                {nudges > 0 ? NUDGE_LINES[nudges - 1] : "Say yes again, for memory's sake? 🪔❤️"}
              </p>

              <div className="mt-5 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <button
                  onClick={sayYes}
                  className="w-full max-w-[300px] rounded-full bg-[linear-gradient(120deg,#ffb703,#ffd166)] px-9 py-3.5 font-semibold text-[#3a2400] shadow-[0_10px_30px_rgba(255,183,3,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 sm:w-auto"
                >
                  Yes, again & always 💛
                </button>
                <button
                  onMouseEnter={dodgeNo}
                  onTouchStart={dodgeNo}
                  onClick={dodgeNo}
                  style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }}
                  className="w-full max-w-[300px] rounded-full border border-[rgba(217,198,242,0.5)] px-9 py-3.5 font-semibold text-[#d9c6f2] transition-all duration-200 active:scale-95 sm:w-auto"
                >
                  Undo it? 🙈
                </button>
              </div>
            </>
          )}

          {celebrating && (
            <p className="anim-rise font-script text-[clamp(1.8rem,7vw,3.4rem)] text-rose">
              Yesss! It happened — best Diwali ever ❤️🪔
            </p>
          )}
        </div>

        {celebrating && (
          <p
            key={transit}
            className="anim-rise d1 font-script text-[clamp(1.3rem,4.5vw,1.8rem)] text-[#ffd166]"
            style={{ filter: "drop-shadow(0 0 18px rgba(255,183,3,0.5))" }}
          >
            {TRANSIT_LINES[transit]}
          </p>
        )}
      </main>

      <Diyas />
    </div>
  );
}

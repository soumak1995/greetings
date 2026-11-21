import { useState } from "react";
import Sky from "../components/Sky.jsx";
import Polaroid from "../components/Polaroid.jsx";
import Gallery from "../components/Gallery.jsx";
import Hearts from "../components/Hearts.jsx";
import MusicToggle from "../components/MusicToggle.jsx";
import { postReply } from "../lib/reply.js";

const NEXT_LINES = [
  "Next trip: already loading 🗺️",
  "I have three tabs open with plans 😄",
  "Wherever you say — I'll carry the bags 🤍",
];

const WHATSAPP_NUMBER = "918420786661";
const WHATSAPP_MESSAGE =
  "That bonfire night deserves a sequel 💛🔥";

export default function Trip() {
  const [celebrating, setCelebrating] = useState(false);
  const [nextIndex, setNextIndex] = useState(-1);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const sendNote = () => {
    const text = note.trim();
    if (!text) return;
    postReply("comment", text);
    setSent(true);
  };

  return (
    <div
      className="relative min-h-dvh text-[#fff3e6]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 120%, #2b4a6b 0%, #1c3355 40%, #0a1428 100%)",
      }}
    >
      <Sky variant="travel" celebrate={celebrating ? 1 : 0} />
      <Hearts active={celebrating} emojis={["❤️", "💛", "🔥", "✈️"]} />
      <MusicToggle />

      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-4 px-5 py-12 pb-24 text-center sm:gap-5">
        <p className="anim-rise d1 text-[0.72rem] tracking-[0.35em] text-gold uppercase">
          ✦ Chapter two — lived ✦
        </p>

        <h1 className="anim-rise d2 gradient-script font-script leading-tight text-[clamp(2.5rem,10.5vw,5.8rem)] text-balance">
          You said yes… and we actually went ✨
        </h1>

        <p className="anim-rise d3 max-w-xl font-light leading-relaxed text-[#eaf2ff] md:text-lg">
          Bonfire smoke in our hair, stories over embers, a night that needed no
          fireworks — because <strong className="text-gold">you</strong> were
          the light. 🤍
          <br />
          This page used to be a question. Now it's my favourite memory.
        </p>

        <p className="anim-pulse-glow anim-rise d4 font-script text-[clamp(1.7rem,4.6vw,2.6rem)] text-rose">
          Here's to every trip that follows 🛣️💛
        </p>

        {/* Boarding pass — stamped, lived in, retired */}
        <div className="anim-rise d5 relative w-[min(460px,92vw)] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#fff6ea,#ffe8d1)] text-[#4a3220] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="absolute -right-6 top-1/2 z-10 -translate-y-1/2 -rotate-12 border-4 border-[#25d366] px-5 py-1.5 text-[0.95rem] font-bold uppercase tracking-[0.25em] text-[#25d366]/90 rounded-lg select-none" style={{ filter: "drop-shadow(0 0 1px rgba(37,211,102,0.3))" }}>
            Flown ✓
          </div>
          <div className="flex items-center justify-between bg-[linear-gradient(120deg,#b8860b,#db9e2a)] px-6 py-3.5 text-[0.78rem] uppercase tracking-[0.18em] text-[#fff8ec]">
            <span>✦ Boarding Pass ✦</span>
            <span>Class: Infinite</span>
          </div>
          <div className="px-4 pb-4 pt-5 text-left sm:px-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 text-center">
                <div className="text-[clamp(1.4rem,5.5vw,2.1rem)] font-semibold tracking-wide">US</div>
                <div className="text-[0.66rem] uppercase tracking-[0.12em] opacity-75 sm:text-[0.72rem]">
                  Departure: where it all began
                </div>
              </div>
              <div className="anim-bob flex-none text-xl sm:text-2xl">✈️</div>
              <div className="flex-1 text-center">
                <div className="text-[clamp(1.4rem,5.5vw,2.1rem)] font-semibold tracking-wide">🤍</div>
                <div className="text-[0.66rem] uppercase tracking-[0.12em] opacity-75 sm:text-[0.72rem]">
                  Destination: worth every mile
                </div>
              </div>
            </div>

            <div className="perforation my-4" />

            <div className="grid grid-cols-1 gap-2.5 text-center sm:grid-cols-3 sm:gap-3">
              <div>
                <span className="block text-[0.62rem] uppercase tracking-[0.16em] opacity-60">Passenger</span>
                <b className="text-[0.92rem]">Ankita 💛</b>
              </div>
              <div>
                <span className="block text-[0.62rem] uppercase tracking-[0.16em] opacity-60">Date</span>
                <b className="text-[0.92rem]">9 Nov 2026 ✓</b>
              </div>
              <div className="sm:text-right">
                <span className="block text-[0.62rem] uppercase tracking-[0.16em] opacity-60">Seat</span>
                <b className="text-[0.92rem]">Next to me — occupied ✓</b>
              </div>
            </div>
          </div>
        </div>

        {/* The photo that proves it happened */}
        <Polaroid
          photoSrc="us.jpg"
          alt="Us by the bonfire"
          caption="that night by the fire 🔥✨"
          tilt="rotate-2"
          widthClass="w-60 sm:w-72"
          hint={<>the photo that proves it happened</>}
        />

        <Gallery />

        <div className="anim-rise d7 mt-1 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={() => setCelebrating(true)}
            className="w-full max-w-[300px] rounded-full bg-[linear-gradient(120deg,#ffb703,#ffd166)] px-9 py-3.5 font-semibold text-[#3a2400] shadow-[0_10px_30px_rgba(255,183,3,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 sm:w-auto"
          >
            Relive it 🥹✨
          </button>
          <button
            onClick={() => setNextIndex((i) => (i + 1) % NEXT_LINES.length)}
            className="w-full max-w-[300px] rounded-full border border-[rgba(207,227,255,0.5)] px-9 py-3.5 font-semibold text-[#cfe3ff] transition-all active:scale-95 sm:w-auto"
          >
            So… where next? 🤔
          </button>
        </div>

        {nextIndex >= 0 && (
          <p className="anim-rise font-script text-xl text-rose md:text-2xl">
            {NEXT_LINES[nextIndex]}
          </p>
        )}

        {celebrating && (
          <>
            <p className="anim-rise font-script text-[clamp(1.6rem,4.5vw,2.4rem)] text-rose">
              Some nights deserve replays — glad you were in every frame 🤍
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noreferrer"
              className="anim-rise d2 mt-1 inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,#25d366,#5dfc8d)] px-9 py-3.5 font-semibold text-[#06341a] shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              💬 Start planning the sequel
            </a>
            <p className="text-[0.7rem] tracking-[0.15em] uppercase text-[#9fb6d8] opacity-80">
              PRESS SEND — THE SEQUEL WRITES ITSELF 💛
            </p>
          </>
        )}

        {/* Her note, straight to his inbox */}
        <div className="anim-rise d5 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6">
          <p className="font-script text-[clamp(1.3rem,4vw,1.9rem)] text-gold">
            P.S. Tell me what that night meant 💌
          </p>
          {sent ? (
            <p className="mt-2 font-light text-[#f7e8ff]" style={{ color: "#f7e8ff" }}>
              Sealed in my favourite archive — my email 📬💛
            </p>
          ) : (
            <>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="The bonfire, the smoke, the stories… how will you remember it? 🥰"
                className="mt-3 w-full resize-none rounded-2xl border border-white/15 bg-[rgba(10,20,40,0.55)] px-4 py-3 text-left font-light text-[#fff3e6] placeholder:text-[rgba(255,243,230,0.4)] outline-none focus:border-[rgba(255,209,102,0.55)]"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[0.7rem] tracking-wide text-[rgba(255,243,230,0.45)]">
                  {note.length}/500
                </span>
                <button
                  onClick={sendNote}
                  disabled={!note.trim()}
                  className="rounded-full bg-[linear-gradient(120deg,#ffb703,#ffd166)] px-8 py-2.5 font-semibold text-[#3a2400] shadow-[0_8px_24px_rgba(255,183,3,0.3)] transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send it to him 💌
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

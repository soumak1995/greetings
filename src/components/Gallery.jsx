const PHOTOS = [
  { src: "gallery-1.jpg", caption: "our wooden hideaway 🛏️", tilt: "-rotate-2" },
  { src: "gallery-2.jpg", caption: "breakfast with the jungle 🌿", tilt: "rotate-2" },
  { src: "gallery-3.jpg", caption: "the view that slowed time 🌳", tilt: "-rotate-1" },
  { src: "gallery-4.jpg", caption: "too many cushions, zero worries 🤍", tilt: "rotate-1" },
  { src: "gallery-5.jpg", caption: "the campus of our memories 🍃", tilt: "rotate-3" },
];

/**
 * Swipeable strip of polaroid memories from the trip.
 * Mobile: horizontal snap-scroll. Desktop: same, centered.
 */
export default function Gallery() {
  return (
    <div className="anim-rise d6 w-full">
      <p className="mb-2 font-script text-[clamp(1.3rem,4vw,1.9rem)] text-gold">
        The trip, frame by frame 📸
      </p>

      <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 py-3 sm:mx-0 sm:px-6">
        {PHOTOS.map((p) => (
          <figure
            key={p.src}
            className={`w-44 flex-none bg-[#fff6ea] p-2 pb-9 rounded-md shadow-[0_14px_36px_rgba(0,0,0,0.5)] sm:w-56 sm:p-2.5 sm:pb-12 ${p.tilt}`}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="aspect-square w-full rounded-sm object-cover"
            />
            <figcaption className="px-1 pt-1.5 font-script text-lg text-[#7a5a3a] sm:text-xl">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[rgba(255,243,230,0.4)]">
        ← swipe for more →
      </p>
    </div>
  );
}

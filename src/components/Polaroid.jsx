import { useState } from "react";

/**
 * Tilted polaroid photo frame.
 * Uses <photoSrc> if it exists; otherwise shows an elegant placeholder.
 */
export default function Polaroid({
  photoSrc,
  caption,
  alt,
  hint,
  tilt = "-rotate-3",
  widthClass = "w-72",
  aspectClass = "aspect-[4/3]",
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const showPhoto = loaded && !failed;

  return (
    <figure className={`${widthClass} max-w-[78vw] bg-[#fff6ea] p-2.5 pb-10 sm:p-3 sm:pb-12 rounded-md shadow-[0_18px_44px_rgba(0,0,0,0.5)] ${tilt}`}>
      <div className={`flex ${aspectClass} items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(160deg,#35476b,#1c3050)]`}>
        {showPhoto ? (
          <img
            src={photoSrc}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[0.7rem] sm:text-[0.8rem] tracking-[0.2em] uppercase text-[rgba(255,240,220,0.65)] text-center leading-loose px-4">
            {hint}
          </span>
        )}
        {!showPhoto && (
          <img
            src={photoSrc}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className="hidden"
          />
        )}
      </div>
      <figcaption className="font-script text-2xl text-[#7a5a3a] px-3 pt-1.5">
        {caption}
      </figcaption>
    </figure>
  );
}

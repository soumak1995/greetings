export default function Diyas({ count }) {
  const n = count ?? (typeof window !== "undefined" && window.innerWidth < 480 ? 6 : 9);
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 h-20 sm:h-28">
      <div className="origin-bottom scale-75 sm:scale-100 mx-auto flex h-full w-fit max-w-full items-end justify-center gap-4 px-4 sm:gap-8">
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="relative h-14 w-18 flex-none">
            <div className="flame anim-flicker" />
            <div className="bowl absolute inset-x-0 bottom-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
export default function Offer() {
  const watermarkRows = [
    { text: "SAY CHEESE!", red: false },
    { text: "FRESH FEAST DELIVERED!", red: true },
    { text: "SAY CHEESE!", red: false },
    { text: "FRESH FEAST DELIVERED!", red: true },
    { text: "SAY CHEESE!", red: false },
    { text: "FRESH FEAST DELIVERED!", red: true },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#f0ebe3] min-h-120">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex flex-col justify-around">
        {watermarkRows.map((row, i) => (
          <div key={i} className="flex whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, j) => (
              <span
                key={j}
                className={`font-black uppercase text-5xl tracking-widest mr-8 ${
                  row.red
                    ? "text-red-500 opacity-25"
                    : "text-[#c8b8a8] opacity-60"
                }`}
              >
                {row.text}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="relative mx-6 my-16">
        <div className="absolute bottom-0 left-10 right-10 h-4 bg-red-500 rounded-full z-0" />
        <div className="relative bg-[#111] rounded-full min-h-65 flex items-center px-14 overflow-visible z-10">
          <h1 className="absolute top-6 left-12 text-white font-black uppercase text-[clamp(52px,9vw,108px)] leading-none tracking-tighter z-10">
            TODAY&apos;S
          </h1>
          <div className="absolute bottom-8 left-12 bg-red-500 rounded-full px-8 py-3 z-20">
            <span className="text-white font-black uppercase text-xl tracking-widest">
              Steak Society
            </span>
          </div>
          <h1 className="absolute bottom-6 right-12 text-white font-black uppercase text-[clamp(52px,9vw,108px)] leading-none tracking-tighter z-10">
            OFFER!
          </h1>
          <div className="w-full h-65" />
        </div>

        {/* Main dish — overflows bottom of pill */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-[42%] z-30 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80"
            alt="Main dish"
            className="w-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Dessert — overflows top right */}
        <div className="absolute -top-16 -right-4 w-[22%] z-30 pointer-events-none">
          {/* Plus */}
          <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-red-500 font-black text-5xl leading-none">
            +
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80"
            alt="Dessert"
            className="w-full object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

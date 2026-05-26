import Image from "next/image";

export default function Offer() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F5F1EA]">
      <BackgroundTagline />

      <div className="relative mx-auto h-120 max-w-360 sm:h-135 lg:h-142.5">
        {/* Layered dark/orange pill background */}
        <div className="pointer-events-none absolute -inset-x-25 top-[28%] h-[62%] rounded-[9999px] bg-accent" />
        <div className="pointer-events-none absolute -inset-x-40 top-[24%] h-[62%] rounded-[9999px] bg-primary" />

        {/* Glow ellipse behind the dish */}
        <div className="pointer-events-none absolute left-1/2 top-[28%] hidden h-105 w-160 translate-x-[-55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,84,63,0.55),transparent_65%)] blur-2xl sm:block" />

        {/* TODAY'S */}
        <h1 className="absolute left-6 top-[28%] font-display text-[80px] uppercase leading-none text-white sm:left-12 sm:text-[120px] lg:left-22 lg:text-[158px]">
          Today&rsquo;s
        </h1>

        {/* OFFER! */}
        <p className="absolute right-6 top-[55%] font-display text-[80px] uppercase leading-none text-white sm:right-12 sm:text-[120px] lg:right-22 lg:text-[158px]">
          offer!
        </p>

        {/* Steak Society stacked tags */}
        <div className="absolute left-6 top-[64%] sm:left-12 lg:left-30">
          <div className="relative">
            <span className="block translate-x-4.5 translate-y-2 rounded-full bg-cream px-5 py-2.5 font-display text-[24px] uppercase tracking-wide text-primary sm:text-[32px] lg:text-[40px]">
              Steak Society
            </span>
            <span className="absolute left-0 top-0 block rounded-full bg-red-500 px-5 py-2.5 font-display text-[24px] uppercase tracking-wide text-white sm:text-[32px] lg:text-[40px]">
              Steak Society
            </span>
          </div>
        </div>

        {/* Main dish */}
        <div className="pointer-events-none absolute left-1/2 top-[6%] h-105 w-105 translate-x-[-52%] sm:h-130 sm:w-130 lg:h-155 lg:w-155">
          <Image
            src="/offerFood.png"
            alt="Today's featured dish"
            fill
            priority
            sizes="(min-width: 1024px) 620px, (min-width: 640px) 520px, 420px"
            className="object-contain"
          />
        </div>

        {/* Lime tart accent (top right) */}
        <div className="pointer-events-none absolute right-[18%] top-[14%] hidden h-35 w-35 rotate-2 sm:block lg:right-[24%] lg:top-[10%] lg:h-47.5 lg:w-47.5">
          <Image
            src="/offerExtra.png"
            alt=""
            fill
            sizes="190px"
            className="object-contain"
          />
        </div>

        {/* Plus icon between dish and tart */}
        <PlusBadge className="absolute right-[33%] top-[32%] hidden text-accent sm:block lg:right-[36%]" />
      </div>
    </section>
  );
}

function BackgroundTagline() {
  const lines = Array.from({ length: 7 });
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="-rotate-6 select-none opacity-20">
        <div className="flex flex-col gap-2">
          {lines.map((_, i) => (
            <TaglineRow key={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaglineRow({ flip }: { flip: boolean }) {
  return (
    <div className="flex shrink-0 text-[#71717A] items-center gap-5 whitespace-nowrap font-display text-[90px] uppercase leading-none sm:text-[110px] lg:text-[130px]">
      <Word color={flip ? "accent" : "muted"}>Say</Word>
      <Word color="muted">Cheese</Word>
      <Dot />
      <Word color="accent">Fresh</Word>
      <Word color={flip ? "accent" : "muted"}>Fast</Word>
      <Word color="accent">Delivered!</Word>
      <Dot />
      <Word color={flip ? "muted" : "accent"}>Say</Word>
    </div>
  );
}

function Word({
  color,
  children,
}: {
  color: "muted" | "accent";
  children: React.ReactNode;
}) {
  return (
    <span className={color === "accent" ? "text-[#E8402A]" : "text-[#71717A]"}>
      {children}
    </span>
  );
}

function Dot() {
  return <span className="text-accent">·</span>;
}

function PlusBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 70"
      className={`${className ?? ""} h-14 w-14 lg:h-17.5 lg:w-17.5`}
      aria-hidden="true"
    >
      <path
        d="M35 8v54M8 35h54"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

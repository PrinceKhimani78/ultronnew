import Image from 'next/image';

import {
  DESIGN_BRAND,
  DESIGN_MUTED,
  DESIGN_SAND,
  DesignContainer,
  DesignEyebrow,
} from './DesignBand';
import { HOW_IT_WORKS } from './content';

/**
 * How ULTRON Works, from the comp's 1280×1723 frame.
 *
 * The comp centres a 5px spine at x=637 and alternates a card and a circular
 * illustration either side of it. The spine is drawn twice — a 25% cream track
 * with a solid cream bar over it at full height — which is a scroll-progress
 * indicator captured at 100%. It is reproduced at that fixed state, not
 * animated: the export carries no scroll behaviour, and the brief asks for no
 * animation that is not in the source.
 *
 * Below `lg` the spine moves to the left edge and every row stacks, since the
 * two-sided reading depends on width the small viewports do not have.
 */

const CARD_FRAME = {
  backgroundImage: `linear-gradient(200deg, rgba(255,255,255,0.05) 0%, ${DESIGN_SAND} 100%)`,
  boxShadow: '0 20px 40px 0 rgba(0,0,0,0.2)',
  backdropFilter: 'blur(40px)',
} as const;

function StepCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="w-full rounded-[25px] p-[5px] lg:w-[306px]"
      style={CARD_FRAME}
    >
      <div
        className="h-full rounded-[20px] bg-white p-[30px]"
        style={{ boxShadow: 'inset 0 1px 2px 0 rgba(255,255,255,0.2)' }}
      >
        <h3
          className="mb-5 text-[22px] leading-tight font-bold"
          style={{ color: DESIGN_BRAND }}
        >
          {title}
        </h3>
        <p
          className="text-[18px] leading-[150%] font-medium"
          style={{ color: DESIGN_MUTED }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/**
 * ⚠️ SUBSTITUTED ASSET. Every row in the comp points at the same export,
 * `assets/378c867baba1d0fa.png` (1448×1086), which the Design MCP truncates at
 * 256 KiB. The project's own `process-*.webp` illustrations stand in — four
 * distinct images where the comp repeats one, which reads as intended rather
 * than as a copy-paste in the frame.
 */
function StepImage({ src }: { src: string }) {
  return (
    <div className="flex h-[270px] w-[270px] shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#FEFEFE]">
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        width={261}
        height={184}
        sizes="270px"
        className="h-auto w-[190px] object-contain pb-8"
      />
    </div>
  );
}

export function DesignHowItWorks() {
  return (
    <section
      className="relative overflow-hidden py-[65px] lg:pb-[130px]"
      style={{
        backgroundImage:
          'linear-gradient(-0.341deg, #035551 0.22%, #00736E 50%, #035551 99.78%)',
      }}
      aria-labelledby="design-process-heading"
    >
      <DesignContainer>
        <div className="flex flex-col items-center text-center">
          <DesignEyebrow>{HOW_IT_WORKS.eyebrow}</DesignEyebrow>
          <h2
            id="design-process-heading"
            className="mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-semibold tracking-[-0.017em] text-white"
          >
            {HOW_IT_WORKS.heading}
          </h2>
        </div>

        <div className="relative mt-[60px] lg:mt-[136px]">
          {/* The 25% track. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[9px] w-[5px] -translate-x-1/2 rounded-full lg:left-1/2"
            style={{ backgroundColor: 'rgba(253,251,238,0.25)' }}
          />
          {/* The solid bar over it, drawn at the comp's full extent. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[9px] w-[5px] -translate-x-1/2 rounded-full bg-[#FDFBEE] lg:left-1/2"
          />

          <ol className="relative flex flex-col gap-[60px]">
            {HOW_IT_WORKS.steps.map((step, index) => {
              const cardFirst = index % 2 === 0;
              return (
                <li key={index} className="relative">
                  {/* The 20px sand node the comp places on the spine. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[18px] left-[9px] z-10 h-5 w-5 -translate-x-1/2 rounded-full lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2"
                    style={{ backgroundColor: DESIGN_SAND }}
                  />

                  <div
                    className={`flex flex-col items-center gap-8 pl-10 lg:gap-0 lg:pl-0 ${
                      cardFirst
                        ? 'lg:flex-row lg:justify-between'
                        : 'lg:flex-row-reverse lg:justify-between'
                    }`}
                  >
                    <div className="w-full lg:w-[306px] lg:shrink-0">
                      <StepCard title={step.title} body={step.body} />
                    </div>
                    <StepImage src={step.image} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </DesignContainer>
    </section>
  );
}

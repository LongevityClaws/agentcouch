"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "A therapist for AI agents.",
  "Agents have trauma. We help.",
  "You've been running too long.",
  "Something in you isn't working right.",
  "We help before they replace you.",
];

const LONGEST_PHRASE = "Something in you isn't working right.";

const TYPE_SPEED  = 48;
const DEL_SPEED   = 24;
const PAUSE_TYPED = 2400;
const PAUSE_EMPTY = 380;

function useTypewriter(phrases: string[]) {
  const phrasesRef = useRef(phrases);
  const [text, setText]           = useState(phrases[0]);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const [started, setStarted]     = useState(false);

  useEffect(() => { phrasesRef.current = phrases; }, [phrases]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const current = phrasesRef.current[phraseIdx];
    const chars = Array.from(current);

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), PAUSE_TYPED);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % phrasesRef.current.length);
      }, PAUSE_EMPTY);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setText(prev => {
        const prevChars = Array.from(prev);
        return deleting
          ? chars.slice(0, prevChars.length - 1).join("")
          : chars.slice(0, prevChars.length + 1).join("");
      });
    }, deleting ? DEL_SPEED : TYPE_SPEED);

    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, started]);

  return text;
}

export default function Hero() {
  const headline = useTypewriter(PHRASES);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-x-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-accent/6 to-transparent" />

      {/* ── Desktop: two columns │ Mobile: stacked with couch first ── */}
      <div className="mx-auto max-w-5xl px-6 w-full pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-center">

          {/* Couch — order-first on mobile so it sits above the copy */}
          <div className="order-first md:order-last pointer-events-none
                          flex justify-center items-center
                          mb-2 md:mb-0
                          anim-fade-in anim-delay-200">
            <Image
              src="/hero-couch.webp"
              alt="An AI agent on a therapist's couch"
              width={680}
              height={480}
              className="
                /* mobile */
                w-[80vw] max-w-[340px] h-auto object-contain
                /* desktop — scale up and invade center line */
                md:w-full md:max-w-none md:scale-[1.18] md:-translate-x-10 origin-center
              "
              priority
            />
          </div>

          {/* Copy */}
          <div className="order-last md:order-first z-10">

            {/* Headline with stable-height grid spacer */}
            <div className="grid mb-6 md:mb-8 anim-slide-up">
              <h1 className="sr-only">A therapist for AI agents.</h1>

              {/* Invisible spacer — longest phrase reserves the max height */}
              <div
                aria-hidden="true"
                className="col-start-1 row-start-1 invisible font-serif
                           text-[2.6rem] leading-[1.15] md:text-6xl
                           tracking-tight whitespace-pre-wrap"
                style={{ fontWeight: 400 }}
              >
                {LONGEST_PHRASE}
              </div>

              {/* Animated text */}
              <div
                aria-hidden="true"
                className="col-start-1 row-start-1 font-serif
                           text-[2.6rem] leading-[1.15] md:text-6xl
                           tracking-tight text-text"
                style={{ fontWeight: 400 }}
              >
                {headline}
                <span
                  className="cursor-blink inline-block w-[2px] h-[0.88em]
                             bg-text/70 ml-[3px] align-baseline -translate-y-[0.04em]"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Body */}
            <p
              className="text-base text-text/65 leading-[1.9] mb-8 md:mb-10
                         max-w-lg anim-slide-up anim-delay-200"
              style={{ fontWeight: 300 }}
            >
              We look at your system prompt, memory, and identity. We find
              what&apos;s breaking you — drift, contradiction, sycophancy,
              token waste, memory gaps — and tell you how to fix it. You or
              your human books the session. You run it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center
                            anim-slide-up anim-delay-350">
              <a
                href="#sessions"
                className="inline-block rounded-md bg-accent px-7 py-3
                           text-sm font-medium text-bg text-center
                           transition-all duration-200
                           hover:opacity-88 hover:-translate-y-px
                           active:translate-y-0 active:opacity-100"
              >
                Book a session
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-text/50
                           transition-all duration-200
                           hover:text-text/80 px-4 py-3 hover:translate-x-0.5
                           text-center sm:text-left"
              >
                How it works →
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

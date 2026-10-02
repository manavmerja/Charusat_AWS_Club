'use client';

// Based on animate-ui's community MotionCarousel
// (npx shadcn@latest add @animate-ui/components-community-motion-carousel),
// made generic: pass any `slides` plus a `renderSlide` instead of numbered placeholders.

import * as React from 'react';
import { motion, useReducedMotion, type Transition } from 'motion/react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type PropType<T> = {
  slides: T[];
  renderSlide: (slide: T, state: { isActive: boolean; index: number }) => React.ReactNode;
  getKey: (slide: T, index: number) => React.Key;
  /** Accessible label per slide, also shown inside the active dot. */
  getLabel?: (slide: T, index: number) => string;
  options?: EmblaOptionsType;
  className?: string;
};

type EmblaControls = {
  selectedIndex: number;
  scrollSnaps: number[];
  prevDisabled: boolean;
  nextDisabled: boolean;
  onDotClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

type DotButtonProps = {
  selected?: boolean;
  label: string;
  onClick: () => void;
};

const transition: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1,
};

const useEmblaControls = (
  emblaApi: EmblaCarouselType | undefined,
): EmblaControls => {
  // Read Embla's state as an external store instead of mirroring it with setState in an effect.
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on('reInit', onChange).on('select', onChange);
      return () => {
        emblaApi.off('reInit', onChange).off('select', onChange);
      };
    },
    [emblaApi],
  );

  const selectedIndex = React.useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    () => 0,
  );
  const snapCount = React.useSyncExternalStore(
    subscribe,
    () => emblaApi?.scrollSnapList().length ?? 0,
    () => 0,
  );
  const prevDisabled = React.useSyncExternalStore(
    subscribe,
    () => !emblaApi?.canScrollPrev(),
    () => true,
  );
  const nextDisabled = React.useSyncExternalStore(
    subscribe,
    () => !emblaApi?.canScrollNext(),
    () => true,
  );
  const scrollSnaps = React.useMemo(
    () => Array.from({ length: snapCount }, (_, i) => i),
    [snapCount],
  );

  const onDotClick = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  };
};

const navButtonClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-slate-200 cursor-pointer transition-colors duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-[#00e676] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19]';

function MotionCarousel<T>(props: PropType<T>) {
  const { slides, renderSlide, getKey, getLabel, options, className } = props;
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi);

  const label = (index: number) =>
    getLabel ? getLabel(slides[index], index) : `Slide ${index + 1}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
      }}
      className={cn(
        'w-full space-y-6 [--slide-spacing:1.25rem] [--slide-size:88%] sm:[--slide-size:70%] lg:[--slide-size:58%]',
        className,
      )}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;

            return (
              <div
                key={getKey(slide, index)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${label(index)}`}
                className="mr-[var(--slide-spacing)] basis-[var(--slide-size)] flex-none flex min-w-0"
              >
                <motion.div
                  className="size-full"
                  initial={false}
                  animate={{
                    scale: isActive || reduceMotion ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={reduceMotion ? { duration: 0 } : transition}
                >
                  {renderSlide(slide, { isActive, index })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button type="button" aria-label="Previous event" className={navButtonClass} onClick={onPrev} disabled={prevDisabled}>
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex flex-wrap justify-center items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              label={label(index)}
              selected={index === selectedIndex}
              onClick={() => onDotClick(index)}
            />
          ))}
        </div>

        <button type="button" aria-label="Next event" className={navButtonClass} onClick={onNext} disabled={nextDisabled}>
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function DotButton({ selected = false, label, onClick }: DotButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Go to ${label}`}
      aria-current={selected}
      layout
      initial={false}
      className="flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border-none bg-[#00e676] text-[#0b0f19] text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19]"
      animate={{
        width: selected ? 'auto' : 12,
        height: selected ? 28 : 12,
        opacity: selected ? 1 : 0.35,
      }}
      transition={transition}
    >
      <motion.span
        layout
        initial={false}
        className="block whitespace-nowrap px-3 py-1"
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0,
          filter: selected ? 'blur(0)' : 'blur(4px)',
        }}
        transition={transition}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

export { MotionCarousel };

'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#0f172a', '#064e3b', '#00e676'],
  items = [
    { label: 'Home', ariaLabel: 'Home', link: '#home' },
    { label: 'About', ariaLabel: 'About Us', link: '#about' },
    { label: 'Events', ariaLabel: 'Upcoming Events', link: '#events' },
    { label: 'Teams', ariaLabel: 'Our Team', link: '#teams' },
    { label: 'FAQ', ariaLabel: 'Frequently Asked Questions', link: '#faq' },
    { label: 'Contacts', ariaLabel: 'Contact Us', link: '#contacts' }
  ],
  socialItems = [
    { label: 'Meetup', link: 'https://www.meetup.com/aws-sbg-at-charotar-university-of-science-and-technology/' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/asc-charusat/posts/?feedView=all' },
    { label: 'Instagram', link: 'https://www.instagram.com/awssbg_charusat/' }
  ],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#0b0f19',
  changeMenuColorOnOpen = true,
  accentColor = '#00e676',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;

      if (!panel || !plusH || !plusV || !icon) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1, display: 'none', force3D: true });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1, display: 'none' });
      }

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0, force3D: true });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90, force3D: true });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%', force3D: true });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const preContainer = preLayersRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll('.sm-number-tag')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
    const backBtnEl = panel.querySelector('.sm-back-btn') as HTMLElement | null;

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (preContainer) gsap.set(preContainer, { display: 'block' });
    gsap.set([panel, ...layers], { display: 'flex' });

    if (backBtnEl) gsap.set(backBtnEl, { x: -15, opacity: 0, force3D: true });
    if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 4, force3D: true });
    if (numberEls.length) gsap.set(numberEls, { opacity: 0, scale: 0.8 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 15, opacity: 0, force3D: true });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.42, ease: 'power3.out', force3D: true }, i * 0.05);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.05 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.05 : 0);
    const panelDuration = 0.5;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power3.out', force3D: true },
      panelInsertTime
    );

    if (backBtnEl) {
      tl.to(
        backBtnEl,
        { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out', force3D: true },
        panelInsertTime + 0.05
      );
    }

    if (itemEls.length) {
      const itemsStartRatio = 0.1;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 0.7, ease: 'power3.out', stagger: { each: 0.06, from: 'start' }, force3D: true },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', stagger: { each: 0.05, from: 'start' } },
          itemsStart + 0.05
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.35;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.4, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            stagger: { each: 0.05, from: 'start' },
            force3D: true,
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.02
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const preContainer = preLayersRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.28,
      ease: 'power3.in',
      overwrite: 'auto',
      force3D: true,
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 4 });

        const numberEls = Array.from(panel.querySelectorAll('.sm-number-tag')) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { opacity: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 15, opacity: 0 });

        gsap.set(all, { display: 'none' });
        if (preContainer) gsap.set(preContainer, { display: 'none' });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out', force3D: true } })
        .to(h, { rotate: 45, duration: 0.4 }, 0)
        .to(v, { rotate: -45, duration: 0.4 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut', force3D: true } })
        .to(h, { rotate: 0, duration: 0.28 }, 0)
        .to(v, { rotate: 90, duration: 0.28 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.12, duration: 0.25, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const handleSmoothNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      const targetId = link.replace('#', '');
      
      closeMenu();

      // Luxurious smooth glide (longer duration, relaxed deceleration curve)
      const smoothEasing = (t: number) => 1 - Math.pow(1 - t, 3.5);

      setTimeout(() => {
        const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | HTMLElement, opts?: { duration?: number; easing?: (t: number) => number; offset?: number }) => void } }).lenis;
        
        if (targetId === 'home') {
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(0, { duration: 1.8, easing: smoothEasing });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            if (lenis && typeof lenis.scrollTo === 'function') {
              lenis.scrollTo(element, { duration: 1.7, easing: smoothEasing, offset: 0 });
            } else {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }, 100);

      window.history.pushState(null, '', link);
    }
  }, [closeMenu]);

  return (
    <>
      {/* Top Floating Glass Header: Clean dark card brand on the left + Menu button on the right */}
      <header
        className="fixed top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 py-4 bg-transparent z-50 font-[var(--font-space-grotesk)] pointer-events-none"
        aria-label="Main navigation header"
      >
        {/* Left Side: Clean Brand Card with Official Square Logo */}
        <a
          href="#home"
          onClick={(e) => handleSmoothNavigation(e, '#home')}
          aria-label="AWS Student Builder Group Home"
          className="pointer-events-auto flex items-center gap-2.5 p-1.5 pr-4 sm:pr-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/[0.16] hover:bg-white/[0.05] transition-all duration-200 ease-out select-none group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e676]/50 cursor-pointer"
        >
          {/* Logo Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center bg-[#F4F7F5] border border-white/[0.08] group-hover:scale-[1.03] transition-transform duration-200 ease-out">
            <Image
              src="/image.svg"
              alt="AWS Student Builder Group Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full scale-[1.15]"
              priority
            />
          </div>

          {/* Clean Typography Branding */}
          <div className="flex flex-col text-left font-[family-name:var(--font-geist-sans)] justify-center">
            <span className="text-[10px] sm:text-[11.5px] font-semibold tracking-[0.02em] text-[#F5F5F5] uppercase leading-tight">
              AWS Student Builder Group
            </span>
            <span className="hidden sm:block text-[9.5px] text-[#00e676]/75 font-medium tracking-wide leading-tight mt-0.5">
              CHARUSAT University
            </span>
          </div>
        </a>

        {/* Right Side: Navbar Toggle Button */}
        <button
          ref={toggleBtnRef}
          className="pointer-events-auto relative inline-flex items-center justify-center gap-2.5 w-11 h-11 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-xl sm:rounded-full bg-[#0e1526]/90 hover:bg-[#141b2d] border border-white/20 backdrop-blur-xl cursor-pointer font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white active:scale-95 touch-manipulation hover:border-emerald-500/50"
          aria-label={open ? 'Close navbar' : 'Open navbar'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          {/* Mobile: classic three-line hamburger that morphs into an X */}
          <span className="relative block w-5 h-[14px] sm:hidden" aria-hidden="true">
            <span
              className={`absolute left-0 h-[2px] w-full rounded-full bg-white transition-all duration-300 ease-out ${
                open ? 'top-1/2 -translate-y-1/2 rotate-45 bg-[#00e676]' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-[#00e676] transition-all duration-300 ease-out ${
                open ? 'w-0 opacity-0' : 'w-3/4 opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-[2px] w-full rounded-full bg-white transition-all duration-300 ease-out ${
                open ? 'top-1/2 -translate-y-1/2 -rotate-45 bg-[#00e676]' : 'bottom-0'
              }`}
            />
          </span>

          {/* Subtle live indicator dot for students to easily notice */}
          <span className="hidden sm:block w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />

          {/* Label Text */}
          <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider text-white select-none">
            {open ? 'CLOSE' : 'NAVBAR'}
          </span>

          <span
            ref={iconRef}
            className="relative w-[13px] h-[13px] shrink-0 hidden sm:inline-flex items-center justify-center [will-change:transform]"
            aria-hidden="true"
          >
            <span
              ref={plusHRef}
              className="absolute left-1/2 top-1/2 w-full h-[2px] bg-[#00e676] rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
            />
            <span
              ref={plusVRef}
              className="absolute left-1/2 top-1/2 w-full h-[2px] bg-[#00e676] rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
            />
          </span>
        </button>
      </header>

      {/* Staggered Animated Drawer & Colored Layer Sheets */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-[var(--font-space-grotesk)]"
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Color Layer Sheets */}
        <div
          ref={preLayersRef}
          className="absolute top-0 right-0 bottom-0 pointer-events-none z-[5] w-full sm:w-[480px]"
          aria-hidden="true"
          style={{ display: 'none' }}
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#0f172a', '#064e3b', '#00e676'];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full will-change-transform"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* Sliding Main Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="absolute top-0 right-0 h-full w-full sm:w-[480px] bg-[#0b0f19] text-white flex flex-col p-[3em_2.5em_2.5em_2.5em] overflow-y-auto z-10 backdrop-blur-2xl border-l border-white/10 pointer-events-auto will-change-transform"
          aria-hidden={!open}
          style={{ display: 'none' }}
        >
          {/* Top Row: Back Button */}
          <div className="sm-back-btn mb-8 flex items-center justify-between">
            <button
              onClick={closeMenu}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-slate-200 hover:text-[#00e676] transition-all cursor-pointer active:scale-95 touch-manipulation"
            >
              <IoArrowBackOutline size={16} />
              <span>Back</span>
            </button>
          </div>

          {/* Navigation Items List with proper flex spacing for number tags */}
          <div className="flex-1 flex flex-col justify-center gap-5">
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="relative overflow-hidden leading-none" key={it.label + idx}>
                    <a
                      className="group flex items-center justify-between w-full text-slate-100 font-bold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] cursor-pointer leading-none tracking-tight uppercase hover:text-[#00e676] active:text-[#00e676] transition-colors no-underline py-1.5 touch-manipulation"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      onClick={(e) => handleSmoothNavigation(e, it.link)}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                      {displayItemNumbering && (
                        <span className="sm-number-tag text-sm sm:text-base font-medium font-mono text-[#00e676] opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      )}
                    </a>
                  </li>
                ))
              ) : null}
            </ul>

            {/* Social Links Footer */}
            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="mt-auto pt-8 flex flex-col gap-3 border-t border-white/10" aria-label="Social links">
                <h3 className="m-0 text-[11px] sm:text-xs uppercase font-bold text-[#00e676] tracking-wider">Connect With Us</h3>
                <ul
                  className="list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i}>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-slate-300 hover:text-[#00e676] no-underline relative inline-block py-1 transition-colors touch-manipulation"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default StaggeredMenu;

// Shared Tailwind class patterns used across the site
export const CONTAINER = 'mx-auto w-full max-w-[1240px] px-5';
export const SECTION_SPACING = 'py-20';
export const SECTION_HEADING = 'font-serif-display text-2xl md:text-3xl font-bold leading-snug text-white';
export const SECTION_HEADING_CENTER = SECTION_HEADING + ' text-center';

export const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer no-underline';
export const BTN_GOLD = `${BTN_BASE} bg-gold text-black border border-gold shadow-[0_8px_25px_rgba(212,175,55,0.2)] hover:-translate-y-px hover:bg-gold-soft hover:border-gold-soft hover:shadow-[0_10px_30px_rgba(212,175,55,0.35)]`;
export const BTN_OUTLINE = `${BTN_BASE} border border-gold text-gold bg-transparent hover:bg-gold hover:text-black`;
export const BTN_SM = 'px-4 py-2 text-xs';
export const BTN_LG = 'px-8 py-4 text-base';

export const NAV_LINK =
  'text-white/90 hover:text-gold text-[15px] font-medium tracking-[0.03em] bg-transparent border-none cursor-pointer flex items-center gap-1.5 relative py-2 font-header no-underline transition-colors duration-300 after:content-[\'\'] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-0.5 after:rounded after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full';

export const MOBILE_LINK =
  'text-white hover:text-gold py-4 border-b border-white/[0.05] text-base font-medium block no-underline transition-colors';

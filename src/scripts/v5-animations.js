// V5 DLX Animations — ported and mapped to current homepage
(function(){
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    if(!RM){
      const stats = document.querySelector('.stats-section');
      if(stats){
        stats.classList.add('dlx-has-sweep');
        if(!stats.querySelector('.dlx-sweep')){
          const w2=document.createElement('div');
          w2.className='dlx-sweep';
          w2.innerHTML='<i></i><i></i><i></i>';
          stats.insertBefore(w2, stats.firstChild);
        }
      }
    }
    const targets = [
      ...document.querySelectorAll('section h1, section h2, section h3'),
      ...document.querySelectorAll('section p'),
      ...document.querySelectorAll('.stats-section .count-up'),
      ...document.querySelectorAll('section a.bg-gold, section a[class*="border-gold"], section button'),
      ...document.querySelectorAll('section .grid > div'),
    ];
    const uniq = [...new Set(targets)];
    const filtered = uniq.filter(el=> !(el.closest('header') || el.closest('footer')));
    if(RM || !('IntersectionObserver' in window)){
      filtered.forEach(t=>t.classList.add('dlx-rv','dlx-in'));
    } else {
      filtered.forEach((t, idx)=>{
        t.classList.add('dlx-rv');
        t.style.transitionDelay = (Math.min(idx%4,3)*0.08)+'s';
      });
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(x=>{
          if(x.isIntersecting){
            x.target.classList.add('dlx-in');
            io.unobserve(x.target);
          }
        });
      },{threshold:0.12, rootMargin:'0px 0px -6% 0px'});
      filtered.forEach(t=>io.observe(t));
    }
    const nums = [...document.querySelectorAll('.count-up, .dlx-n')];
    function fmt(v,el){
      const suffix = el.dataset.suffix || el.dataset.suf || '';
      const isRaw = el.dataset.fmt==='raw';
      const s = isRaw ? String(v) : v.toLocaleString();
      return s + suffix;
    }
    if(nums.length){
      if(RM || !('IntersectionObserver' in window)){
        nums.forEach(el=>{ el.textContent = fmt(+el.dataset.to, el); });
      } else {
        const so = new IntersectionObserver((entries)=>{
          entries.forEach(x=>{
            if(!x.isIntersecting) return;
            const el=x.target;
            const to=+el.dataset.to, from=+(el.dataset.from||0), dur=1700;
            let t0=null;
            function step(ts){
              if(!t0) t0=ts;
              const p=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-p,3);
              el.textContent = fmt(Math.round(from+(to-from)*e), el);
              if(p<1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            so.unobserve(el);
          });
        },{threshold:0.6});
        nums.forEach(el=>so.observe(el));
      }
    }
    document.querySelectorAll('section .grid > div, section .rounded-xl, section .rounded-2xl').forEach(c=>{
      if(c.closest('#booking') || c.querySelector('form') || c.closest('form')) return;
      if(c.querySelector('img') || c.classList.contains('border')){
        c.classList.add('dlx-card');
      }
    });
    document.querySelectorAll('a.block.overflow-hidden').forEach(a=>a.classList.add('dlx-imgwrap'));
    document.querySelectorAll('a.bg-gold,a.border-gold,a.border-white\\/30,button.bg-gold,a[href^="tel:"],.gold-shimmer-btn').forEach(b=>{
      b.classList.add('dlx-btn');
      const cs=getComputedStyle(b);
      const bg=cs.backgroundColor||'';
      const m=bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
      if(m){
        const alpha = m[4]===undefined ? 1 : parseFloat(m[4]);
        const lum=(0.299*+m[1]+0.587*+m[2]+0.114*+m[3]);
        if(alpha<0.15) b.classList.add('dlx-btn-ghost');
        else if(lum>110) b.classList.add('dlx-btn-light');
      } else {
        b.classList.add('dlx-btn-ghost');
      }
    });
    const hdr=document.getElementById('luxHeader') || document.querySelector('header');
    if(hdr && !RM){
      hdr.classList.add('dlx-hdr-shrink');
      const onScroll=()=>{ hdr.classList.toggle('dlx-condensed', window.scrollY>60); };
      window.addEventListener('scroll', onScroll, {passive:true});
      onScroll();
    }
    // eventDate picker is handled by BookingSection.astro via flatpickr
    (function(){
      var dt=document.getElementById('eventDate');
      if(dt) dt.style.cursor='pointer';
    })();
  });
})();

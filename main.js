    /* ── MENU ─────────────────────────────────────────────────── */
    const overlay  = document.getElementById('menu-overlay');
    const trigger  = document.getElementById('menu-trigger');

    menuLinks.forEach(({ label, href, action }) => {
      const a = document.createElement('a');
      a.href = href;
      a.className = 'flip-link';
      if (action === 'contact') a.setAttribute('data-open-contact', '');
      const top = document.createElement('div');
      top.className = 'flip-top';
      const bot = document.createElement('div');
      bot.className = 'flip-bottom';
      [...label].forEach((ch, i) => {
        const d = `${i * 24}ms`;
        const st = document.createElement('span');
        st.textContent = ch === ' ' ? '\u00A0' : ch;
        st.style.transitionDelay = d;
        const sb = document.createElement('span');
        sb.textContent = ch === ' ' ? '\u00A0' : ch;
        sb.style.transitionDelay = d;
        top.appendChild(st);
        bot.appendChild(sb);
      });
      a.appendChild(top);
      a.appendChild(bot);
      a.addEventListener('click', closeMenu);
      // Keep menu socials at the bottom by inserting before them
      const socials = overlay.querySelector('.menu-socials');
      if (socials) overlay.insertBefore(a, socials);
      else overlay.appendChild(a);
    });

    function openMenu()  {
      overlay.classList.add('open');
      trigger.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      overlay.classList.remove('open');
      trigger.classList.remove('open');
      if (!document.getElementById('contact-popup').classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
    trigger.addEventListener('click', () =>
      overlay.classList.contains('open') ? closeMenu() : openMenu()
    );
    overlay.addEventListener('click', e => { if (e.target === overlay) closeMenu(); });


    /* ── CONTACT POPUP ────────────────────────────────────────
       Opened by the BOOK button and any [data-open-contact] link.
       Closed via the X, Escape, or clicking the backdrop. */
    (function initContactPopup() {
      const popup = document.getElementById('contact-popup');
      const closeBtn = document.getElementById('contact-popup-close');
      const bookBtn = document.getElementById('book-btn');
      const form = document.getElementById('contact-popup-form');
      const submit = document.getElementById('cp-submit');

      function openPopup(e) {
        if (e) e.preventDefault();
        popup.classList.add('open');
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          const first = popup.querySelector('input, select, textarea');
          if (first) first.focus();
        }, 300);
      }
      function closePopup() {
        popup.classList.remove('open');
        popup.setAttribute('aria-hidden', 'true');
        if (!overlay.classList.contains('open')) {
          document.body.style.overflow = '';
        }
      }

      function togglePopup(e) {
        if (e) e.preventDefault();
        popup.classList.contains('open') ? closePopup() : openPopup();
      }
      bookBtn.addEventListener('click', togglePopup);
      closeBtn.addEventListener('click', closePopup);
      popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && popup.classList.contains('open')) closePopup();
      });
      document.addEventListener('click', e => {
        const trig = e.target.closest('[data-open-contact]');
        if (trig) openPopup(e);
      });

      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const original = submit.innerHTML;
        submit.textContent = 'Message Sent ✓';
        submit.disabled = true;
        setTimeout(() => {
          submit.innerHTML = original;
          submit.disabled = false;
          form.reset();
          closePopup();
        }, 2500);
      });
    })();


    /* ── HERO ─────────────────────────────────────────────────── */
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    const shuffledImgs = shuffle([...heroImages]);
    const heroWords = [
      { text: 'BUFFALO', id: 'row-buffalo' },
      { text: 'STUDIO',  id: 'row-studio'  }
    ];
    const allLetters = [];
    let imgCursor = 0;

    heroWords.forEach(({ text, id }) => {
      const row = document.getElementById(id);
      [...text].forEach(ch => {
        const img = shuffledImgs[imgCursor++ % shuffledImgs.length];
        const el = document.createElement('span');
        el.className = 'letter';

        const imgEl = document.createElement('span');
        imgEl.className = 'letter-image';
        imgEl.style.backgroundImage = `url('${img}')`;
        imgEl.textContent = ch;

        const baseEl = document.createElement('span');
        baseEl.className = 'letter-base';
        baseEl.textContent = ch;

        const overlayEl = document.createElement('span');
        overlayEl.className = 'letter-overlay';
        overlayEl.textContent = ch;

        el.appendChild(imgEl);
        el.appendChild(baseEl);
        el.appendChild(overlayEl);
        row.appendChild(el);
        allLetters.push({ letterEl: el, imageEl: imgEl, overlayEl });
      });
    });

    document.getElementById('hero').addEventListener('mousemove', e => {
      const xp = e.clientX / window.innerWidth;
      const yp = e.clientY / window.innerHeight;
      allLetters.forEach(({ imageEl }) => {
        imageEl.style.backgroundPosition = `${10 + xp * 80}% ${10 + yp * 80}%`;
      });
    });

    allLetters.forEach(({ letterEl }, i) => {
      setTimeout(() => {
        letterEl.style.transform = 'scale(1)';
        letterEl.style.opacity  = '1';
      }, i * 80);
    });

    setTimeout(() => {
      allLetters.forEach(({ overlayEl }, i) => {
        setTimeout(() => {
          overlayEl.style.setProperty('--flash-duration', '0.5s');
          overlayEl.classList.remove('flash');
          void overlayEl.offsetWidth;
          overlayEl.classList.add('flash');
        }, i * 50);
      });
    }, (allLetters.length - 1) * 80 + 600);


    /* ── GALLERY ──────────────────────────────────────────────── */
    gsap.registerPlugin(Flip);

    const galGrid    = document.getElementById('gallery-grid');
    const galFilters = document.getElementById('gallery-filters');
    const lightbox   = document.getElementById('lightbox');
    const lbImg      = lightbox.querySelector('img');
    const usedCats   = new Set();

    galFiles.forEach(name => {
      const raw = name.split('_').pop().split('.')[0];
      const cat = catMap[raw] || { key: raw, label: raw };
      usedCats.add(cat.key);

      const div = document.createElement('div');
      div.className = 'g-item';
      div.dataset.flip = cat.key;
      div.innerHTML = `<img src="assets/${name}" alt="Buffalo Studio ${cat.label} — ${name.replace(/\.(jpg|png)$/i,'').replace(/_/g,' ')}" loading="lazy" decoding="async">`;
      div.addEventListener('click', () => {
        lbImg.src = `assets/${name}`;
        lightbox.style.display = 'flex';
        gsap.to(lightbox, { opacity: 1, duration: 0.35, ease: 'power2.out' });
        gsap.fromTo(lbImg, { scale: 0.88 }, { scale: 1, duration: 0.5, ease: 'back.out(1.4)' });
      });
      galGrid.appendChild(div);
    });

    lightbox.addEventListener('click', () => {
      gsap.to(lightbox, { opacity: 0, duration: 0.28, onComplete: () => {
        lightbox.style.display = 'none';
        lbImg.src = '';
      }});
    });

    let filterHtml = `<button class="gal-btn active" data-filter="all">All</button>`;
    ['control','live','gear','instru'].forEach(key => {
      if (usedCats.has(key)) {
        filterHtml += `<button class="gal-btn" data-filter="${key}">${catMap[key].label}</button>`;
      }
    });
    galFilters.innerHTML = filterHtml;

    const galBtns  = galFilters.querySelectorAll('.gal-btn');
    const galItems = galGrid.querySelectorAll('.g-item');

    galBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;

        const state = Flip.getState(galItems);
        galBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        galItems.forEach(item => {
          item.classList.toggle('hidden', f !== 'all' && item.dataset.flip !== f);
        });

        Flip.from(state, {
          duration: 0.5, scale: true, ease: 'power2.inOut', stagger: 0.02,
          onEnter: els => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
          onLeave: els => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
        });
      });
    });


    /* ── EQUIPMENT ────────────────────────────────────────────── */
    const equipWrap = document.getElementById('equip-blocks');
    equipData.forEach(({ cat, items }) => {
      const block = document.createElement('div');
      block.className = 'section-block';
      const h3 = document.createElement('h3');
      h3.textContent = cat;
      const ul = document.createElement('ul');
      items.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
      block.appendChild(h3);
      block.appendChild(ul);
      equipWrap.appendChild(block);
    });

    /* Proximity highlight — throttled to rAF, cached NodeList,
       and only runs when the equipment section is in view. */
    const equipItems = equipWrap.querySelectorAll('li');
    let equipVisible = false;
    let equipRafPending = false;
    let equipMouseX = 0;
    let equipMouseY = 0;

    const equipObs = new IntersectionObserver(([entry]) => {
      equipVisible = entry.isIntersecting;
    }, { threshold: 0 });
    equipObs.observe(equipWrap);

    document.addEventListener('mousemove', e => {
      if (!equipVisible || equipRafPending) return;
      equipMouseX = e.clientX;
      equipMouseY = e.clientY;
      equipRafPending = true;
      requestAnimationFrame(() => {
        equipItems.forEach(li => {
          const r  = li.getBoundingClientRect();
          const dy = Math.abs(equipMouseY - (r.top + r.height / 2));
          const dx = Math.abs(equipMouseX - (r.left + r.width  / 2));
          li.style.color = (dy < 80 && dx < 200) ? '#fff' : '';
        });
        equipRafPending = false;
      });
    });


    /* ── TESTIMONIALS (slider) ─────────────────────────────────
       Builds slides from the data array. A single translateX on
       the track handles the transition — no per-slide classes,
       no animation library needed. Auto-rotates every 8s and
       pauses on pointer hover. */
    (function initTestiSlider() {
      const track = document.getElementById('testi-track');
      const dotsC = document.getElementById('testi-dots');
      const prev  = document.getElementById('testi-prev');
      const next  = document.getElementById('testi-next');
      if (!track) return;

      // Build slides + dot buttons
      testimonials.forEach((t, i) => {
        const slide = document.createElement('div');
        slide.className = 'testi-slide';
        slide.innerHTML = `
          <p class="testi-slide-quote">"${t.quote}"</p>
          <div class="testi-slide-meta">
            <span class="testi-slide-author">${t.author}</span>
            <span class="testi-slide-idx"><b>${String(i + 1).padStart(2, '0')}</b> / ${String(testimonials.length).padStart(2, '0')}</span>
          </div>`;
        track.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = 'testi-dot-btn' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => go(i));
        dotsC.appendChild(dot);
      });

      let idx = 0;
      const total = testimonials.length;

      function go(i) {
        idx = (i + total) % total;
        track.style.transform = `translateX(-${idx * 100}%)`;
        dotsC.querySelectorAll('.testi-dot-btn').forEach((d, di) => {
          d.classList.toggle('active', di === idx);
        });
      }
      prev.addEventListener('click', () => go(idx - 1));
      next.addEventListener('click', () => go(idx + 1));

      // Auto-advance; pause on hover for breathing room.
      let timer = setInterval(() => go(idx + 1), 8000);
      const section = document.getElementById('testimonials');
      section.addEventListener('mouseenter', () => clearInterval(timer));
      section.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = setInterval(() => go(idx + 1), 8000);
      });
    })();


/* ── EQUIPMENT SHOW / HIDE (mobile) ────────────────────────
       We find the 'Monitoring' block and hide all category blocks
       that come after it by default. Clicking the button reveals them. */
    (function initEquipToggle() {
      const btn = document.getElementById('equip-toggle');
      if (!btn) return;
      
      const labelEl = btn.querySelector('.equip-toggle-label');
      
      function updateVisibility(isExpanded) {
        // Select the blocks dynamically in case they just rendered
        const allBlocks = document.querySelectorAll('.section-block'); 
        
        if (window.innerWidth <= 768) {
          let hideCurrent = false; // Flag to know when we've passed Monitoring
          
          allBlocks.forEach(block => {
            if (hideCurrent) {
              // We are past 'Monitoring', so hide it if not expanded
              block.style.display = isExpanded ? '' : 'none';
            } else {
              // We haven't passed 'Monitoring' yet, always show it
              block.style.display = '';
            }

            // Check if THIS block is 'Monitoring'. 
            // If it is, flag that the NEXT blocks should be hidden.
            const h3 = block.querySelector('h3');
            if (h3 && h3.textContent.trim().toLowerCase() === 'monitoring') {
              hideCurrent = true;
            }
          });
        } else {
          // On desktop, ensure all blocks are visible
          allBlocks.forEach(block => block.style.display = '');
        }
      }

      // 1. Set initial state on load (delay slightly to ensure blocks are rendered)
      setTimeout(() => updateVisibility(false), 50);

      // 2. Re-calculate if the user rotates their phone or resizes
      window.addEventListener('resize', () => {
        const expanded = document.body.getAttribute('data-equip-expanded') === 'true';
        updateVisibility(expanded);
      });

      // 3. Handle the button click
      btn.addEventListener('click', () => {
        const expanded = document.body.getAttribute('data-equip-expanded') === 'true';
        const next = !expanded;
        
        document.body.setAttribute('data-equip-expanded', String(next));
        btn.setAttribute('aria-expanded', String(next));
        labelEl.textContent = next ? 'Show Less' : 'Show Full Inventory';
        
        updateVisibility(next);
      });
    })();


    /* ── MARQUEE ─────────────────────────────────────────────── */
    (function() {
      const track = document.getElementById('marquee-track');
      if (!track) return;

      let pos = 0;
      let lastT = null;
      let lastScrollY = window.scrollY;
      let smoothVel = 0;
      let rafId = null;
      let isVisible = false;
      const copyW = track.children[0] ? track.children[0].offsetWidth : 0;

      function lerp(a, b, t) { return a + (b - a) * t; }

      function frame(t) {
        if (!lastT) lastT = t;
        const dt = Math.min(t - lastT, 50) / 1000;
        lastT = t;

        const curY = window.scrollY;
        const rawVel = (curY - lastScrollY) / (dt || 0.016);
        lastScrollY = curY;

        smoothVel = lerp(smoothVel, rawVel, 0.12);

        const speed = -300 + smoothVel * -0.08;
        pos += speed * dt;

        if (copyW > 0) {
          if (pos <= -copyW) pos += copyW;
          if (pos > 0)       pos -= copyW;
        }

        track.style.transform = `translateX(${pos}px)`;
        rafId = requestAnimationFrame(frame);
      }

      function start() {
        if (rafId) return;
        lastT = null;
        lastScrollY = window.scrollY;
        rafId = requestAnimationFrame(frame);
      }

      function stop() {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }

      const marqueeObs = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? start() : stop();
      }, { threshold: 0 });
      marqueeObs.observe(track);
    })();


    /* ── SCROLL REVEAL ────────────────────────────────────────── */
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

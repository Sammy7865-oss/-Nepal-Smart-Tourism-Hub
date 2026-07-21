/* =============================================================
   NEPAL SMART TOURISM HUB — SCRIPT
   Vanilla JS only. No dependencies.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     1. STICKY NAVBAR + SHRINK ON SCROLL + ACTIVE LINK
     ----------------------------------------------------------- */
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  function setActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 160;
    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
<<<<<<< HEAD
      link.classList.toggle('is-active', link.getAttribute('href') === #${current});
=======
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
>>>>>>> 1cdd0033a9d339bd3325d05ea982e682912a70e9
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* -----------------------------------------------------------
     2. MOBILE MENU TOGGLE
     ----------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* -----------------------------------------------------------
     3. SMOOTH SCROLL (for browsers / offsets needing JS control)
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* -----------------------------------------------------------
     4. HERO TYPING EFFECT
     ----------------------------------------------------------- */
  const typingEl = document.getElementById('heroTyping');
  const typingPhrases = [
    'Sea-level jungle to 8,848 metres of ice.',
    'Six ecological zones. One border.',
    'Trek, pray, paddle, or paraglide — by elevation.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = typingPhrases[phraseIndex];
    if (!isDeleting) {
      charIndex++;
      typingEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 30 : 55);
  }
  if (typingEl) typeLoop();

  /* -----------------------------------------------------------
     5. SCROLL REVEAL (Intersection Observer)
     ----------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------------
     6. ANIMATED COUNTERS
     ----------------------------------------------------------- */
  const counters = document.querySelectorAll('.stat__number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));

  /* -----------------------------------------------------------
     7. ALTITUDE TIMELINE INTERACTION
     ----------------------------------------------------------- */
  const altitudeMarkers = document.querySelectorAll('.altitude__marker');
  const altitudeDetailCards = document.querySelectorAll('.altitude__detail-card');
  const altitudeFill = document.getElementById('altitudeFill');
  const altitudeTimeline = document.getElementById('altitudeTimeline');

  function activateStop(targetId, fillPercent) {
    altitudeDetailCards.forEach((card) => card.classList.toggle('is-active', card.id === targetId));
    altitudeMarkers.forEach((marker) => marker.classList.toggle('is-active', marker.getAttribute('data-target') === targetId));
    if (altitudeFill) altitudeFill.style.width = fillPercent + '%';
  }

  altitudeMarkers.forEach((marker) => {
    const stopEl = marker.closest('.altitude__stop');
    const posStr = stopEl.style.getPropertyValue('--stop-pos').replace('%', '');
    marker.addEventListener('click', () => {
      activateStop(marker.getAttribute('data-target'), parseFloat(posStr));
    });
  });

  // Reveal the fill as the timeline scrolls into view, then default to first stop
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateStop('stop-everest', 2);
        timelineObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  if (altitudeTimeline) timelineObserver.observe(altitudeTimeline);

  /* -----------------------------------------------------------
     8. SMART PLANNER
     ----------------------------------------------------------- */
  const plannerRegion = document.getElementById('plannerRegion');
  const plannerSeason = document.getElementById('plannerSeason');
  const plannerResult = document.getElementById('plannerResult');

  const plannerData = {
    everest: {
      spring: { weather: '−5° to 12°C, clear mornings, afternoon cloud build-up.', season: 'Prime trekking season — best mountain visibility of the year.', difficulty: 'Challenging — high altitude, 12–14 day itinerary.', packing: ['Down jacket (−15°C rated)', 'Insulated trekking boots', 'Water purification tablets', 'Diamox (consult a doctor)'], route: 'Lukla → Namche → Tengboche → Dingboche → Base Camp, with 2 acclimatisation days.' },
      summer: { weather: 'Monsoon rain below 4,000m, snow above. Poor visibility.', season: 'Not recommended — trails are wet, flights to Lukla often delayed.', difficulty: 'High risk — landslide and visibility concerns.', packing: ['Waterproof shell', 'Leech socks', 'Quick-dry layers'], route: 'Most operators pause EBC departures June–August.' },
      autumn: { weather: '−2° to 15°C, the clearest skies of the year.', season: 'Peak season alongside spring — book 2–3 months ahead.', difficulty: 'Challenging — same profile as spring, busier trails.', packing: ['Down jacket', 'Trekking poles', 'Sun protection (UV is intense at altitude)'], route: 'Same route as spring; expect fuller tea houses.' },
      winter: { weather: '−15° to 2°C, dry air, sub-zero nights.', season: 'Quiet season for experienced cold-weather trekkers.', difficulty: 'Severe — extreme cold, some passes may close.', packing: ['Expedition-grade sleeping bag', 'Four-season layers', 'Hand and foot warmers'], route: 'Shorter daylight hours mean earlier starts each day.' }
    },
    annapurna: {
      spring: { weather: '8° to 20°C, rhododendrons in bloom.', season: 'One of the best times to trek — flowering forest trails.', difficulty: 'Moderate — passes above 5,000m need acclimatisation.', packing: ['Mid-weight fleece', 'Rain shell', 'Trekking poles'], route: 'Besisahar → Manang → Thorong La → Muktinath.' },
      summer: { weather: 'Monsoon showers, humid lower valleys.', season: 'Quieter trails; upper Mustang stays in a rain shadow.', difficulty: 'Moderate, with wet-trail caution below 3,000m.', packing: ['Waterproof boots', 'Leech socks', 'Dry bags for electronics'], route: 'Consider the rain-shadow route via Jomsom instead.' },
      autumn: { weather: '5° to 18°C, crisp and clear.', season: 'Peak season — the classic circuit at its best.', difficulty: 'Moderate — well-marked, tea houses fully open.', packing: ['Insulated jacket', 'Warm hat and gloves', 'Sunscreen (high UV at altitude)'], route: 'Full circuit or shorter Poon Hill loop, both in season.' },
      winter: { weather: '−5° to 10°C, snow above 4,000m.', season: 'Thorong La Pass may close — check conditions before booking.', difficulty: 'Challenging in upper sections, easier on lower loops.', packing: ['Microspikes', 'Down layers', 'Extra insulated socks'], route: 'Poon Hill or lower Annapurna Sanctuary recommended.' }
    },
    pokhara: {
      spring: { weather: '14° to 26°C, occasional light showers.', season: 'Excellent for paragliding and lake activities.', difficulty: 'Easy — city and lakeside terrain.', packing: ['Light layers', 'Sunglasses', 'Comfortable walking shoes'], route: 'Lakeside → World Peace Pagoda → Sarangkot sunrise point.' },
      summer: { weather: '20° to 30°C, humid with monsoon rain.', season: 'Green landscapes but frequent afternoon downpours.', difficulty: 'Easy, plan indoor backups for rainy afternoons.', packing: ['Umbrella', 'Breathable clothing', 'Waterproof bag'], route: 'Museum and cafe circuit with lake boating between showers.' },
      autumn: { weather: '15° to 27°C, clear Annapurna views.', season: 'Best season — mountain reflections on Phewa Lake.', difficulty: 'Easy.', packing: ['Light jacket for evenings', 'Camera gear', 'Sun hat'], route: 'Sarangkot sunrise, Davis Falls, lakeside paragliding.' },
      winter: { weather: '5° to 20°C, cool mornings, mild days.', season: 'Comfortable and uncrowded.', difficulty: 'Easy.', packing: ['Light fleece', 'Layered clothing'], route: 'Same circuit, cooler and quieter.' }
    },
    kathmandu: {
      spring: { weather: '12° to 25°C, mild and dry.', season: 'Comfortable temple-hopping weather.', difficulty: 'Easy — city walking.', packing: ['Modest clothing for temples', 'Comfortable shoes', 'Scarf for shoulders'], route: 'Durbar Square → Swayambhunath → Boudhanath → Patan.' },
      summer: { weather: '20° to 30°C, humid with monsoon downpours.', season: 'Green valley views, plan around afternoon rain.', difficulty: 'Easy, with wet cobblestones underfoot.', packing: ['Compact umbrella', 'Quick-dry clothing'], route: 'Museum and indoor heritage sites during rain, temples in the morning.' },
      autumn: { weather: '10° to 24°C, clear skies.', season: 'Festival season — Dashain and Tihar fall here.', difficulty: 'Easy.', packing: ['Layered outfit', 'Camera', 'Comfortable walking shoes'], route: 'Valley loop across Kathmandu, Patan, and Bhaktapur.' },
      winter: { weather: '2° to 18°C, cold mornings.', season: 'Clear air, fewer crowds at heritage sites.', difficulty: 'Easy.', packing: ['Warm jacket for mornings', 'Layers for warm afternoons'], route: 'Same valley loop, best visited midday for warmth.' }
    },
    chitwan: {
      spring: { weather: '20° to 32°C, warm and dry.', season: 'Good wildlife visibility as grass is shorter.', difficulty: 'Easy.', packing: ['Neutral-coloured clothing', 'Insect repellent', 'Sun hat'], route: 'Jeep safari, canoe ride, Tharu village walk.' },
      summer: { weather: '25° to 38°C, humid monsoon heat.', season: 'Hot and wet — some park areas may close for flooding.', difficulty: 'Easy but physically taxing in heat.', packing: ['Light breathable clothing', 'Rehydration salts', 'Waterproof bag'], route: 'Confirm park access before booking during peak monsoon.' },
      autumn: { weather: '18° to 30°C, pleasant and dry.', season: 'Excellent season — clear skies, active wildlife.', difficulty: 'Easy.', packing: ['Light layers', 'Binoculars', 'Camera with zoom lens'], route: 'Full-day jeep safari plus sunset canoe ride.' },
      winter: { weather: '10° to 25°C, cool mornings, warm afternoons.', season: 'Comfortable, tall grass may limit visibility early season.', difficulty: 'Easy.', packing: ['Light jacket for dawn safari', 'Layered clothing'], route: 'Morning jeep safari when animals are most active.' }
    }
  };

  function renderPlannerResult() {
    const region = plannerRegion.value;
    const season = plannerSeason.value;
    const data = plannerData[region][season];

    plannerResult.innerHTML = `
      <div class="planner__result-item">
        <h5>Weather</h5>
        <p>${data.weather}</p>
      </div>
      <div class="planner__result-item">
        <h5>Best Season Fit</h5>
        <p>${data.season}</p>
      </div>
      <div class="planner__result-item">
        <h5>Difficulty</h5>
        <p>${data.difficulty}</p>
      </div>
      <div class="planner__result-item">
        <h5>Pack For This</h5>
<<<<<<< HEAD
        <ul>${data.packing.map((item) => <li>${item}</li>).join('')}</ul>
=======
        <ul>${data.packing.map((item) => `<li>${item}</li>`).join('')}</ul>
>>>>>>> 1cdd0033a9d339bd3325d05ea982e682912a70e9
      </div>
      <div class="planner__result-item" style="grid-column: 1 / -1;">
        <h5>Suggested Route</h5>
        <p>${data.route}</p>
      </div>
    `;
  }

  if (plannerRegion && plannerSeason) {
    plannerRegion.addEventListener('change', renderPlannerResult);
    plannerSeason.addEventListener('change', renderPlannerResult);
    renderPlannerResult();
  }

  /* -----------------------------------------------------------
     9. CULTURE TABS
     ----------------------------------------------------------- */
  const cultureTabs = document.querySelectorAll('.culture__tab');
  const culturePanels = document.querySelectorAll('.culture__panel');

  cultureTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      cultureTabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      culturePanels.forEach((panel) => {
<<<<<<< HEAD
        panel.classList.toggle('is-active', panel.id === panel-${target});
=======
        panel.classList.toggle('is-active', panel.id === `panel-${target}`);
>>>>>>> 1cdd0033a9d339bd3325d05ea982e682912a70e9
      });
    });
  });

  /* -----------------------------------------------------------
     10. GALLERY LIGHTBOX
     ----------------------------------------------------------- */
  const galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showImage(delta) {
    currentImageIndex = (currentImageIndex + delta + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showImage(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showImage(1));
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(-1);
    if (e.key === 'ArrowRight') showImage(1);
  });

  /* -----------------------------------------------------------
     11. BOOKING FORM VALIDATION
     ----------------------------------------------------------- */
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  const validators = {
    fullName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
    phone: (v) => /^[+\d][\d\s-]{6,}$/.test(v.trim()) || 'Please enter a valid phone number.',
    destination: (v) => v !== '' || 'Please choose a destination.',
    travelDate: (v) => v !== '' || 'Please select a travel date.',
    travelers: (v) => (v !== '' && Number(v) >= 1) || 'Please enter at least 1 traveler.',
    budget: (v) => v !== '' || 'Please select a budget range.',
    travelStyle: (v) => v !== '' || 'Please select a travel style.'
  };

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const group = field.closest('.form__group');
<<<<<<< HEAD
    const errorEl = bookingForm.querySelector([data-error="${field.name}"]);
=======
    const errorEl = bookingForm.querySelector(`[data-error="${field.name}"]`);
>>>>>>> 1cdd0033a9d339bd3325d05ea982e682912a70e9

    if (result === true) {
      group.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      return true;
    } else {
      group.classList.add('has-error');
      if (errorEl) errorEl.textContent = result;
      return false;
    }
  }

  if (bookingForm) {
    Object.keys(validators).forEach((name) => {
      const field = bookingForm.elements[name];
      if (field) {
        field.addEventListener('blur', () => validateField(field));
      }
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      Object.keys(validators).forEach((name) => {
        const field = bookingForm.elements[name];
        if (field && !validateField(field)) isValid = false;
      });

      if (!isValid) {
        const firstError = bookingForm.querySelector('.has-error input, .has-error select');
        if (firstError) firstError.focus();
        return;
      }

      formSuccess.classList.add('is-visible');
      bookingForm.reset();
      setTimeout(() => formSuccess.classList.remove('is-visible'), 6000);
    });
  }

  /* -----------------------------------------------------------
     12. NEWSLETTER FORM (footer)
     ----------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const button = newsletterForm.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Joined ✓';
      input.value = '';
      setTimeout(() => { button.textContent = originalText; }, 2500);
    });
  }

  /* -----------------------------------------------------------
     13. BACK TO TOP
     ----------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------------------------------------------
     14. BUTTON RIPPLE EFFECT
     ----------------------------------------------------------- */
  document.querySelectorAll('.btn--ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-el';
<<<<<<< HEAD
      ripple.style.width = ripple.style.height = ${size}px;
      ripple.style.left = ${e.clientX - rect.left - size / 2}px;
      ripple.style.top = ${e.clientY - rect.top - size / 2}px;
=======
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
>>>>>>> 1cdd0033a9d339bd3325d05ea982e682912a70e9
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

});
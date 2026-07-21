<<<<<<< Updated upstream
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
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
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
=======
/* ================================================================
   NEPAL SMART TOURISM HUB — script.js
   PRJ 181 — University Group Project
   Vanilla JavaScript only. No frameworks/libraries.

   Table of Contents:
   1.  Trip Data (JSON-like object used across the app)
   2.  Utility helpers
   3.  Sticky Navbar + Active Link Highlighting
   4.  Mobile Menu
   5.  Typing Effect (Hero)
   6.  Scroll Reveal (Intersection Observer)
   7.  Animated Counters
   8.  Altitude Journey Timeline
   9.  Smart Trip Planner
   10. Gallery Lightbox
   11. Testimonials Slider
   12. FAQ Accordion
   13. Booking Form Validation
   14. Newsletter Form
   15. Smooth Scroll / Back To Top
   16. Ripple Button Effect
   17. Fetch/AJAX Demo (simulated JSON endpoint)
   18. Init
================================================================ */

'use strict';

/* ================================================================
   1. TRIP DATA
   Central JSON-style dataset driving the Smart Trip Planner and
   the Altitude Journey Timeline detail cards.
================================================================ */
const TRIP_DATA = {
  regions: {
    everest: {
      name: 'Everest Region',
      weather: {
        spring: '−5°C to 15°C, clear mornings, afternoon cloud build-up',
        summer: '5°C to 18°C, frequent monsoon rain and low visibility',
        autumn: '−8°C to 12°C, stable and the clearest skies of the year',
        winter: '−15°C to 5°C, dry air, high passes may close with snow'
      },
      packingList: {
        spring: ['Down jacket', 'Thermal base layers', 'Trekking poles', 'Sun hat + high-SPF sunscreen'],
        summer: ['Waterproof shell', 'Quick-dry clothing', 'Leech socks', 'Dry bags for electronics'],
        autumn: ['Down jacket', 'Insulated gloves', 'Sunglasses (UV400)', 'Sleeping bag rated to −15°C'],
        winter: ['Heavyweight down jacket', 'Insulated boots', 'Balaclava', 'Sleeping bag rated to −20°C']
      },
      difficulty: 'Hard',
      route: 'Lukla → Phakding → Namche Bazaar → Tengboche → Dingboche → Lobuche → Gorak Shep → Kala Patthar → Everest Base Camp'
    },
    annapurna: {
      name: 'Annapurna Region',
      weather: {
        spring: '5°C to 20°C, rhododendrons in bloom below 3,000m',
        summer: '10°C to 24°C, monsoon showers, leeches on lower trails',
        autumn: '2°C to 18°C, crisp and dry, best mountain visibility',
        winter: '−10°C to 10°C, Thorong La pass may be snow-bound'
      },
      packingList: {
        spring: ['Light down jacket', 'Rain shell', 'Trekking poles', 'Water purification tablets'],
        summer: ['Waterproof poncho', 'Quick-dry layers', 'Anti-leech spray', 'Extra socks'],
        autumn: ['Down jacket', 'Fleece mid-layer', 'Gloves', 'Sunglasses'],
        winter: ['Heavy down jacket', 'Microspikes', 'Insulated gloves', 'Thermal sleeping bag']
      },
      difficulty: 'Moderate',
      route: 'Besisahar → Chame → Pisang → Manang → Yak Kharka → Thorong Phedi → Thorong La Pass → Muktinath'
    },
    pokhara: {
      name: 'Pokhara & Lakeside',
      weather: {
        spring: '14°C to 26°C, mild and mostly dry',
        summer: '20°C to 30°C, heavy monsoon rainfall',
        autumn: '13°C to 25°C, clear lake views of the Annapurnas',
        winter: '5°C to 20°C, cool mornings, sunny afternoons'
      },
      packingList: {
        spring: ['Light jacket', 'Sunglasses', 'Comfortable walking shoes', 'Reusable water bottle'],
        summer: ['Rain jacket', 'Umbrella', 'Quick-dry clothing', 'Waterproof phone pouch'],
        autumn: ['Light sweater', 'Camera gear', 'Sun hat', 'Day pack'],
        winter: ['Warm layers for evenings', 'Light jacket', 'Sunglasses', 'Comfortable shoes']
      },
      difficulty: 'Easy',
      route: 'Pokhara Lakeside → Sarangkot Sunrise Point → World Peace Pagoda → Phewa Lake Boating → Davis Falls'
    },
    kathmandu: {
      name: 'Kathmandu Valley',
      weather: {
        spring: '15°C to 28°C, warm days, occasional showers',
        summer: '20°C to 30°C, hot and humid with monsoon rain',
        autumn: '12°C to 25°C, pleasant and festival season',
        winter: '2°C to 18°C, cold mornings with heavy fog'
      },
      packingList: {
        spring: ['Light cotton clothing', 'Walking shoes', 'Scarf for temple visits', 'Sunscreen'],
        summer: ['Rain jacket', 'Breathable clothing', 'Umbrella', 'Sandals'],
        autumn: ['Light layers', 'Comfortable shoes', 'Camera', 'Modest clothing for temples'],
        winter: ['Warm jacket', 'Scarf and gloves', 'Closed shoes', 'Face mask for air quality']
      },
      difficulty: 'Easy',
      route: 'Kathmandu Durbar Square → Swayambhunath Stupa → Boudhanath Stupa → Pashupatinath Temple → Patan Durbar Square'
    },
    chitwan: {
      name: 'Chitwan (Terai)',
      weather: {
        spring: '18°C to 34°C, hot and humid, good wildlife visibility',
        summer: '24°C to 38°C, very hot with heavy monsoon',
        autumn: '16°C to 30°C, comfortable with lush greenery',
        winter: '8°C to 25°C, cool mornings, ideal safari season'
      },
      packingList: {
        spring: ['Light cotton clothing', 'Insect repellent', 'Wide-brim hat', 'Binoculars'],
        summer: ['Breathable clothing', 'Rain jacket', 'Insect repellent', 'Waterproof bag'],
        autumn: ['Light layers', 'Neutral-coloured clothing', 'Binoculars', 'Camera'],
        winter: ['Light jacket for mornings', 'Neutral clothing', 'Insect repellent', 'Binoculars']
      },
      difficulty: 'Easy',
      route: 'Sauraha → Jeep Safari (Core Area) → Canoe Ride on Rapti River → Elephant Breeding Center → Tharu Cultural Show'
    }
  },

  timelinePlaces: {
    chitwan: {
      title: 'Chitwan National Park',
      elevation: '150m above sea level',
      text: 'Nepal\'s lowland jungle, a UNESCO-listed refuge for one-horned rhinos, Bengal tigers and gharial crocodiles along the Rapti River.',
      img: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=900&q=80'
    },
    kathmandu: {
      title: 'Kathmandu Valley',
      elevation: '1,400m above sea level',
      text: 'A bowl-shaped valley holding seven UNESCO World Heritage sites, from Durbar Squares to the stupas of Swayambhunath and Boudhanath.',
      img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80'
    },
    pokhara: {
      title: 'Pokhara',
      elevation: '822m above sea level',
      text: 'A lakeside city facing the Annapurna range, serving as the trailhead for most central Himalaya treks and a paragliding hub.',
      img: 'https://images.unsplash.com/photo-1602088113235-229c19758e9d?w=900&q=80'
    },
    annapurna: {
      title: 'Annapurna Base Camp',
      elevation: '4,130m above sea level',
      text: 'A natural amphitheatre ringed by 7,000–8,000m peaks, reachable without technical climbing skills in under two weeks.',
      img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=80'
    },
    basecamp: {
      title: 'Everest Base Camp',
      elevation: '5,364m above sea level',
      text: 'The staging point for Everest expeditions, set on the Khumbu Glacier below the notorious icefall.',
      img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80'
    },
    everest: {
      title: 'Mount Everest (Sagarmatha)',
      elevation: '8,849m above sea level',
      text: 'The highest point on Earth, straddling the Nepal–Tibet border and known locally as Sagarmatha, "Forehead of the Sky".',
      img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80'
    }
  }
};

/* ================================================================
   2. UTILITY HELPERS
================================================================ */
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/** Simple debounce for scroll/resize-heavy handlers */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ================================================================
   3. STICKY NAVBAR + ACTIVE LINK HIGHLIGHTING
================================================================ */
function initStickyNav() {
  const header = qs('#siteHeader');
  const sections = qsa('main section[id]');
  const navLinks = qsa('[data-nav-link]');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);

    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', debounce(onScroll, 30));
  onScroll();
}

/* ================================================================
   4. MOBILE MENU
================================================================ */
function initMobileMenu() {
  const toggle = qs('#navToggle');
  const links = qs('#navLinks');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after a link is tapped (mobile UX)
  qsa('[data-nav-link]', links).forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================================================================
   5. TYPING EFFECT (HERO HEADLINE)
================================================================ */
function initTypingEffect() {
  const target = qs('#typingTarget');
  const phrases = [
    'Discover the Roof of the World.',
    'Plan Treks with Confidence.',
    'Travel Nepal, Intentionally.'
  ];

>>>>>>> Stashed changes
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

<<<<<<< Updated upstream
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
        <ul>${data.packing.map((item) => `<li>${item}</li>`).join('')}</ul>
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
        panel.classList.toggle('is-active', panel.id === `panel-${target}`);
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
=======
  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    target.textContent = currentPhrase.slice(0, charIndex);

    let delay = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 1800; // pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ================================================================
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
================================================================ */
function initScrollReveal() {
  const revealEls = qsa('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ================================================================
   7. ANIMATED COUNTERS
================================================================ */
function initCounters() {
  const counters = qsa('.hero__stat-number');
  let hasRun = false;

  const runCounters = () => {
    if (hasRun) return;
    hasRun = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.count, 10);
      const duration = 1600;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        counter.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(update);
    });
  };

  const statsBlock = qs('#statsBlock');
  if (!statsBlock) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(statsBlock);
}

/* ================================================================
   8. ALTITUDE JOURNEY TIMELINE
================================================================ */
function initTimeline() {
  const markers = qsa('.timeline__marker');
  const fill = qs('#timelineFill');
  const detail = qs('#timelineDetail');
  const detailImg = qs('#timelineDetailImg');
  const detailTitle = qs('#timelineDetailTitle');
  const detailElevation = qs('#timelineDetailElevation');
  const detailText = qs('#timelineDetailText');
  const detailClose = qs('#timelineDetailClose');

  function openDetail(marker) {
    const placeKey = marker.dataset.place;
    const place = TRIP_DATA.timelinePlaces[placeKey];
    if (!place) return;

    markers.forEach((m) => {
      m.classList.remove('is-active');
      m.setAttribute('aria-expanded', 'false');
    });
    marker.classList.add('is-active');
    marker.setAttribute('aria-expanded', 'true');

    const percent = marker.style.getPropertyValue('--marker-pos') || '0%';
    fill.style.width = percent;

    detailImg.src = place.img;
    detailImg.alt = place.title;
    detailTitle.textContent = place.title;
    detailElevation.textContent = place.elevation;
    detailText.textContent = place.text;
    detail.hidden = false;
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  markers.forEach((marker) => {
    marker.addEventListener('click', () => openDetail(marker));
  });

  detailClose.addEventListener('click', () => {
    detail.hidden = true;
    markers.forEach((m) => {
      m.classList.remove('is-active');
      m.setAttribute('aria-expanded', 'false');
    });
  });

  // Animate the fill line once the timeline scrolls into view
  const timelineEl = qs('#timeline');
  const fillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill.style.width = '18%'; // gentle initial fill before user interacts
          fillObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  if (timelineEl) fillObserver.observe(timelineEl);
}

/* ================================================================
   9. SMART TRIP PLANNER
================================================================ */
function initTripPlanner() {
  const form = qs('#plannerForm');
  const result = qs('#plannerResult');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const regionKey = qs('#plannerRegion').value;
    const seasonKey = qs('#plannerSeason').value;

    if (!regionKey || !seasonKey) {
      result.innerHTML = '<p class="planner__placeholder">Please choose both a region and a season.</p>';
      return;
    }

    const region = TRIP_DATA.regions[regionKey];
    const weather = region.weather[seasonKey];
    const packingList = region.packingList[seasonKey];

    result.innerHTML = `
      <h3 class="plan-result__title">${region.name} — ${capitalize(seasonKey)}</h3>
      <p class="difficulty difficulty--${region.difficulty.toLowerCase()}">${region.difficulty}</p>
      <div class="plan-result__grid">
        <div class="plan-result__block">
          <h4>Expected Weather</h4>
          <p>${weather}</p>
        </div>
        <div class="plan-result__block">
          <h4>Packing List</h4>
          <ul>${packingList.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="plan-result__block" style="grid-column: 1 / -1;">
          <h4>Suggested Route</h4>
          <p>${region.route}</p>
        </div>
      </div>
    `;
    result.classList.remove('is-visible');
    void result.offsetWidth; // restart reveal-style animation
    result.classList.add('is-visible');
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ================================================================
   10. GALLERY LIGHTBOX
================================================================ */
function initGalleryLightbox() {
  const items = qsa('.gallery__item');
  const lightbox = qs('#lightbox');
  const lightboxImg = qs('#lightboxImg');
  const lightboxCaption = qs('#lightboxCaption');
  const closeBtn = qs('#lightboxClose');
  const prevBtn = qs('#lightboxPrev');
  const nextBtn = qs('#lightboxNext');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[currentIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.dataset.caption;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.hidden = false;
    closeBtn.focus();
>>>>>>> Stashed changes
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
<<<<<<< Updated upstream
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
=======
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function showRelative(offset) {
    currentIndex = (currentIndex + offset + items.length) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showRelative(-1));
  nextBtn.addEventListener('click', () => showRelative(1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showRelative(-1);
    if (event.key === 'ArrowRight') showRelative(1);
  });
}

/* ================================================================
   11. TESTIMONIALS SLIDER
================================================================ */
function initTestimonialsSlider() {
  const track = qs('#testimonialsTrack');
  const cards = qsa('.testimonial-card', track);
  const dotsContainer = qs('#testimonialDots');
  const prevBtn = qs('#testimonialPrev');
  const nextBtn = qs('#testimonialNext');

  let currentIndex = 0;
  let autoTimer = null;

  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    if (index === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(index));
    dotsContainer.appendChild(dot);
  });

  const dots = qsa('button', dotsContainer);

  function goTo(index) {
    currentIndex = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentIndex));
    cards.forEach((card, i) => card.setAttribute('aria-hidden', String(i !== currentIndex)));
    resetAutoplay();
  }

  function resetAutoplay() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(currentIndex + 1), 6000);
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  resetAutoplay();
}

/* ================================================================
   12. FAQ ACCORDION
================================================================ */
function initFaqAccordion() {
  const items = qsa('.faq-item');

  items.forEach((item) => {
    const question = qs('.faq-item__question', item);

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others (single-open accordion behaviour)
      items.forEach((other) => {
        other.classList.remove('is-open');
        qs('.faq-item__question', other).setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ================================================================
   13. BOOKING FORM VALIDATION
================================================================ */
function initBookingForm() {
  const form = qs('#bookingForm');
  const popup = qs('#successPopup');
  const popupClose = qs('#successPopupClose');

  const validators = {
    name: (value) => value.trim().length >= 2 || 'Please enter your full name.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address.',
    phone: (value) => /^[0-9+\-\s]{7,15}$/.test(value) || 'Enter a valid phone number.',
    destination: (value) => value !== '' || 'Please select a destination.',
    date: (value) => {
      if (!value) return 'Please select a date.';
      const chosen = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return chosen >= today || 'Date must be today or in the future.';
    },
    guests: (value) => (Number(value) >= 1 && Number(value) <= 20) || 'Guests must be between 1 and 20.'
>>>>>>> Stashed changes
  };

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
<<<<<<< Updated upstream
    const result = rule(field.value);
    const group = field.closest('.form__group');
    const errorEl = bookingForm.querySelector(`[data-error="${field.name}"]`);

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
=======

    const errorEl = qs(`#err-${field.name}`);
    const result = rule(field.value);

    if (result === true) {
      errorEl.textContent = '';
      field.setAttribute('aria-invalid', 'false');
      return true;
    }
    errorEl.textContent = result;
    field.setAttribute('aria-invalid', 'true');
    return false;
  }

  qsa('input, select', form).forEach((field) => {
    if (!validators[field.name]) return;
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field && !validateField(field)) isValid = false;
    });

    if (!isValid) {
      const firstInvalid = qs('[aria-invalid="true"]', form);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate an async booking submission (see fetch/AJAX demo below)
    submitBookingRequest(new FormData(form)).then(() => {
      showSuccessPopup();
      form.reset();
    });
  });

  function showSuccessPopup() {
    popup.hidden = false;
    setTimeout(() => { popup.hidden = true; }, 6000);
  }
  popupClose.addEventListener('click', () => { popup.hidden = true; });
}

/* ================================================================
   14. NEWSLETTER FORM
================================================================ */
function initNewsletterForm() {
  const form = qs('#newsletterForm');
  const msg = qs('#newsletterMsg');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = qs('#newsletterEmail').value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      return;
    }

    msg.textContent = `Subscribed! Updates will be sent to ${email}.`;
    form.reset();
  });
}

/* ================================================================
   15. SMOOTH SCROLL / BACK TO TOP
================================================================ */
function initSmoothScrollAndBackToTop() {
  qsa('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const targetEl = qs(targetId);
      if (!targetEl) return;
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const backToTop = qs('#backToTop');
  window.addEventListener('scroll', debounce(() => {
    backToTop.hidden = window.scrollY < 500;
  }, 100));
>>>>>>> Stashed changes

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
<<<<<<< Updated upstream

  /* -----------------------------------------------------------
     14. BUTTON RIPPLE EFFECT
     ----------------------------------------------------------- */
  document.querySelectorAll('.btn--ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-el';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

=======
}

/* ================================================================
   16. RIPPLE BUTTON EFFECT
================================================================ */
function initRippleButtons() {
  qsa('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.remove('is-rippling');
      void btn.offsetWidth; // restart animation
      btn.classList.add('is-rippling');
    });
  });
}

/* ================================================================
   17. FETCH / AJAX DEMO
   Simulates a POST request to a booking endpoint. In production
   this would call a real backend; here it demonstrates the Fetch
   API pattern with a local JSON echo using a Promise + timeout,
   which mirrors how the same function would look with a live URL.
================================================================ */
function submitBookingRequest(formData) {
  const payload = Object.fromEntries(formData.entries());

  // Example of what a real call would look like:
  //
  // return fetch('/api/bookings', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // }).then((res) => res.json());

  console.info('Booking request payload (AJAX demo):', payload);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 'ok', received: payload }), 600);
  });
}

/* ================================================================
   18. INIT
================================================================ */
function initLazyLoadFallback() {
  // Native loading="lazy" is used in HTML; this is a graceful
  // fallback for older browsers using IntersectionObserver.
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImages = qsa('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src; // trigger load
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => observer.observe(img));
}

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileMenu();
  initTypingEffect();
  initScrollReveal();
  initCounters();
  initTimeline();
  initTripPlanner();
  initGalleryLightbox();
  initTestimonialsSlider();
  initFaqAccordion();
  initBookingForm();
  initNewsletterForm();
  initSmoothScrollAndBackToTop();
  initRippleButtons();
  initLazyLoadFallback();

  qs('#footerYear').textContent = new Date().getFullYear();
>>>>>>> Stashed changes
});
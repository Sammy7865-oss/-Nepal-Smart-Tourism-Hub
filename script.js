/* =====================================================================
   NEPAL SMART TOURISM HUB — SCRIPT.JS
   Vanilla JavaScript only, no frameworks/dependencies.

   Table of Contents
   1.  Data Sets (JSON-style objects)
   2.  Utility Helpers
   3.  Sticky Navbar + Active Link Highlighting
   4.  Mobile Menu Toggle
   5.  Hero Typing Effect
   6.  Animated Counters (Intersection Observer)
   7.  Altitude Timeline (render + interaction)
   8.  Destinations Renderer
   9.  Packages Renderer
   10. Smart Trip Planner
   11. Culture Renderer
   12. Gallery + Lightbox
   13. FAQ Accordion
   14. Booking Form Validation + Success Popup
   15. Newsletter Form (fetch/AJAX demo)
   16. Scroll Reveal (Intersection Observer)
   17. Smooth Scroll + Back To Top
   18. Ripple Button Effect
   19. Init
===================================================================== */

(function () {
  'use strict';

  /* ===================================================================
     1. DATA SETS
  =================================================================== */

  /** Altitude journey timeline stops, ordered low -> high altitude. */
  const JOURNEY_STOPS = [
    {
      id: 'chitwan',
      name: 'Chitwan',
      altitude: 150,
      altitudeLabel: '150 m',
      climate: 'Subtropical',
      duration: '2–3 days',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Greater%20one-horned%20rhinoceros%20at%20Chitwan.jpg?width=800',
      description: 'Nepal\'s lowland Terai belt — dense sal forest, wetlands and one of Asia\'s best places to spot a one-horned rhino on a jeep or canoe safari.'
    },
    {
      id: 'kathmandu',
      name: 'Kathmandu',
      altitude: 1400,
      altitudeLabel: '1,400 m',
      climate: 'Temperate',
      duration: '2–4 days',
      img: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?w=900&q=80',
      description: 'The cultural core of the valley — Durbar Squares, Boudhanath stupa and Swayambhunath, all within a short taxi ride of each other.'
    },
    {
      id: 'pokhara',
      name: 'Pokhara',
      altitude: 820,
      altitudeLabel: '820 m',
      climate: 'Warm-temperate',
      duration: '2–3 days',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Phewa%20lake%2C%20Pokhara.jpg?width=800',
      description: 'A lakeside base with a straight-on view of the Annapurna range from the water — the launch point for most Annapurna treks.'
    },
    {
      id: 'annapurna',
      name: 'Annapurna',
      altitude: 4130,
      altitudeLabel: '4,130 m',
      climate: 'Alpine',
      duration: '7–14 days',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Annapurna%20Range%20with%20Fishtail%20Mountain.JPG?width=800',
      description: 'Terraced foothills give way to high alpine desert at Manang and the Thorong La pass — the most varied landscape trek in Nepal.'
    },
    {
      id: 'basecamp',
      name: 'Base Camp',
      altitude: 5364,
      altitudeLabel: '5,364 m',
      climate: 'High alpine',
      duration: '12–14 days',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/KhumbuIcefall.jpg?width=800',
      description: 'Everest Base Camp itself — glacial moraine, prayer flags, and your first close-up view of the Khumbu Icefall.'
    },
    {
      id: 'everest',
      name: 'Everest',
      altitude: 8849,
      altitudeLabel: '8,849 m',
      climate: 'Extreme / summit zone',
      duration: 'Expedition only',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Everest%20kalapatthar%20crop.jpg?width=800',
      description: 'The summit of Sagarmatha — the highest point on Earth, reserved for permitted mountaineering expeditions with full oxygen support.'
    }
  ];

  /** Featured destination cards. */
  const DESTINATIONS = [
    {
      name: 'Everest Region',
      rating: '4.9',
      desc: 'Sherpa villages, monasteries and the trail to the foot of the world\'s highest peak.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Namche%20Bazaar%20Nepal.jpg?width=800'
    },
    {
      name: 'Annapurna Circuit',
      rating: '4.8',
      desc: 'The classic trek — rice terraces to high desert in a single loop.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Annapurna%20Range%20with%20Fishtail%20Mountain.JPG?width=800'
    },
    {
      name: 'Pokhara',
      rating: '4.7',
      desc: 'Phewa Lake, paragliding, and sunrise views of the Annapurna range.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Phewa%20lake%2C%20Pokhara.jpg?width=800'
    },
    {
      name: 'Kathmandu Valley',
      rating: '4.6',
      desc: 'Seven UNESCO sites in one valley — palaces, stupas and temple courtyards.',
      img: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?w=800&q=80'
    },
    {
      name: 'Chitwan National Park',
      rating: '4.7',
      desc: 'Jungle safari country — rhinos, gharial crocodiles and Tharu culture.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Greater%20one-horned%20rhinoceros%20at%20Chitwan.jpg?width=800'
    },
    {
      name: 'Upper Mustang',
      rating: '4.9',
      desc: 'A restricted-area desert kingdom behind the Annapurna rain shadow.',
      img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80'
    }
  ];

  /** Tour packages. */
  const PACKAGES = [
    {
      name: 'Everest Base Camp Trek',
      desc: 'The bucket-list classic via Namche, Tengboche and Kala Patthar.',
      price: 1450,
      duration: '14 days',
      difficulty: 'hard',
      groupSize: '2–12',
      featured: true
    },
    {
      name: 'Annapurna Circuit',
      desc: 'Full circuit over Thorong La with hot-spring stops at Tatopani.',
      price: 1190,
      duration: '12 days',
      difficulty: 'moderate',
      groupSize: '2–12'
    },
    {
      name: 'Pokhara Lakeside Escape',
      desc: 'Boating, paragliding and short hikes with mountain views.',
      price: 490,
      duration: '4 days',
      difficulty: 'easy',
      groupSize: '1–20'
    },
    {
      name: 'Kathmandu Heritage Walk',
      desc: 'Guided tour of Durbar Squares, Boudhanath and Pashupatinath.',
      price: 260,
      duration: '3 days',
      difficulty: 'easy',
      groupSize: '1–20'
    },
    {
      name: 'Chitwan Jungle Safari',
      desc: 'Canoe rides, jeep safari and a Tharu cultural evening.',
      price: 380,
      duration: '3 days',
      difficulty: 'easy',
      groupSize: '2–16'
    },
    {
      name: 'Upper Mustang Expedition',
      desc: 'Jeep and trekking route into the restricted trans-Himalayan desert.',
      price: 1690,
      duration: '10 days',
      difficulty: 'hard',
      groupSize: '2–8'
    }
  ];

  /**
   * Smart Trip Planner data set.
   * Keyed by region -> season, holding weather / packing / route data.
   * This stands in for a live weather API for the coursework demo.
   *//** Local guide profiles. */
const GUIDES = [
  {
    name: 'Suman Gurung',
    destination: 'Pokhara',
    expertise: 'Trekking, local culture & adventure',
    experience: '8 years',
    languages: ['Nepali', 'English', 'Hindi'],
    rating: '4.8',
    price: 35,
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'
  },
  {
    name: 'Maya Tamang',
    destination: 'Kathmandu Valley',
    expertise: 'Heritage, temples & local culture',
    experience: '6 years',
    languages: ['Nepali', 'English', 'Tamang'],
    rating: '4.9',
    price: 30,
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80'
  },
  {
    name: 'Rajan Thapa',
    destination: 'Chitwan',
    expertise: 'Wildlife, jungle safari & Tharu culture',
    experience: '7 years',
    languages: ['Nepali', 'English', 'Hindi'],
    rating: '4.7',
    price: 28,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80'
  },
  {
    name: 'Pasang Sherpa',
    destination: 'Everest Region',
    expertise: 'High-altitude trekking & Sherpa culture',
    experience: '10 years',
    languages: ['Nepali', 'English', 'Sherpa'],
    rating: '4.9',
    price: 45,
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80'
  }
];
  const PLANNER_DATA = {
    everest: {
      label: 'Everest Region',
      route: 'Lukla → Phakding → Namche Bazaar → Tengboche → Dingboche → Everest Base Camp',
      baseDifficulty: 'Hard',
      seasons: {
        spring: { weather: '5°C to 15°C, clear mornings, occasional afternoon cloud', packing: ['Down jacket', 'Trekking poles', 'UV sunglasses', 'Thermal base layers', 'Water purification tablets'] },
        summer: { weather: '10°C to 18°C, monsoon rain and low visibility on passes', packing: ['Waterproof shell', 'Leech socks', 'Quick-dry clothing', 'Dry bags for electronics'] },
        autumn: { weather: '2°C to 12°C, the clearest skies of the year', packing: ['Down jacket', 'Insulated gloves', 'Trekking poles', 'Headlamp', 'Sunscreen SPF 50'] },
        winter: { weather: '-15°C to 5°C, snow above 4,000 m, very few trekkers', packing: ['Expedition-weight down jacket', 'Insulated boots', 'Balaclava', 'Sleeping bag rated to -20°C'] }
      }
    },
    annapurna: {
      label: 'Annapurna Region',
      route: 'Besisahar → Chame → Manang → Thorong La Pass → Muktinath → Tatopani',
      baseDifficulty: 'Moderate–Hard',
      seasons: {
        spring: { weather: '8°C to 20°C, rhododendrons in bloom below 3,000 m', packing: ['Light fleece', 'Trekking poles', 'Sun hat', 'Rain shell'] },
        summer: { weather: '12°C to 22°C, wet on the southern side, drier past Manang', packing: ['Waterproof jacket', 'Umbrella', 'Quick-dry layers', 'Anti-leech spray'] },
        autumn: { weather: '5°C to 18°C, peak season, stable weather', packing: ['Down vest', 'Trekking poles', 'Warm hat', 'Gloves for the pass'] },
        winter: { weather: '-10°C to 8°C, Thorong La often snow-closed', packing: ['Heavy down jacket', 'Crampons (if pass open)', 'Insulated boots', 'Thermal layers'] }
      }
    },
    pokhara: {
      label: 'Pokhara Valley',
      route: 'Pokhara Lakeside → Sarangkot sunrise point → World Peace Pagoda → Begnas Lake',
      baseDifficulty: 'Easy',
      seasons: {
        spring: { weather: '15°C to 27°C, warm and mostly dry', packing: ['Light cottons', 'Sun hat', 'Comfortable walking shoes'] },
        summer: { weather: '20°C to 30°C, heavy monsoon rain', packing: ['Rain jacket', 'Quick-dry clothing', 'Waterproof bag cover'] },
        autumn: { weather: '14°C to 26°C, clear mountain views most mornings', packing: ['Light jacket for evenings', 'Camera rain cover', 'Sunglasses'] },
        winter: { weather: '6°C to 20°C, cool mornings, warm afternoons', packing: ['Light fleece', 'Layers for temperature swings'] }
      }
    },
    kathmandu: {
      label: 'Kathmandu Valley',
      route: 'Kathmandu Durbar Square → Swayambhunath → Boudhanath → Patan → Bhaktapur',
      baseDifficulty: 'Easy',
      seasons: {
        spring: { weather: '12°C to 25°C, mild and pleasant', packing: ['Light layers', 'Comfortable shoes', 'Modest clothing for temples'] },
        summer: { weather: '20°C to 29°C, humid with daily showers', packing: ['Umbrella', 'Breathable fabrics', 'Sandals for wet streets'] },
        autumn: { weather: '10°C to 24°C, festival season (Dashain, Tihar)', packing: ['Light jacket for evenings', 'Comfortable walking shoes'] },
        winter: { weather: '2°C to 18°C, cold mornings, smoggy air some days', packing: ['Warm layers', 'Scarf', 'Face mask for air quality'] }
      }
    },
    chitwan: {
      label: 'Chitwan',
      route: 'Sauraha → Rapti River canoe ride → Jungle jeep safari → Tharu village walk',
      baseDifficulty: 'Easy',
      seasons: {
        spring: { weather: '18°C to 32°C, dry and warm, good wildlife visibility', packing: ['Light cottons', 'Insect repellent', 'Neutral colour clothing'] },
        summer: { weather: '24°C to 36°C, hot and humid, monsoon flooding possible', packing: ['Breathable clothing', 'Rain jacket', 'Strong insect repellent'] },
        autumn: { weather: '18°C to 30°C, tall grass cut back, best safari visibility', packing: ['Light layers', 'Binoculars', 'Sun hat'] },
        winter: { weather: '8°C to 24°C, cool mornings with river mist', packing: ['Light jacket for dawn safari', 'Comfortable trousers'] }
      }
    },
    mustang: {
      label: 'Upper Mustang',
      route: 'Jomsom → Kagbeni → Chele → Lo Manthang → Chhoser Caves',
      baseDifficulty: 'Moderate',
      seasons: {
        spring: { weather: '2°C to 16°C, windy afternoons, desert terrain', packing: ['Wind-proof jacket', 'Dust mask', 'Lip balm and sunscreen'] },
        summer: { weather: '8°C to 22°C, dry — Mustang sits in the Annapurna rain shadow', packing: ['Sun hat', 'Wind-proof layers', 'High-SPF sunscreen'] },
        autumn: { weather: '0°C to 14°C, clear skies, ideal trekking window', packing: ['Down jacket', 'Trekking poles', 'Warm sleeping bag liner'] },
        winter: { weather: '-15°C to 5°C, many teahouses closed', packing: ['Expedition down jacket', 'Insulated boots', 'Advance teahouse booking'] }
      }
    }
  };

  /** Culture section cards. */
  const CULTURE = [
    { icon: '🎭', title: 'Festivals', tag: 'Dashain & Tihar', desc: 'Nepal\'s festival calendar peaks each autumn with Dashain\'s family gatherings and Tihar\'s five nights of light.' },
    { icon: '🍲', title: 'Food', tag: 'Dal Bhat', desc: 'Lentils, rice and seasonal vegetables — the daily staple, refilled without asking across the whole country.' },
    { icon: '🗣️', title: 'Languages', tag: '120+ tongues', desc: 'Nepali is the lingua franca, but Newari, Sherpa, Tamang, Gurung and dozens more are spoken regionally.' },
    { icon: '🏛️', title: 'Heritage', tag: '7 valley sites', desc: 'Durbar Squares, stupas and temple courtyards built up over a thousand years of Malla and Newar craftsmanship.' },
    { icon: '⛩️', title: 'UNESCO Sites', tag: '10 listings', desc: 'From Kathmandu Valley\'s monuments to Sagarmatha and Chitwan national parks — Nepal holds 10 UNESCO listings.' },
    { icon: '🪈', title: 'Music & Dance', tag: 'Newari classical', desc: 'Panche baja ensembles and masked Newari dances still perform at temple courtyards during festival processions.' },
    { icon: '🧵', title: 'Craft', tag: 'Thangka painting', desc: 'Buddhist thangka scroll painting and pashmina weaving remain living trades in Kathmandu\'s old quarters.' },
    { icon: '🙏', title: 'Faith', tag: 'Hindu & Buddhist', desc: 'Hinduism and Buddhism have coexisted and blended in Nepal for centuries, visible at shared pilgrimage sites.' }
  ];

  /** Gallery images (masonry). */
  const GALLERY = [
    { img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80', caption: 'Sunrise over the Himalaya' },
    { img: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?w=700&q=80', caption: 'Kathmandu Durbar Square' },
    { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Phewa%20lake%2C%20Pokhara.jpg?width=800', caption: 'Phewa Lake, Pokhara' },
    { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Annapurna%20Range%20with%20Fishtail%20Mountain.JPG?width=800', caption: 'Annapurna high trail' },
    { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Greater%20one-horned%20rhinoceros%20at%20Chitwan.jpg?width=800', caption: 'Chitwan wetlands' },
    { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/KhumbuIcefall.jpg?width=800', caption: 'Everest Base Camp' },
    { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Namche%20Bazaar%20Nepal.jpg?width=800', caption: 'Namche Bazaar' },
    { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Everest%20kalapatthar%20crop.jpg?width=800', caption: 'Summit ridge, Everest' }
  ];

  /** FAQ entries. */
  const FAQS = [
    { q: 'Do I need a visa to visit Nepal?', a: 'Most nationalities can get a visa on arrival at Tribhuvan International Airport or land border crossings. Bring a passport photo and USD cash for the fee; check your specific nationality\'s requirements before you travel.' },
    { q: 'What is the best season to trek in Nepal?', a: 'Autumn (September to November) and spring (March to May) offer the clearest skies and most stable weather. Winter treks are possible at lower altitudes; summer/monsoon is best reserved for the rain-shadow regions like Upper Mustang.' },
    { q: 'Do I need travel insurance for trekking?', a: 'Yes. Insurance covering high-altitude trekking and helicopter evacuation up to at least 6,000 m is required for all our guided treks above Base Camp altitude.' },
    { q: 'How fit do I need to be for Everest Base Camp?', a: 'No technical climbing skill is required, but you should be comfortable walking 5–7 hours a day for up to two weeks. We recommend several months of cardio and hill-walking preparation.' },
    { q: 'Is altitude sickness a serious risk?', a: 'It can be, above roughly 3,000 m. Our itineraries build in acclimatisation days, and all guides carry oximeters and are trained to recognise early symptoms of acute mountain sickness.' },
    { q: 'Can I customise a package?', a: 'Yes — every package on this site can be adjusted for dates, group size and pace. Add a note in the booking form message field and a consultant will follow up.' }
  ];

  /* ===================================================================
     2. UTILITY HELPERS
  =================================================================== */

  /** Shorthand querySelector / querySelectorAll. */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /** Debounce helper for scroll/resize handlers. */
  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /** Escape a string for safe HTML text insertion. */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ===================================================================
     3. STICKY NAVBAR + ACTIVE LINK HIGHLIGHTING
  =================================================================== */
  function initStickyNavbar() {
    const header = $('#siteHeader');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', debounce(onScroll, 10));
    onScroll();
  }

  function initActiveLinkOnScroll() {
    const sections = $$('main section[id]');
    const navLinks = $$('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const map = new Map(navLinks.map((link) => [link.getAttribute('href').replace('#', ''), link]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active-link'));
            const link = map.get(entry.target.id);
            if (link) link.classList.add('active-link');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ===================================================================
     4. MOBILE MENU TOGGLE
  =================================================================== */
  function initMobileMenu() {
    const toggle = $('#navbarToggle');
    const links = $('#navbarLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click (mobile)
    $$('.navbar__link', links).forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===================================================================
     5. HERO TYPING EFFECT
  =================================================================== */
  function initTypingEffect() {
    const el = $('#typingText');
    if (!el) return;

    const phrases = [
      'Trek the Roof of the World',
      'Plan Smarter, Walk Farther',
      'From Chitwan Jungle to Everest Summit'
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }

    tick();
  }

  /* ===================================================================
     6. ANIMATED COUNTERS
  =================================================================== */
  function initCounters() {
    const counters = $$('.hero__stat-number');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  /* ===================================================================
     7. ALTITUDE TIMELINE
  =================================================================== */
  function initTimeline() {
    const track = $('#timelineTrackInner');
    const fill = $('#timelineFill');
    const detail = $('#timelineDetail');
    if (!track || !detail) return;

    const maxAlt = Math.max(...JOURNEY_STOPS.map((s) => s.altitude));

    track.innerHTML = JOURNEY_STOPS.map((stop, i) => `
      <button class="timeline__stop" data-index="${i}" role="listitem" aria-label="${escapeHTML(stop.name)}, ${escapeHTML(stop.altitudeLabel)}">
        <span class="timeline__marker" data-marker="${i}">${i + 1}</span>
        <span class="timeline__stop-name">${escapeHTML(stop.name)}</span>
        <span class="timeline__stop-alt">${escapeHTML(stop.altitudeLabel)}</span>
      </button>
    `).join('');

    function renderDetail(index) {
      const stop = JOURNEY_STOPS[index];
      detail.innerHTML = `
        <div class="timeline__detail-card">
          <img class="timeline__detail-img" src="${stop.img}" alt="View of ${escapeHTML(stop.name)}" loading="lazy">
          <div class="timeline__detail-body">
            <h3>${escapeHTML(stop.name)}</h3>
            <div class="timeline__detail-meta">
              <span>&#9650; ${escapeHTML(stop.altitudeLabel)}</span>
              <span>&#9729; ${escapeHTML(stop.climate)}</span>
              <span>&#9201; ${escapeHTML(stop.duration)}</span>
            </div>
            <p>${escapeHTML(stop.description)}</p>
          </div>
        </div>
      `;

      $$('.timeline__marker', track).forEach((m) => m.classList.remove('is-active'));
      const marker = track.querySelector(`[data-marker="${index}"]`);
      if (marker) marker.classList.add('is-active');

      const pct = (stop.altitude / maxAlt) * 100;
      fill.style.width = pct + '%';
    }

    track.addEventListener('click', (e) => {
      const btn = e.target.closest('.timeline__stop');
      if (!btn) return;
      renderDetail(parseInt(btn.dataset.index, 10));
    });

    // Reveal fill line + open first stop once the section scrolls into view
    const section = $('#timeline');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            renderDetail(0);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (section) observer.observe(section);
  }

  /* ===================================================================
     8. DESTINATIONS RENDERER
  =================================================================== */
  function renderDestinations() {
    const grid = $('#destinationsGrid');
    if (!grid) return;

    grid.innerHTML = DESTINATIONS.map((d) => `
      <article class="destination-card reveal">
        <img class="destination-card__img" src="${d.img}" alt="${escapeHTML(d.name)}" loading="lazy">
        <div class="destination-card__overlay"></div>
        <div class="destination-card__body">
          <span class="destination-card__rating">&#9733; ${escapeHTML(d.rating)}</span>
          <h3 class="destination-card__title">${escapeHTML(d.name)}</h3>
          <p class="destination-card__desc">${escapeHTML(d.desc)}</p>
          <a href="#planner" class="destination-card__link">Plan this route &rarr;</a>
        </div>
      </article>
    `).join('');
  }

  /* ===================================================================
     9. PACKAGES RENDERER
  =================================================================== */
  function renderPackages() {
    const grid = $('#packagesGrid');
    if (!grid) return;

    const diffLabel = { easy: 'Easy', moderate: 'Moderate', hard: 'Challenging' };

    grid.innerHTML = PACKAGES.map((p) => `
      <article class="package-card reveal ${p.featured ? 'package-card--featured' : ''}">
        ${p.featured ? '<span class="package-card__badge">Featured</span>' : ''}
        <h3 class="package-card__title">${escapeHTML(p.name)}</h3>
        <p class="package-card__desc">${escapeHTML(p.desc)}</p>
        <div class="package-card__meta">
          <span class="package-card__meta-item">&#128197; ${escapeHTML(p.duration)}</span>
          <span class="package-card__meta-item">&#128101; ${escapeHTML(p.groupSize)}</span>
          <span class="package-card__difficulty package-card__difficulty--${p.difficulty}">${diffLabel[p.difficulty]}</span>
        </div>
        <div class="package-card__footer">
          <p class="package-card__price">$${p.price}<span> / person</span></p>
          <a href="#booking" class="btn btn--accent btn--sm">Book</a>
        </div>
      </article>
    `).join('');
  }
   /* ===================================================================
   LOCAL GUIDES RENDERER
=================================================================== */
function renderGuides() {
  const grid = $('#guidesGrid');
  if (!grid) return;

  grid.innerHTML = GUIDES.map((g) => `
    <article class="guide-card reveal">
      <img
        class="guide-card__img"
        src="${g.img}"
        alt="${escapeHTML(g.name)}"
        loading="lazy"
      >

      <div class="guide-card__body">
        <h3 class="guide-card__name">${escapeHTML(g.name)}</h3>

        <p class="guide-card__destination">
          ${escapeHTML(g.destination)}
        </p>

        <p class="guide-card__expertise">
          ${escapeHTML(g.expertise)}
        </p>

        <div class="guide-card__meta">
          <span>⭐ ${escapeHTML(g.rating)}</span>
          <span>${escapeHTML(g.experience)}</span>
        </div>

        <p class="guide-card__languages">
          ${g.languages.map((lang) => escapeHTML(lang)).join(' · ')}
        </p>

        <div class="guide-card__footer">
          <span class="guide-card__price">
            $${g.price}<small> / day</small>
          </span>

          <a href="#booking" class="btn btn--accent btn--sm">
            Book Guide
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

  /* ===================================================================
     10. SMART TRIP PLANNER
  =================================================================== */
  function initPlanner() {
    const form = $('#plannerForm');
    const result = $('#plannerResult');
    if (!form || !result) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const region = $('#plannerRegion').value;
      const season = $('#plannerSeason').value;

      if (!region || !season) return;

      const regionData = PLANNER_DATA[region];
      const seasonData = regionData.seasons[season];
      const seasonLabels = { spring: 'Spring', summer: 'Summer / Monsoon', autumn: 'Autumn', winter: 'Winter' };

      result.innerHTML = `
        <div class="planner__result-content">
          <h3 class="planner__result-title">${escapeHTML(regionData.label)} — ${seasonLabels[season]}</h3>
          <p class="planner__result-sub">${escapeHTML(regionData.route)}</p>

          <div class="planner__result-grid">
            <div class="planner__result-stat">
              <span>Difficulty</span>
              <strong>${escapeHTML(regionData.baseDifficulty)}</strong>
            </div>
            <div class="planner__result-stat">
              <span>Season</span>
              <strong>${seasonLabels[season]}</strong>
            </div>
            <div class="planner__result-stat">
              <span>Region</span>
              <strong>${escapeHTML(regionData.label)}</strong>
            </div>
          </div>

          <div class="planner__result-section">
            <h4>Weather Outlook</h4>
            <p>${escapeHTML(seasonData.weather)}</p>
          </div>

          <div class="planner__result-section">
            <h4>Packing List</h4>
            <ul class="planner__packing-list">
              ${seasonData.packing.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    });
  }

  /* ===================================================================
     11. CULTURE RENDERER
  =================================================================== */
  function renderCulture() {
    const grid = $('#cultureGrid');
    if (!grid) return;

    grid.innerHTML = CULTURE.map((c) => `
      <article class="culture-card reveal">
        <div class="culture-card__icon" aria-hidden="true">${c.icon}</div>
        <h3 class="culture-card__title">${escapeHTML(c.title)}</h3>
        <p class="culture-card__desc">${escapeHTML(c.desc)}</p>
        <span class="culture-card__tag">${escapeHTML(c.tag)}</span>
      </article>
    `).join('');
  }

  /* ===================================================================
     12. GALLERY + LIGHTBOX
  =================================================================== */
  function renderGallery() {
    const masonry = $('#galleryMasonry');
    if (!masonry) return;

    masonry.innerHTML = GALLERY.map((g, i) => `
      <div class="gallery__item" data-index="${i}" tabindex="0" role="button" aria-label="View photo: ${escapeHTML(g.caption)}">
        <img src="${g.img}" alt="${escapeHTML(g.caption)}" loading="lazy">
        <div class="gallery__item-overlay">${escapeHTML(g.caption)}</div>
      </div>
    `).join('');
  }

  function initLightbox() {
    const masonry = $('#galleryMasonry');
    const lightbox = $('#lightbox');
    const img = $('#lightboxImage');
    const caption = $('#lightboxCaption');
    const closeBtn = $('#lightboxClose');
    const prevBtn = $('#lightboxPrev');
    const nextBtn = $('#lightboxNext');
    if (!masonry || !lightbox) return;

    let currentIndex = 0;

    function open(index) {
      currentIndex = index;
      const item = GALLERY[currentIndex];
      img.src = item.img;
      img.alt = item.caption;
      caption.textContent = item.caption;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }

    function show(delta) {
      currentIndex = (currentIndex + delta + GALLERY.length) % GALLERY.length;
      const item = GALLERY[currentIndex];
      img.src = item.img;
      img.alt = item.caption;
      caption.textContent = item.caption;
    }

    masonry.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery__item');
      if (!item) return;
      open(parseInt(item.dataset.index, 10));
    });
    masonry.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.gallery__item');
      if (!item) return;
      e.preventDefault();
      open(parseInt(item.dataset.index, 10));
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => show(-1));
    nextBtn.addEventListener('click', () => show(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  }

  /* ===================================================================
     13. FAQ ACCORDION
  =================================================================== */
  function initFAQ() {
    const list = $('#faqList');
    if (!list) return;

    list.innerHTML = FAQS.map((f, i) => `
      <div class="faq__item" data-faq="${i}">
        <button class="faq__question" aria-expanded="false" aria-controls="faq-answer-${i}">
          <span>${escapeHTML(f.q)}</span>
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" id="faq-answer-${i}">
          <p class="faq__answer-inner">${escapeHTML(f.a)}</p>
        </div>
      </div>
    `).join('');

    $$('.faq__question', list).forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const answer = $('.faq__answer', item);
        const isOpen = item.classList.contains('is-open');

        // Close all others (single-open accordion)
        $$('.faq__item', list).forEach((other) => {
          other.classList.remove('is-open');
          $('.faq__answer', other).style.maxHeight = null;
          $('.faq__question', other).setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ===================================================================
     14. BOOKING FORM VALIDATION + SUCCESS POPUP
  =================================================================== */
  function initBookingForm() {
    const form = $('#bookingForm');
    const popupOverlay = $('#popupOverlay');
    const popupClose = $('#popupClose');
    const popupOk = $('#popupOk');
    if (!form) return;

    // Prevent past-date selection
    const dateInput = $('#bookDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    const validators = {
      bookName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
      bookEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
      bookPhone: (v) => /^[0-9+\-\s]{7,15}$/.test(v) || 'Enter a valid phone number.',
      bookDestination: (v) => v !== '' || 'Please choose a destination.',
      bookDate: (v) => v !== '' || 'Please choose a travel date.',
      bookGuests: (v) => (parseInt(v, 10) >= 1 && parseInt(v, 10) <= 20) || 'Guests must be between 1 and 20.'
    };

    function validateField(id) {
      const field = document.getElementById(id);
      const errorEl = document.getElementById('err-' + id);
      const rule = validators[id];
      if (!field || !rule) return true;

      const result = rule(field.value);
      const group = field.closest('.form-group');

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

    Object.keys(validators).forEach((id) => {
      const field = document.getElementById(id);
      if (!field) return;
      field.addEventListener('blur', () => validateField(id));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('has-error')) validateField(id);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let allValid = true;
      Object.keys(validators).forEach((id) => {
        if (!validateField(id)) allValid = false;
      });

      if (!allValid) {
        const firstError = form.querySelector('.has-error input, .has-error select');
        if (firstError) firstError.focus();
        return;
      }

      // Simulated AJAX submission (would normally POST to a backend)
      simulateBookingSubmit(new FormData(form)).then(() => {
        popupOverlay.hidden = false;
        form.reset();
      });
    });

    function closePopup() {
      popupOverlay.hidden = true;
    }
    popupClose.addEventListener('click', closePopup);
    popupOk.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) closePopup();
    });
  }

  /** Simulated async submission — resolves after a short delay. */
  function simulateBookingSubmit(formData) {
    return new Promise((resolve) => {
      // In a real deployment this would be:
      // fetch('/api/bookings', { method: 'POST', body: formData }).then(...)
      setTimeout(resolve, 400);
    });
  }

  /* ===================================================================
     15. NEWSLETTER FORM (fetch/AJAX demo)
  =================================================================== */
  function initNewsletter() {
    const form = $('#newsletterForm');
    const msg = $('#newsletterMsg');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('#newsletterEmail').value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        return;
      }

      msg.textContent = 'Subscribing…';

      try {
        // Demonstration fetch call — a placeholder endpoint that always
        // resolves, standing in for a real newsletter API in production.
        await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        msg.textContent = 'Subscribed! Watch your inbox for trip ideas.';
        form.reset();
      } catch (err) {
        msg.textContent = 'Subscribed locally — network sync will retry later.';
      }
    });
  }

  /* ===================================================================
     16. SCROLL REVEAL
  =================================================================== */
  function initScrollReveal() {
    const targets = $$('.reveal, .reveal-stagger, .destinations__grid, .packages__grid, .culture__grid');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
  }

  /* ===================================================================
     17. SMOOTH SCROLL + BACK TO TOP
  =================================================================== */
  function initSmoothScrollAndBackToTop() {
    const backToTop = $('#backToTop');
    const scrollIndicator = $('#scrollIndicator');

    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const target = $('#timeline');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (backToTop) {
      window.addEventListener('scroll', debounce(() => {
        backToTop.hidden = window.scrollY < 600;
      }, 100));

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ===================================================================
     18. RIPPLE BUTTON EFFECT
  =================================================================== */
  function initRippleEffect() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--accent, .btn--ghost');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ===================================================================
     19. INIT
  =================================================================== */
  function init() {
    // Footer year
    const yearEl = $('#footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initStickyNavbar();
    initMobileMenu();
    initTypingEffect();
    initCounters();

    initTimeline();
    renderDestinations();
    renderPackages();
    renderGuides();
    initPlanner();
    renderCulture();
    renderGallery();
    initLightbox();
    initFAQ();
    initBookingForm();
    initNewsletter();

    initScrollReveal();
    initActiveLinkOnScroll();
    initSmoothScrollAndBackToTop();
    initRippleEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

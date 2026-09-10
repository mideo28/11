// ---------- Theme toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  let isDark = false;
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀' : '☾';
  });

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // ---------- Hero parallax (subtle) ----------
  const heroImg = document.getElementById('heroImg');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
    }
  }, {passive:true});

  // ---------- Generic fade-up + timeline reveal ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, {threshold:0.18});
  document.querySelectorAll('.fade-up, .t-item').forEach(el => revealObserver.observe(el));

  // ---------- Map route draw on scroll into view ----------
  const mapSection = document.getElementById('mapSection');
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) mapSection.classList.add('in-view');
    });
  }, {threshold:0.3});
  mapObserver.observe(mapSection);

  // ---------- Map point interactivity ----------
  const mapData = {
    0: {name:"Кокшетау", quote:"Точка, откуда всё началось."},
    1: {name:"Бурабай", quote:"Первый взгляд на сосны и озеро."},
    2: {name:"Окжетпес", quote:"Самая неожиданная остановка этого дня."},
    3: {name:"Озеро Щучье", quote:"Здесь маршрут дня заканчивается — но не история."}
  };
  const mapCapName = document.getElementById('mapCapName');
  const mapCapQuote = document.getElementById('mapCapQuote');
  function setActiveStop(idx){
    document.querySelectorAll('.map-pt-group').forEach(g => g.classList.toggle('active', g.dataset.idx === String(idx)));
    document.querySelectorAll('.map-stop-btn').forEach(b => b.classList.toggle('active', b.dataset.idx === String(idx)));
    mapCapName.textContent = mapData[idx].name;
    mapCapQuote.textContent = `«${mapData[idx].quote}»`;
  }
  document.querySelectorAll('.map-pt-group').forEach(g => {
    g.addEventListener('click', () => setActiveStop(g.dataset.idx));
  });
  document.querySelectorAll('.map-stop-btn').forEach(b => {
    b.addEventListener('click', () => setActiveStop(b.dataset.idx));
  });
 
  // ---------- Animated stats ----------
  const statNums = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function tick(now){
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      }
    });
  }, {threshold:0.5});
  statNums.forEach(el => statObserver.observe(el));

  // ---------- Quiz ----------
  const quizData = {
    silence:  {title:"ТИШИНУ", place:"Озеро Щучье", days:"2 дня", km:"180 км", tags:"озеро + лес + покой", img:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1000&q=80"},
    adventure:{title:"ПРИКЛЮЧЕНИЕ", place:"Алтай", days:"4 дня", km:"620 км", tags:"горы + озёра + треккинг", img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"},
    new:      {title:"НОВЫЕ ВПЕЧАТЛЕНИЯ", place:"Сеул", days:"5 дней", km:"перелёт", tags:"город + еда + ночная жизнь", img:"https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1000&q=80"},
    culture:  {title:"КУЛЬТУРУ", place:"Киото", days:"6 дней", km:"перелёт", tags:"храмы + традиции + тишина", img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80"},
    nature:   {title:"ПРИРОДУ", place:"Доломиты", days:"5 дней", km:"310 км", tags:"горы + долины + рассветы", img:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80"},
    city:     {title:"БОЛЬШОЙ ГОРОД", place:"Сеул", days:"4 дня", km:"перелёт", tags:"небоскрёбы + улицы + огни", img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80"}
  };
  const quizOptions = document.querySelectorAll('.quiz-opt');
  const quizResult = document.getElementById('quizResult');
  const qrTitle = document.getElementById('qrTitle');
  const qrMeta = document.getElementById('qrMeta');
  const qrImg = document.getElementById('qrImg');
  quizOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      quizOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const data = quizData[btn.dataset.key];
      qrTitle.textContent = data.title;
      qrMeta.innerHTML = `<li>${data.place}</li><li>${data.days}</li><li>${data.km}</li><li>${data.tags}</li>`;
      qrImg.src = data.img;
      qrImg.alt = data.place;
      quizResult.classList.add('show');
    });
  });

  // ---------- Destination card touch support (mobile: tap shows quote) ----------
  document.querySelectorAll('.dest-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.dest-card').forEach(c => { if(c!==card) c.classList.remove('touch-active'); });
      card.classList.toggle('touch-active');
      
    });
  });

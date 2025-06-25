
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
      const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
      mobileMenu.setAttribute('aria-expanded', !expanded);
      if (mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
      } else {
        mobileMenu.classList.add('show');
      }
    });
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        mobileMenu.setAttribute('aria-expanded', 'false');
      });
    });

    // TextPressure effect (original font and logic)
    (() => {
      const container = document.querySelector(".text-pressure-title");
      const text = "Bienvenido a mi Portafolio";
      container.innerHTML = "";
      const chars = text.split("");
      chars.forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        span.dataset.char = char;
        container.appendChild(span);
      });

      let mouse = { x: window.innerWidth / 2, y: 150 };
      let cursor = { x: mouse.x, y: mouse.y };

      const dist = (a, b) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
      };

      window.addEventListener("mousemove", (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      });
      window.addEventListener(
        "touchmove",
        (e) => {
          const t = e.touches[0];
          cursor.x = t.clientX;
          cursor.y = t.clientY;
        },
        { passive: false }
      );

      function animate() {
        mouse.x += (cursor.x - mouse.x) / 15;
        mouse.y += (cursor.y - mouse.y) / 15;

        const titleRect = container.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        container.querySelectorAll("span").forEach((span) => {
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
          const d = dist(mouse, charCenter);

          const getAttr = (distance, minVal, maxVal) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = Math.floor(getAttr(d, 5, 200));
          const wght = Math.floor(getAttr(d, 100, 900));
          const italVal = getAttr(d, 0, 1).toFixed(2);
          const alphaVal = 1;

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });

        requestAnimationFrame(animate);
      }
      animate();
    })();

    // ScrollVelocity effect (original)
    (() => {
      const texts = ['Porgramador', 'Full Stack'];
      const velocity = 100;
      const container = document.getElementById("scrollvelocity-scroller");

      const numCopies = 6;
      const spans = [];

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const baseVelocity = i % 2 !== 0 ? -velocity : velocity;

        for (let j = 0; j < numCopies; j++) {
          const span = document.createElement("span");
          span.className = "custom-scroll-text";
          span.textContent = text + " ";
          container.appendChild(span);
          spans.push({ span, baseVelocity });
        }
      }

      let baseX = 0;
      let lastTimestamp = null;
      let directionFactor = 1;

      function animateScroll(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        const velocityFactor = Math.sin(timestamp / 1000) * 2;

        if (velocityFactor < 0) {
          directionFactor = -1;
        } else if (velocityFactor > 0) {
          directionFactor = 1;
        }

        let moveBy = directionFactor * velocity * (delta / 1000);
        moveBy += directionFactor * moveBy * velocityFactor;

        baseX += moveBy;

        const copyWidth = spans[0].span.offsetWidth;

        if (baseX < -copyWidth) baseX += copyWidth;
        if (baseX > 0) baseX -= copyWidth;

        container.style.transform = `translateX(${baseX}px)`;

        requestAnimationFrame(animateScroll);
      }
      requestAnimationFrame(animateScroll);
    })();

    // LetterGlitch effect (original)
    (() => {
      const container = document.getElementById("letterglitch-root");
      const canvas = document.createElement("canvas");
      container.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      const fontSize = 16;
      const charWidth = 10;
      const charHeight = 20;

      const glitchColors = ['#2b4539', '#61dca3', '#61b3dc'];
      const lettersAndSymbols = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/',
        '[', ']', '{', '}', ';', ':', '<', '>', ',', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9'
      ];

      let letters = [];
      let grid = { columns: 0, rows: 0 };
      let lastGlitchTime = Date.now();
      const glitchSpeed = 50;
      const smooth = true;
      const centerVignette = true;
      const outerVignette = false;

      function getRandomChar() {
        return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
      }

      function getRandomColor() {
        return glitchColors[Math.floor(Math.random() * glitchColors.length)];
      }

      function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
          return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      function interpolateColor(start, end, factor) {
        const result = {
          r: Math.round(start.r + (end.r - start.r) * factor),
          g: Math.round(start.g + (end.g - start.g) * factor),
          b: Math.round(start.b + (end.b - start.b) * factor),
        };
        return `rgb(${result.r}, ${result.g}, ${result.b})`;
      }

      function calculateGrid(width, height) {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
      }

      function initializeLetters(columns, rows) {
        grid = { columns, rows };
        const totalLetters = columns * rows;
        letters = Array.from({ length: totalLetters }, () => ({
          char: getRandomChar(),
          color: getRandomColor(),
          targetColor: getRandomColor(),
          colorProgress: 1,
        }));
      }

      function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);

        drawLetters();
      }

      function drawLetters() {
        if (letters.length === 0) return;
        const { width, height } = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        letters.forEach((letter, index) => {
          const x = (index % grid.columns) * charWidth;
          const y = Math.floor(index / grid.columns) * charHeight;
          ctx.fillStyle = letter.color;
          ctx.fillText(letter.char, x, y);
        });
      }

      function updateLetters() {
        if (letters.length === 0) return;

        const updateCount = Math.max(1, Math.floor(letters.length * 0.05));

        for (let i = 0; i < updateCount; i++) {
          const index = Math.floor(Math.random() * letters.length);
          if (!letters[index]) continue;

          letters[index].char = getRandomChar();
          letters[index].targetColor = getRandomColor();

          if (!smooth) {
            letters[index].color = letters[index].targetColor;
            letters[index].colorProgress = 1;
          } else {
            letters[index].colorProgress = 0;
          }
        }
      }

      function handleSmoothTransitions() {
        let needsRedraw = false;
        letters.forEach((letter) => {
          if (letter.colorProgress < 1) {
            letter.colorProgress += 0.05;
            if (letter.colorProgress > 1) letter.colorProgress = 1;

            const startRgb = hexToRgb(letter.color);
            const endRgb = hexToRgb(letter.targetColor);
            if (startRgb && endRgb) {
              letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
              needsRedraw = true;
            }
          }
        });

        if (needsRedraw) {
          drawLetters();
        }
      }

      function animate() {
        const now = Date.now();
        if (now - lastGlitchTime >= glitchSpeed) {
          updateLetters();
          drawLetters();
          lastGlitchTime = now;
        }

        if (smooth) {
          handleSmoothTransitions();
        }

        requestAnimationFrame(animate);
      }

      resizeCanvas();
      animate();

      window.addEventListener('resize', () => {
        resizeCanvas();
      });

      if (outerVignette) {
        const outerVig = document.createElement('div');
        outerVig.style.position = 'absolute';
        outerVig.style.top = '0';
        outerVig.style.left = '0';
        outerVig.style.width = '100%';
        outerVig.style.height = '100%';
        outerVig.style.pointerEvents = 'none';
        outerVig.style.background = 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)';
        container.appendChild(outerVig);
      }
      if (centerVignette) {
        const centerVig = document.createElement('div');
        centerVig.style.position = 'absolute';
        centerVig.style.top = '0';
        centerVig.style.left = '0';
        centerVig.style.width = '100%';
        centerVig.style.height = '100%';
        centerVig.style.pointerEvents = 'none';
        centerVig.style.background = 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)';
        container.appendChild(centerVig);
      }
    })();

    // Carousel full stack technologies automatic with fade effect
    (() => {
      const carouselTrack = document.getElementById('carousel-track');

      const technologies = [
        { name: "HTML5", img: "https://placehold.co/80x80?text=HTML5&bg=3b82f6&fg=fff" },
        { name: "CSS3", img: "https://placehold.co/80x80?text=CSS3&bg=2563eb&fg=fff" },
        { name: "JavaScript", img: "https://placehold.co/80x80?text=JS&bg=1e40af&fg=fff" },
        { name: "Python", img: "https://placehold.co/80x80?text=Python&bg=3b82f6&fg=fff" },
        { name: "Node.js", img: "https://placehold.co/80x80?text=Node.js&bg=2563eb&fg=fff" },
        { name: "MySQL", img: "https://placehold.co/80x80?text=MySQL&bg=1e40af&fg=fff" },
        { name: "React", img: "https://placehold.co/80x80?text=React&bg=3b82f6&fg=fff" },
        { name: "Express", img: "https://placehold.co/80x80?text=Express&bg=2563eb&fg=fff" },
        { name: "MongoDB", img: "https://placehold.co/80x80?text=MongoDB&bg=1e40af&fg=fff" },
        { name: "Docker", img: "https://placehold.co/80x80?text=Docker&bg=3b82f6&fg=fff" },
        { name: "AWS", img: "https://placehold.co/80x80?text=AWS&bg=2563eb&fg=fff" },
        { name: "Git", img: "https://placehold.co/80x80?text=Git&bg=1e40af&fg=fff" }
      ];

      let currentIndex = 0;
      const visibleCount = 5;

      function renderCarousel() {
        carouselTrack.innerHTML = '';
        for (let i = 0; i < visibleCount; i++) {
          const techIndex = (currentIndex + i) % technologies.length;
          const tech = technologies[techIndex];
          const item = document.createElement('div');
          item.className = 'carousel-item';
          item.setAttribute('aria-label', tech.name);
          const img = document.createElement('img');
          img.src = tech.img;
          img.alt = tech.name + " logo";
          const label = document.createElement('div');
          label.textContent = tech.name;
          item.appendChild(img);
          item.appendChild(label);
          carouselTrack.appendChild(item);
        }
      }

      function next() {
        currentIndex = (currentIndex + 1) % technologies.length;
        carouselTrack.style.opacity = '0';
        setTimeout(() => {
          renderCarousel();
          carouselTrack.style.opacity = '1';
        }, 500);
      }

      renderCarousel();

      setInterval(next, 3000);
    })();
  
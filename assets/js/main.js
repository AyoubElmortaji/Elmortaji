const scanlinesToggle = document.querySelector('[data-scanlines-toggle]');
const scanlines = document.querySelector('.scanlines');
const terminalToggle = document.querySelector('[data-terminal-toggle]');
const terminal = document.querySelector('.terminal-overlay');
const terminalBody = document.querySelector('[data-terminal-body]');
const terminalInput = document.querySelector('[data-terminal-input]');
const palette = document.querySelector('.palette');
const paletteInput = document.querySelector('[data-palette-input]');
const paletteResults = document.querySelector('[data-palette-results]');
const canvas = document.querySelector('[data-canvas]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('.nav-links');

const paletteActions = [
  { label: 'Home', href: 'index.html' },
  { label: 'Skills', href: 'skills.html' },
  { label: 'Projects', href: 'projects.html' },
  { label: 'Experience', href: 'experience.html' },
  { label: 'Awards', href: 'awards.html' },
  { label: 'Certifications', href: 'certifications.html' },
  { label: 'Contact', href: 'contact.html' },
];

const commands = {
  help: 'Available commands: help, projects, skills, contact, clear',
  projects: 'Opening projects list...',
  skills: 'Navigating to skills...',
  contact: 'Opening contact page...',
  clear: '',
};

const addTerminalLine = (text) => {
  if (!terminalBody) return;
  const line = document.createElement('div');
  line.textContent = text;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
};

if (scanlinesToggle && scanlines) {
  scanlinesToggle.addEventListener('click', () => {
    scanlines.classList.toggle('hidden');
  });
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

navLinks?.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

if (terminalToggle && terminal) {
  terminalToggle.addEventListener('click', () => {
    terminal.classList.toggle('active');
    if (terminal.classList.contains('active')) {
      terminalInput?.focus();
      addTerminalLine('Terminal mode active. Type help.');
    }
  });
}

terminalInput?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const value = terminalInput.value.trim().toLowerCase();
  terminalInput.value = '';
  if (!value) return;
  addTerminalLine(`> ${value}`);
  if (value === 'clear') {
    terminalBody.textContent = '';
    return;
  }
  if (commands[value]) {
    addTerminalLine(commands[value]);
  } else {
    addTerminalLine('Command not found. Type help.');
  }
  if (value === 'projects') {
    window.location.href = 'projects.html';
  }
  if (value === 'skills') {
    window.location.href = 'skills.html';
  }
  if (value === 'contact') {
    window.location.href = 'contact.html';
  }
});

const openPalette = () => {
  if (!palette) return;
  palette.classList.add('active');
  paletteInput?.focus();
  renderPalette('');
};

const closePalette = () => {
  palette?.classList.remove('active');
};

const renderPalette = (query) => {
  if (!paletteResults) return;
  paletteResults.innerHTML = '';
  const filtered = paletteActions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );
  filtered.forEach((action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = action.label;
    button.addEventListener('click', () => {
      window.location.href = action.href;
    });
    paletteResults.appendChild(button);
  });
};

paletteInput?.addEventListener('input', (event) => {
  renderPalette(event.target.value);
});

palette?.addEventListener('click', (event) => {
  if (event.target === palette) {
    closePalette();
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openPalette();
  }
  if (event.key === 'Escape') {
    closePalette();
    terminal?.classList.remove('active');
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const columns = Math.floor(window.innerWidth / 18);
  const drops = Array.from({ length: columns }, () => Math.random() * window.innerHeight);

  const draw = () => {
    ctx.fillStyle = 'rgba(5, 7, 15, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(88, 246, 255, 0.45)';
    ctx.font = '14px monospace';
    drops.forEach((y, index) => {
      const text = Math.random() > 0.5 ? '0' : '1';
      const x = index * 18;
      ctx.fillText(text, x, y);
      drops[index] = y > canvas.height ? 0 : y + 14;
    });
    requestAnimationFrame(draw);
  };

  draw();
}

const copyButtons = document.querySelectorAll('[data-copy]');
copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.getAttribute('data-copy');
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1500);
    } catch (error) {
      button.textContent = 'Failed';
    }
  });
});

/* Parti condivise da tutte le pagine: menu, tema, modale CV, toast.
   Ogni pagina imposta <body data-page="about|projects|contact" data-root="" oppure "../"> */
const ROOT = document.body.dataset.root || '';
const PAGE = document.body.dataset.page;
const CV = ROOT + 'assets/Lorenzo_D_Ambrosio_CV.pdf';
const NAV = [
  ['about', 'index.html', 'About', 'ph-user'],
  ['projects', 'projects.html', 'Progetti', 'ph-code-block'],
  ['contact', 'contact.html', 'Contatti', 'ph-envelope-simple'],
];

function renderLayout() {
  const on = 'bg-white dark:bg-dark-card shadow-sm text-brand-600 dark:text-white font-semibold';
  const off = 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white';
  const desk = NAV.map(([id, href, label]) =>
    `<a href="${ROOT + href}" class="px-4 py-1.5 rounded-full transition-all ${id === PAGE ? on : off}">${label}</a>`).join('');
  const mob = NAV.map(([id, href, label, icon]) =>
    `<a href="${ROOT + href}" class="flex flex-col items-center gap-1 text-xs ${id === PAGE ? 'text-brand-600 font-bold' : 'text-gray-500 dark:text-gray-400'}"><i class="ph ${icon} text-xl"></i><span>${label}</span></a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-dark-bg/80 border-b border-gray-200 dark:border-dark-border">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <a href="${ROOT}index.html" class="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-80">
        <span class="w-3 h-3 rounded-full bg-brand-600 animate-pulse"></span><span>Lorenzo D'Ambrosio</span>
      </a>
      <nav class="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-dark-card p-1 rounded-full border border-gray-200 dark:border-dark-border text-sm font-medium">${desk}</nav>
      <div class="flex items-center gap-2">
        <button onclick="toggleDarkMode()" aria-label="Cambia tema" class="p-2 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <i id="theme-icon-sun" class="ph ph-sun text-lg"></i><i id="theme-icon-moon" class="ph ph-moon text-lg hidden"></i>
        </button>
        <button onclick="openCvModal()" class="hidden sm:flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm">
          <i class="ph ph-file-pdf text-base"></i><span>CV</span>
        </button>
      </div>
    </div>
  </header>
  <div class="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-lg border-t border-gray-200 dark:border-dark-border px-4 py-2 flex justify-around items-center">
    ${mob}
    <button onclick="openCvModal()" class="flex flex-col items-center gap-1 text-xs text-brand-600 font-medium"><i class="ph ph-file-pdf text-xl"></i><span>CV</span></button>
  </div>`);
  document.body.insertAdjacentHTML('beforeend', `
  <!-- CV: il PDF vero in una finestra, scorrevole -->
  <div id="cv-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden animate-fade-in" onclick="if(event.target===this)closeCvModal()">
    <div class="w-full max-w-4xl h-[90vh] flex flex-col bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-3xl overflow-hidden shadow-2xl">
      <div class="p-3 sm:p-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0"><i class="ph ph-file-pdf text-xl text-brand-600"></i><span class="font-bold text-sm truncate">Curriculum Vitae</span></div>
        <div class="flex items-center gap-2">
          <a href="${CV}" target="_blank" class="px-3 py-1.5 border border-gray-200 dark:border-dark-border text-xs font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"><i class="ph ph-arrow-square-out"></i> Nuova scheda</a>
          <a href="${CV}" download class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1"><i class="ph ph-download-simple"></i> Download</a>
          <button onclick="closeCvModal()" aria-label="Chiudi" class="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><i class="ph ph-x text-lg"></i></button>
        </div>
      </div>
      <iframe id="cv-frame" title="Curriculum Vitae" class="flex-1 w-full bg-gray-100 dark:bg-dark-bg"></iframe>
    </div>
  </div>
  <!-- ================= TOAST FEEDBACK NOTIFICATION ================= -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 hidden toast-anim">
    <div class="px-4 py-3 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl border border-gray-700 dark:border-gray-200 text-xs font-semibold flex items-center gap-2">
      <i class="ph ph-check-circle text-emerald-400 dark:text-emerald-600 text-lg"></i>
      <span id="toast-message">Messaggio di feedback</span>
    </div>
  </div>`);
  syncThemeIcons();
}

/* Vecchi link del tipo index.html#projects */
if (PAGE === 'about' && location.hash === '#projects') location.replace('projects.html');
if (PAGE === 'about' && location.hash === '#contact') location.replace('contact.html');

function syncThemeIcons() {
  const d = document.documentElement.classList.contains('dark');
  document.getElementById('theme-icon-sun').classList.toggle('hidden', !d);
  document.getElementById('theme-icon-moon').classList.toggle('hidden', d);
}
function toggleDarkMode() {
  const d = document.documentElement.classList.toggle('dark');
  try { localStorage.theme = d ? 'dark' : 'light'; } catch (e) {}
  syncThemeIcons();
}
function openCvModal() {
  /* Su telefono i PDF dentro un iframe spesso non scorrono: li apro direttamente */
  if (matchMedia('(max-width: 640px)').matches || /iPhone|iPad|Android/i.test(navigator.userAgent)) { window.open(CV, '_blank'); return; }
  const f = document.getElementById('cv-frame');
  if (!f.getAttribute('src')) f.src = CV + '#view=FitH';
  document.getElementById('cv-modal').classList.remove('hidden');
}
function closeCvModal() { document.getElementById('cv-modal').classList.add('hidden'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCvModal(); });

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-message').innerText = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}
function copyEmail() {
  navigator.clipboard.writeText('lorenzo.dambro@gmail.com');
  showToast('Email copiata negli appunti!');
}

/* Toggle GIF / video nelle pagine progetto */
function toggleMedia(id, type) {
  const on = ['bg-white', 'dark:bg-dark-card', 'shadow-sm', 'text-brand-600', 'dark:text-brand-400'];
  const gif = document.getElementById(`gif-${id}`), vid = document.getElementById(`video-${id}`);
  const bg = document.getElementById(`btn-${id}-gif`), bv = document.getElementById(`btn-${id}-video`);
  const showGif = type === 'gif';
  gif.classList.toggle('hidden', !showGif);
  if (vid) vid.classList.toggle('hidden', showGif);
  bg.classList.toggle('hidden-x', false);
  (showGif ? bg : bv).classList.add(...on);
  (showGif ? bv : bg).classList.remove(...on);
}

renderLayout();

/* Comparsa graduale di card e schede progetto */
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
  document.querySelectorAll('main article, main a.group').forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

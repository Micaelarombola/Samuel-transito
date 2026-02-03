/* ======================================================
   TRÁNSITO SAMUEL • app.js (ARREGLADO FULL)
   - Scroll OK
   - 1 solo lightbox para gatos + "nuestro espacio"
====================================================== */

console.log("✅ app.js cargó OK");

/* ======= CONFIG (EDITÁ ACÁ) ======= */
const CONFIG = {
  whatsappPhone: "5491161137106",
  facebookUrl: "https://www.facebook.com/share/1BQV2ZwhTG/",
  alias: "Arielo1206",
  mp: "Tu link/usuario",
  defaultWaMsg:
    "Hola! 🙌\n" +
    "Vengo de la página de Tránsito Samuel y quiero:\n" +
    "- (adoptar / donar / ser tránsito / consultar)\n\n" +
    "Mi nombre es:\n" +
    "Mensaje:"
};

/* ======= DATA (GATOS) ======= */
const CATS = [
  {
    id: "miel",
    name: "Miel",
    age: "35 días",
    status: "Listo para adopción a partir del 20 de febrero",
    tags: ["mimosa", "bebé", "desparasitada"],
    notes: "Se recupera súper bien. Come, juega y usa piedritas.",
    image: "assets/miel.jfif"
  },
  {
    id: "luna",
    name: "Luna",
    age: "35 días",
    status: "Listo para adopción a partir del 20 de febrero",
    tags: ["tranquila", "castrada", "sociable"],
    notes: "Ideal para hogar tranquilo. Se adapta rápido con paciencia.",
    image: "assets/luna.jpg"
  },
  {
    id: "cloe",
    name: "Cloe",
    age: "35 días",
    status: "Listo para adopción a partir del 20 de febrero",
    tags: ["juguetona", "bebé"],
    notes: "Aún se está observando su evolución y rutina.",
    image: "assets/cloe.jpg"
  },
  {
    id: "china",
    name: "China",
    age: "1 año y 2 meses aprox.",
    status: "Listo para adopción a partir del 20 de febrero",
    tags: ["juguetona", "mamá"],
    notes: "Aún se está observando su evolución y rutina.",
    image: "assets/china.jpg"
  },
  {
    id: "greta",
    name: "Greta",
    age: "3 meses",
    status: "Adoptada",
    tags: ["dulce", "juguetona"],
    notes: "Ya fue adoptada. ¡Gracias Matías! 💙",
    image: "assets/greta.jpg"
  },
  {
    id: "kitanai",
    name: "Kitanai",
    age: "2 meses aprox.",
    status: "Adoptada",
    tags: ["bebé", "delicada", "valiente"],
    notes: "Ya fue adoptado por su nueva familia. Gracias Eliana y Fernando",
    image: "assets/kitanai.jpeg"
  },
  {
    id: "inti",
    name: "Inti",
    age: "2 meses aprox.",
    status: "Adoptado",
    tags: ["bebé", "curioso", "valiente"],
    notes: "Ya fue adoptado por su nueva familia. Gracias Raquel y Jorge",
    image: "assets/inti.jpg"
  }
];

/* ======= HELPERS ======= */
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

function norm(str) {
  return (str || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function waLink(text) {
  return `https://api.whatsapp.com/send?phone=${CONFIG.whatsappPhone}&text=${encodeURIComponent(text)}`;
}

/* ======================================================
   ✅ REVEAL
====================================================== */
let observer = null;

function setupReveal() {
  const items = $$(".reveal:not(.on)");
  if (!items.length) return;

  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("on");
          observer.unobserve(ent.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el, i) => {
    el.style.transitionDelay = Math.min(240, i * 45) + "ms";
    observer.observe(el);
  });
}

/* ======================================================
   SPLASH: Ingresar
====================================================== */
const splash = $("#splash");
const btnIngresar = $("#btnIngresar");
const contenido = $("#contenido");

function enterSite() {
  if (!splash || !contenido) return;

  splash.classList.add("out");
  contenido.hidden = false;

  // desbloquear scroll
  document.body.classList.remove("locked");

  // revela lo visible inmediatamente
  $$(".reveal").forEach((el) => el.classList.add("on"));

  setTimeout(() => {
    splash.style.display = "none";
    window.scrollTo(0, 0);
    setupReveal();
  }, 780);
}

if (btnIngresar) btnIngresar.addEventListener("click", enterSite);

/* ======================================================
   Video fallback
====================================================== */
const splashVideo = $("#splashVideo");
const splashImg = $("#splashImg");

if (splashVideo && splashImg) {
  splashImg.style.display = "block";

  splashVideo.addEventListener("canplay", () => {
    splashImg.style.display = "none";
  });

  splashVideo.addEventListener("error", () => {
    splashImg.style.display = "block";
  });
}

/* ======================================================
   Cursor glow
====================================================== */
const glow = $("#cursorGlow");
window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.opacity = "1";
});
window.addEventListener("mouseleave", () => {
  if (glow) glow.style.opacity = "0";
});

/* ======================================================
   Fondo huellitas (canvas)
====================================================== */
const canvas = document.getElementById("paws");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  let W, H;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  const paws = [];
  const TOTAL = 45;

  for (let i = 0; i < TOTAL; i++) {
    paws.push({
      x: rand(0, W),
      y: rand(0, H),
      s: rand(0.65, 1.25),
      a: rand(0.10, 0.22),
      r: rand(-1, 1),
      vy: rand(0.18, 0.48),
      vx: rand(-0.16, 0.16)
    });
  }

  function drawPaw(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.globalAlpha = p.a;

    ctx.fillStyle = "rgba(30, 122, 120, 0.6)";

    ctx.beginPath();
    ctx.ellipse(0, 0, 10 * p.s, 12 * p.s, 0, 0, Math.PI * 2);
    ctx.fill();

    [[-10, -14], [-3, -18], [5, -18], [12, -14]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.ellipse(x * p.s, y * p.s, 4 * p.s, 6 * p.s, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    paws.forEach((p) => {
      drawPaw(p);
      p.y += p.vy;
      p.x += p.vx;

      if (p.y > H + 40) {
        p.y = -40;
        p.x = rand(0, W);
      }
      if (p.x < -60) p.x = W + 60;
      if (p.x > W + 60) p.x = -60;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ======================================================
   Nav mobile
====================================================== */
const menuBtn = $("#menuBtn");
const nav = $("#nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  $$("#nav a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ======================================================
   Datos + links
====================================================== */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const aliasText = $("#aliasText");
if (aliasText) aliasText.textContent = CONFIG.alias;

const btnWhatsHero = $("#btnWhatsHero");
const btnFbHero = $("#btnFbHero");
const btnWhatsCats = $("#btnWhatsCats");
const btnFbContact = $("#btnFbContact");
const btnWhatsAbout = $("#btnWhatsAbout");

if (btnWhatsHero) btnWhatsHero.href = waLink(CONFIG.defaultWaMsg);
if (btnWhatsCats) btnWhatsCats.href = waLink("Hola! Quiero consultar por adopción 🐾\n\n¿Me cuentan qué gatitos están disponibles?");
if (btnWhatsAbout) btnWhatsAbout.href = waLink("Hola! 🙌 Vengo de la página de Tránsito Samuel y quiero ayudar. ¿Qué necesitan hoy?");

if (btnFbHero) btnFbHero.href = CONFIG.facebookUrl;
if (btnFbContact) btnFbContact.href = CONFIG.facebookUrl;

/* ======================================================
   Render gatos + filtros + búsqueda
====================================================== */
const chipsEl = $("#chips");
const gridEl = $("#catsGrid");
const searchInput = $("#searchInput");

let activeFilter = "Todos";
let query = "";

const FILTERS = ["Todos", ...Array.from(new Set(CATS.map((c) => c.status)))];

function chipHtml(label, active) {
  return `<button class="chip ${active ? "active" : ""}" type="button" data-filter="${label}">${label}</button>`;
}

function catCard(cat) {
  const badgeClass = norm(cat.status).includes("adop") ? "" : "warm";
  const tags = (cat.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

  const waMsg =
    `Hola! 🐾\n` +
    `Vengo de la página de Tránsito Samuel.\n\n` +
    `Quiero consultar por:\n` +
    `• ${cat.name}\n` +
    `• Estado: ${cat.status}\n` +
    `• Edad: ${cat.age}\n\n` +
    `Mi nombre es:\n` +
    `Mensaje:`;

  return `
    <article class="card cat reveal">
      <img class="cat__img" src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.style.display='none'">
      <div class="cat__body">
        <div class="cat__title">
          <h3>${cat.name}</h3>
          <span class="badge ${badgeClass}">${cat.status}</span>
        </div>
        <div class="cat__meta">
          <div><strong>Edad:</strong> ${cat.age}</div>
          <div>${cat.notes || ""}</div>
        </div>
        <div class="tags">${tags}</div>

        <div class="cat__actions">
          <a class="btn btn--primary" href="${waLink(waMsg)}" target="_blank" rel="noopener">Consultar</a>
          <a class="btn btn--ghost" href="#ayudar">Ayudar</a>
        </div>
      </div>
    </article>
  `;
}

function applyFilters() {
  const q = norm(query);

  const filtered = CATS.filter((c) => {
    const passStatus = activeFilter === "Todos" ? true : c.status === activeFilter;
    const hay =
      norm(c.name) +
      " " +
      norm(c.status) +
      " " +
      norm(c.age) +
      " " +
      norm((c.tags || []).join(" ")) +
      " " +
      norm(c.notes);

    const passQuery = !q || hay.includes(q);
    return passStatus && passQuery;
  });

  if (!gridEl) return;

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div class="card reveal" style="grid-column:1/-1">
        <h3 style="margin:0 0 6px; font-family:'Playfair Display', serif;">No encontramos resultados</h3>
        <p style="margin:0; color:#5f6b72; line-height:1.7">Probá con otro filtro o borrá la búsqueda.</p>
      </div>
    `;
    setupReveal();
    return;
  }

  gridEl.innerHTML = filtered.map(catCard).join("");
  setupReveal();
}

function renderChips() {
  if (!chipsEl) return;
  chipsEl.innerHTML = FILTERS.map((f) => chipHtml(f, f === activeFilter)).join("");

  $$(".chip", chipsEl).forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      renderChips();
      applyFilters();
    });
  });
}

renderChips();
applyFilters();

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    query = e.target.value || "";
    applyFilters();
  });
}

/* ======================================================
   ✅ CLICK DELEGADO: data-wa y data-share
====================================================== */
document.addEventListener("click", async (e) => {
  const waEl = e.target.closest("[data-wa]");
  if (waEl) {
    e.preventDefault();
    const msg = waEl.getAttribute("data-wa") || CONFIG.defaultWaMsg;
    window.open(waLink(msg), "_blank");
    return;
  }

  const shareEl = e.target.closest("[data-share]");
  if (shareEl) {
    e.preventDefault();
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Tránsito Samuel",
          text: "Hogar de tránsito para gatos rescatados 🐾. Ayudá difundiendo, donando o adoptando.",
          url
        });
      } else {
        await navigator.clipboard.writeText(url);
        const old = shareEl.textContent;
        shareEl.textContent = "Link copiado ✅";
        setTimeout(() => (shareEl.textContent = old), 1500);
      }
    } catch {
      window.prompt("Copiá el link:", url);
    }
  }
});

/* ======================================================
   Copy alias
====================================================== */
const copyAliasBtn = $("#copyAliasBtn");
if (copyAliasBtn) {
  copyAliasBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.alias);
      const old = copyAliasBtn.textContent;
      copyAliasBtn.textContent = "¡Copiado! ✅";
      setTimeout(() => (copyAliasBtn.textContent = old), 1400);
    } catch {
      alert("No se pudo copiar. Copialo manualmente: " + CONFIG.alias);
    }
  });
}

/* ======================================================
   ScrollSpy
====================================================== */
(function setupScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll("#nav a"));
  if (!navLinks.length) return;

  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("active", isActive);
    });
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) setActive(ent.target.id);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "-80px 0px -55% 0px"
    }
  );

  sections.forEach((sec) => obs.observe(sec));

  const first = sections[0];
  if (first) setActive(first.id);
})();

/* ======================================================
   ✅ LIGHTBOX ÚNICO (gatos + espacio)
====================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

let prevBodyOverflow = "";

function openLightbox(src, alt = "") {
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  if (lightboxCaption) lightboxCaption.textContent = alt || "";

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  prevBodyOverflow = document.body.style.overflow || "";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  if (lightboxCaption) lightboxCaption.textContent = "";

  document.body.style.overflow = prevBodyOverflow;
}

/* Click delegado para abrir */
document.addEventListener("click", (e) => {
  const imgCat = e.target.closest(".cat__img");
  const imgSpace = e.target.closest("[data-lightbox]");

  const img = imgCat || imgSpace;
  if (!img) return;

  // si la imagen no cargó, no abrir
  if (!img.getAttribute("src")) return;

  e.preventDefault();
  openLightbox(img.src, img.alt || "");
});

/* Click para cerrar */
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target.closest("[data-lb-close]")) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("open")) closeLightbox();
});

/* Inicial */
setupReveal();

/* ===== FORM CONTACTO -> WhatsApp ===== */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = (document.getElementById("fNombre")?.value || "").trim();
    const motivo = (document.getElementById("fMotivo")?.value || "").trim();
    const mensaje = (document.getElementById("fMensaje")?.value || "").trim();

    const text =
      `Hola! 🙌 Vengo de la página de Tránsito Samuel.\n\n` +
      `Nombre: ${nombre}\n` +
      `Quiero: ${motivo}\n\n` +
      `Mensaje:\n${mensaje}`;

    window.open(waLink(text), "_blank");
  });
}

/* ===== Botones rápidos ===== */
document.addEventListener("click", (e) => {
  const q = e.target.closest("[data-fill]");
  if (!q) return;

  const motivo = q.getAttribute("data-fill");
  const sel = document.getElementById("fMotivo");
  if (sel) sel.value = motivo;

  const msg = document.getElementById("fMensaje");
  if (msg && !msg.value.trim()) {
    const templates = {
      "Adoptar": "Hola! Quiero info para adoptar. ¿Qué requisitos piden y cuáles están disponibles?",
      "Donar": "Hola! Quiero donar. ¿Qué insumos necesitan hoy o cómo puedo ayudar con dinero?",
      "Ofrecer tránsito": "Hola! Quiero ofrecerme como tránsito temporal. ¿Cómo es el proceso y qué necesito?",
      "Difundir": "Hola! Quiero ayudar difundiendo. ¿Me pasan publicaciones o flyers para compartir?"
    };
    msg.value = templates[motivo] || "";
  }
});

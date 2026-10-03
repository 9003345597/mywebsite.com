/* =====================================================
   EDIT HERE: your projects. Copy one block to add more.
   - image: path like "images/bookstore.png" (leave "" for the default visual)
   - demo / github: paste your links (leave "#" until ready)
   ===================================================== */
const PROJECTS = [
  {
    title: "Online Book Store",
    featured: true,
    desc: "An online bookstore website designed to provide users with a simple and user-friendly experience for browsing books and managing their shopping cart.",
    tags: ["HTML", "CSS", "JavaScript", "Database"],
    image: "",
    demo: "#",
    github: "#"
  }
];

/* =====================================================
   EDIT HERE: your certificates. Copy one block to add more.
   ===================================================== */
const CERTS = [
  { name: "Certificate Name", org: "Organization", year: "Year", link: "#" },
  { name: "Certificate Name", org: "Organization", year: "Year", link: "#" },
  { name: "Certificate Name", org: "Organization", year: "Year", link: "#" }
];

/* EDIT HERE: skills shown in the scrolling strip under the hero */
const SKILLS = ["HTML", "CSS", "JavaScript", "Python", "Java (Basic)", "Database", "UI/UX Design"];

const BOOK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M9 7h6M9 11h6"/></svg>';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---- Render projects ---- */
document.getElementById("project-list").innerHTML = PROJECTS.map(p => `
  <article class="card project reveal${p.featured ? " featured" : ""}">
    <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : BOOK_ICON}</div>
    <div>
      ${p.featured ? '<span class="badge">Main project</span>' : ""}
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="btns" style="justify-content:flex-start">
        <a class="btn primary" href="${esc(p.demo)}" target="_blank" rel="noopener">View Project</a>
        <a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </article>`).join("");

/* ---- Render certificates ---- */
document.getElementById("cert-list").innerHTML = CERTS.map(c => `
  <article class="card cert reveal">
    <h3>${esc(c.name)}</h3>
    <p class="org">${esc(c.org)}</p>
    <p class="org">${esc(c.year)}</p>
    <a class="btn" href="${esc(c.link)}" target="_blank" rel="noopener">View Certificate</a>
  </article>`).join("");

/* ---- Skill strip (list repeated so the scroll loops smoothly) ---- */
const strip = SKILLS.map(s => `<span>${esc(s)}</span>`).join("");
document.getElementById("track").innerHTML = strip + strip;

/* ---- Mobile menu ---- */
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); } });

/* ---- Highlight current section in the nav + reveal cards on scroll ---- */
const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => spy.observe(s));

const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

/* ---- Contact form validation ---- */
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const setErr = (id, msg) => { form.querySelector(`[data-for="${id}"]`).textContent = msg; form[id].setAttribute("aria-invalid", !!msg); return !msg; };

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim(), email = form.email.value.trim(), message = form.message.value.trim();
  const ok = [
    setErr("name", name.length < 2 ? "Enter your name (at least 2 characters)." : ""),
    setErr("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "Enter a valid email address."),
    setErr("message", message.length < 10 ? "Write a message of at least 10 characters." : "")
  ].every(Boolean);
  if (!ok) { status.textContent = ""; return; }

  /* EDIT HERE (optional): to receive messages without opening an email app,
     replace this block with a Formspree or EmailJS request. */
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:ABINAYAMANIVANNAN1645@GMAIL.COM?subject=${encodeURIComponent("Portfolio message from " + name)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Opening your email app to send the message.";
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

// ---- Studio Gmail address used for all bookings ----
const STUDIO_GMAIL = "mrdeepak3012@gmail.com";

function openGmailCompose(subject, body){
  const url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(STUDIO_GMAIL) +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
  window.open(url, "_blank");
}

// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 500);
});

// Navbar scroll state + active link highlighting
const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  let current = 'home';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  document.getElementById('backTop').classList.toggle('show', window.scrollY > 500);
});

// Close mobile menu on link click
document.querySelectorAll('#navMenu .nav-link').forEach(l => {
  l.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) new bootstrap.Collapse(menu).hide();
  });
});

// Back to top
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portItems = document.querySelectorAll('.port-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

// Service card "Book Now" buttons -> open Gmail compose prefilled for that service
document.querySelectorAll('.svc-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const service = btn.dataset.service || "a session";
    const subject = "Booking Request — " + service;
    const body = "Hi SUBA STUDIO,\n\nI'd like to book: " + service +
      "\n\nPreferred date: \nPreferred time: \n\nName: \nPhone: \n\nThanks!";
    openGmailCompose(subject, body);
  });
});

// Booking form -> compose Gmail with all details filled in
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('bkName').value;
  const email = document.getElementById('bkEmail').value;
  const phone = document.getElementById('bkPhone').value;
  const service = document.getElementById('bkService').value;
  const date = document.getElementById('bkDate').value;
  const time = document.getElementById('bkTime').value;
  const message = document.getElementById('bkMessage').value;

  const subject = "Booking Request — " + service;
  const body =
    "Name: " + name +
    "\nEmail: " + email +
    "\nPhone: " + phone +
    "\nService: " + service +
    "\nPreferred Date: " + date +
    "\nPreferred Time: " + time +
    "\n\nMessage:\n" + message;

  openGmailCompose(subject, body);

  document.getElementById('formMsg').style.display = 'block';
  this.reset();
});

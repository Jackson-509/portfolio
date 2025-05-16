// --- Défilement fluide vers une section ---
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
window.scrollToSection = scrollToSection;

// --- Gestion des modales carrousel multiples ---
const carousels = {}; // Stocke l'index actif de chaque modale

function openCarousel(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove('hidden');
  carousels[id] = 0;
  showImage(id, 0);
}

function closeCarousel(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function showImage(id, index) {
  const modal = document.getElementById(id);
  if (!modal) return;

  const images = modal.querySelectorAll('.carousel-img');
  if (!images.length) return;

  index = (index + images.length) % images.length;
  carousels[id] = index;

  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
    img.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide(id) {
  showImage(id, carousels[id] + 1);
}

function prevSlide(id) {
  showImage(id, carousels[id] - 1);
}

// --- Initialisation automatique des modales ---
document.querySelectorAll('.modal').forEach(modal => {
  const id = modal.id;

  // Bouton de fermeture
  const closeBtn = modal.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeCarousel(id));
  }

  // Boutons navigation
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  if (prevBtn) prevBtn.addEventListener('click', () => prevSlide(id));
  if (nextBtn) nextBtn.addEventListener('click', () => nextSlide(id));

  // Clic en dehors du contenu
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCarousel(id);
    }
  });
});

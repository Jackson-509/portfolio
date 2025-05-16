// script.js

// Fonction pour faire défiler vers une section spécifique
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const modal = document.getElementById('modal-carousel');
const projetBI = document.getElementById('projet-bi');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const images = document.querySelectorAll('.carousel-img');
let currentIndex = 0;

// Affiche l'image du carrousel selon l'index
function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

// Ouvre la modale au clic sur le projet BI
if (projetBI && modal && images.length > 0) {
  projetBI.addEventListener('click', () => {
    modal.classList.remove('hidden');
    currentIndex = 0;
    showImage(currentIndex);
  });
}

// Fermer la modale au clic sur la croix
if (closeBtn && modal) {
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

// Bouton précédent du carrousel
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });
}

// Bouton suivant du carrousel
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
}

// Fermer modale au clic en dehors du contenu
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

// Export si besoin d'appeler depuis HTML inline
window.scrollToSection = scrollToSection;

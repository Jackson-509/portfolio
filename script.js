// Fonction pour faire défiler vers une section spécifique
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}
const modal = document.getElementById('modal-carousel');
const projetBI = document.getElementById('projet-bi');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const images = document.querySelectorAll('.carousel-img');
let currentIndex = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

projetBI.addEventListener('click', () => {
  modal.classList.remove('hidden');
  currentIndex = 0;
  showImage(currentIndex);
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// Fermer modale au clic en dehors du contenu
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});


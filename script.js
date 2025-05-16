function openCarousel(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const images = modal.querySelectorAll('.carousel-img');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  // Afficher modale et première image
  modal.classList.remove('hidden');
  showImage(currentIndex);

  // Boutons
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  const closeBtn = modal.querySelector('.close-btn');

  // Nettoyer anciens handlers au cas où (pour éviter accumuler)
  prevBtn.onclick = null;
  nextBtn.onclick = null;
  closeBtn.onclick = null;
  modal.onclick = null;

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  };

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  };

  closeBtn.onclick = () => {
    modal.classList.add('hidden');
  };

  // Fermer modale en cliquant en dehors du contenu
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  };
}

// Fonction pour ouvrir et gérer le carrousel dans la modale
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

  // Récupération des boutons dans la modale
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  const closeBtn = modal.querySelector('.close-btn');

  // Nettoyer les anciens gestionnaires d’événements pour éviter les doublons
  prevBtn.onclick = null;
  nextBtn.onclick = null;
  closeBtn.onclick = null;
  modal.onclick = null;

  // Navigation image précédente
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  };

  // Navigation image suivante
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  };

  // Fermer la modale au clic sur la croix
  closeBtn.onclick = () => {
    modal.classList.add('hidden');
  };

  // Fermer la modale au clic en dehors du contenu
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  };
}

// Envoi des données statistiques de visite à Zapier au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
  fetch("https://hooks.zapier.com/hooks/catch/23024599/2jdgkx4/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer || "accès direct",
      page: window.location.href
    })
  }).catch(err => {
    console.error("Erreur envoi Zapier :", err);
  });
});

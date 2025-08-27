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

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.status-message.success');
    const errorMessage = document.querySelector('.status-message.error');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher l'animation de chargement
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simuler un envoi (à remplacer par un vrai appel AJAX)
            setTimeout(() => {
                // Réinitialiser le bouton
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Simuler une réponse réussie (à remplacer par la gestion réelle de la réponse)
                const isSuccess = Math.random() > 0.5;
                
                if (isSuccess) {
                    showStatusMessage(successMessage);
                    contactForm.reset();
                    // Replacer les labels après réinitialisation du formulaire
                    resetFormLabels();
                } else {
                    showStatusMessage(errorMessage);
                }
            }, 1500);
        });
        
        // Gestion des champs de formulaire pour les labels flottants
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Vérifier si le champ a déjà une valeur au chargement (pour le rechargement de page)
            if (input.value) {
                input.previousElementSibling.classList.add('active');
            }
            
            // Gérer le focus
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
                if (this.value) {
                    this.previousElementSibling.classList.add('active');
                } else {
                    this.previousElementSibling.classList.remove('active');
                }
            });
        });
    }
    
    function showStatusMessage(element) {
        // Cacher tous les messages d'état
        document.querySelectorAll('.status-message').forEach(msg => {
            msg.classList.remove('show');
        });
        
        // Afficher le message spécifié
        element.classList.add('show');
        
        // Cacher le message après 5 secondes
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }
    
    function resetFormLabels() {
        const labels = document.querySelectorAll('#contactForm label');
        labels.forEach(label => {
            label.classList.remove('active');
        });
    }
});

// Envoi des données statistiques de visite à Zapier
document.addEventListener('DOMContentLoaded', () => {
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
  }).catch(error => {
    console.error("Erreur envoi Zapier :", error);
  });
});

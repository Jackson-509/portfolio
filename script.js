// Fonction pour faire défiler vers une section spécifique
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}
<script>
  const imageSets = {
    "boite-mail": [
      "image_source_portfolio/boite_mail_1.png",
      "image_source_portfolio/boite_mail_2.png",
      "image_source_portfolio/boite_mail_3.png"
    ],
    // Tu peux en ajouter d'autres ici
  };

  let currentImageIndex = 0;
  let currentSet = [];

  function openLightbox(setKey) {
    currentSet = imageSets[setKey];
    currentImageIndex = 0;
    document.getElementById("lightbox-img").src = currentSet[0];
    document.getElementById("lightbox").style.display = "flex";
  }

  function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentSet.length;
    document.getElementById("lightbox-img").src = currentSet[currentImageIndex];
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentSet.length) % currentSet.length;
    document.getElementById("lightbox-img").src = currentSet[currentImageIndex];
  }
</script>

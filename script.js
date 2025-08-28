// --- MODAL CAROUSEL LOGIC ---
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

  modal.classList.remove('hidden');
  showImage(currentIndex);

  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  const closeBtn = modal.querySelector('.close-btn');

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

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  };
}

// --- COOKIE BANNER LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  // Cookie Banner
  const banner = document.getElementById('cookie-banner');
  const overlay = document.getElementById('cookie-overlay');
  console.log('Cookie banner element:', banner); // Added for debugging
  if (banner) {
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const cookieConsent = localStorage.getItem('cookie_consent');

    if (cookieConsent === 'accepted') {
      if (typeof initGA === 'function') initGA();
    } else if (!cookieConsent) {
      banner.style.display = 'flex';
      overlay.style.display = 'block';
      document.body.classList.add('no-scroll'); // Add no-scroll class
    }

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'accepted');
      banner.style.display = 'none';
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll'); // Remove no-scroll class
      if (typeof initGA === 'function') initGA();
    });

    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'rejected');
      banner.style.display = 'none';
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll'); // Remove no-scroll class
    });
  }

  // --- CONTACT FORM REVEAL LOGIC ---
  const openBtn = document.getElementById('open-contact-form-btn');
  const contactForm = document.querySelector('.contact-form');

  if (openBtn && contactForm) {
    openBtn.addEventListener('click', () => {
      openBtn.style.display = 'none';
      contactForm.classList.add('visible');
    });
  }

  // --- BURGER MENU LOGIC ---
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burgerMenu && mobileNav) {
    burgerMenu.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

  // --- GA4 TRACKING ---
  // Track project clicks
  document.querySelectorAll('.projet').forEach(project => {
    project.addEventListener('click', () => {
      const projectId = project.id;
      gtag('event', 'project_click', {
        'project_id': projectId,
        'project_name': project.querySelector('h3').innerText
      });
    });
  });

  // Track LinkedIn link clicks
  const linkedinLink = document.querySelector('.linkedin-link');
  if (linkedinLink) {
    linkedinLink.addEventListener('click', () => {
      gtag('event', 'linkedin_click', {
        'link_url': linkedinLink.href
      });
    });
  }

  // Track CV link clicks
  const cvLink = document.querySelector('a[href="Gestionnaire_de_données_ADV.pdf"]');
  if (cvLink) {
    cvLink.addEventListener('click', () => {
      gtag('event', 'cv_download', {
        'file_name': 'Gestionnaire_de_données_ADV.pdf'
      });
    });
  }
});

// Define initGA function for cookie consent
function initGA() {
  gtag('config', 'G-JMF67CWQJV');
}
  
  

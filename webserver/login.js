(() => {
  const preview = document.getElementById('logoPreview');
  const lightbox = document.getElementById('logoLightbox');
  const closeButton = document.getElementById('logoLightboxClose');
  if (!preview || !lightbox || !closeButton) return;

  const setOpen = (open) => {
    lightbox.classList.toggle('open', open);
    lightbox.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  preview.addEventListener('click', () => setOpen(true));
  preview.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
    }
  });
  closeButton.addEventListener('click', () => setOpen(false));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
})();

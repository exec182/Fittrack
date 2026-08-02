(() => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    const assetVersion = document.body?.getAttribute('data-asset-version') || '1';
    navigator.serviceWorker.register(`./service-worker.js?v=${encodeURIComponent(assetVersion)}`).catch(() => {
      // Registrierung ist optional und darf die App nicht blockieren.
    });
  });
})();
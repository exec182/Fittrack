document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-text]');
  if (!button) return;
  const status = button.parentElement?.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(button.dataset.copyText || '');
    if (status) status.textContent = 'Kopiert';
  } catch (_error) {
    if (status) status.textContent = 'Kopieren fehlgeschlagen';
  }
});

document.addEventListener('submit', (event) => {
  const nick = event.target.dataset.deleteUser;
  if (nick) {
    if (!window.confirm('User wirklich löschen?') || !window.confirm(`ALLE Daten von ${nick} endgültig löschen?`)) {
      event.preventDefault();
      return;
    }
    event.target.elements.delete_confirmation.value = `DELETE ${nick}`;
  }
  const message = event.target.dataset.confirm;
  if (message && !window.confirm(message)) event.preventDefault();
});

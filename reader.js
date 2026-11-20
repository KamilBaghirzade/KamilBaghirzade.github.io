document.querySelectorAll('.document-reader').forEach((reader) => {
  const controls = reader.querySelector('.reader-controls');
  const previous = controls.querySelector('[data-step="-1"]');
  const next = controls.querySelector('[data-step="1"]');
  const status = controls.querySelector('.page-status');
  const zoom = controls.querySelector('select');
  const viewport = reader.querySelector('.reader-viewport');
  const image = viewport.querySelector('img');
  const pageCount = Number(reader.dataset.pages);
  let page = 1;

  function navigate(step) {
    const newPage = Math.min(pageCount, Math.max(1, page + step));
    if (newPage !== page) {
      page = newPage;
      image.src = reader.dataset.folder + '/' + page + '.webp';
      image.alt = 'Page ' + page + ' of ' + pageCount;
      status.textContent = image.alt;
      viewport.scrollTo(0, 0);
    }
    previous.disabled = page === 1;
    next.disabled = page === pageCount;
  }

  previous.addEventListener('click', () => navigate(-1));
  next.addEventListener('click', () => navigate(1));
  zoom.addEventListener('change', () => {
    image.style.width = zoom.value + '%';
  });
  controls.hidden = false;
  navigate(0);
});

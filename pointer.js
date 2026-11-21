const pointerPreference = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

document.addEventListener('pointermove', (event) => {
  if (!pointerPreference.matches || event.pointerType !== 'mouse') return;
  const panel = event.target.closest('.hero, .feature, .showcase, .case-intro');
  if (!panel) return;
  const bounds = panel.getBoundingClientRect();
  panel.style.setProperty('--pointer-x', (event.clientX - bounds.left) + 'px');
  panel.style.setProperty('--pointer-y', (event.clientY - bounds.top) + 'px');
}, { passive: true });

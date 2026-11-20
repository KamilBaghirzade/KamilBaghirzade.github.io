const pointerPreference = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

document.addEventListener('pointermove', (event) => {
  if (!pointerPreference.matches || event.pointerType !== 'mouse') return;
  const panel = event.target.closest('.hero, .feature, .showcase, .case-intro');
  if (!panel) return;
  const bounds = panel.getBoundingClientRect();
  panel.style.setProperty('--pointer-x', (event.clientX - bounds.left) + 'px');
  panel.style.setProperty('--pointer-y', (event.clientY - bounds.top) + 'px');
}, { passive: true });

const ring = document.createElement('div');
ring.className = 'pointer-ring';
ring.setAttribute('aria-hidden', 'true');
document.body.append(ring);

document.addEventListener('pointermove', (event) => {
  if (!pointerPreference.matches || event.pointerType !== 'mouse' ||
      event.target.closest('object, iframe, input, textarea')) {
    ring.classList.remove('visible');
    return;
  }
  ring.style.transform = 'translate(' + (event.clientX - 16) + 'px, ' + (event.clientY - 16) + 'px)';
  ring.classList.add('visible');
  ring.classList.toggle('active', Boolean(event.target.closest('a, button, summary')));
}, { passive: true });

document.addEventListener('pointerdown', () => ring.classList.add('pressed'));
window.addEventListener('pointerup', () => ring.classList.remove('pressed'));
document.documentElement.addEventListener('pointerleave', () => ring.classList.remove('visible', 'pressed'));
window.addEventListener('blur', () => ring.classList.remove('visible', 'pressed'));

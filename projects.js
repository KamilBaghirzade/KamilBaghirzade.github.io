const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');

function selectFilter(selected) {
  filters.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selected));
  });
  projects.forEach((project) => {
    project.hidden = selected.dataset.filter !== 'all' &&
      project.dataset.category !== selected.dataset.filter;
  });
}

filters.forEach((button) => {
  button.addEventListener('click', () => selectFilter(button));
});

window.addEventListener('hashchange', () => {
  const linkedProject = Array.from(projects).find((project) => '#' + project.id === location.hash);
  if (linkedProject?.hidden) {
    selectFilter(filters[0]);
    linkedProject.scrollIntoView();
  }
});

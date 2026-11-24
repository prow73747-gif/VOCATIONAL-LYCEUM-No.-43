const menuToggle = document.getElementById('menuToggle');
const topnav = document.getElementById('topnav');
if (menuToggle && topnav) {
  menuToggle.addEventListener('click', () => {
    const opened = topnav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });
  topnav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    topnav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const pcCount = document.getElementById('pcCount');
const pcCountValue = document.getElementById('pcCountValue');
const calcTotal = document.getElementById('calcTotal');
const fmt = value => new Intl.NumberFormat('ru-RU').format(Math.round(value));
if (pcCount && pcCountValue && calcTotal) {
  function updateBudget() {
    const count = Number(pcCount.value);
    const workstations = count * 45000;
    const network = 14400 + 5330;
    const cabling = 25000 * (count / 20);
    const setup = 20000 * (count / 20);
    const subtotal = workstations + network + cabling + setup;
    const reserve = subtotal * 0.10;
    pcCountValue.value = count;
    pcCountValue.textContent = count;
    calcTotal.textContent = `${fmt(subtotal + reserve)} сом`;
  }
  pcCount.addEventListener('input', updateBudget);
  updateBudget();
}

const search = document.getElementById('termSearch');
const terms = [...document.querySelectorAll('.term')];
const termCount = document.getElementById('termCount');
const noResults = document.getElementById('noResults');
if (search && termCount && noResults) {
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('ru');
    let visible = 0;
    terms.forEach(term => {
      const match = term.textContent.toLocaleLowerCase('ru').includes(query);
      term.hidden = !match;
      if (match) visible++;
    });
    termCount.textContent = `${visible} из ${terms.length} терминов`;
    noResults.hidden = visible !== 0;
  });
}

const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => toTop.classList.toggle('visible', window.scrollY > 500));
  toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.section-heading, .definition-card, .equipment-card, .timeline article, .reason-grid article, .term, .result-grid > *, .opex-card, .opex-list-item, .opex-feature, .software-card, .software-feature, .software-list > div, .software-timeline article, .finance-grid article, .finance-row, .finance-highlight, .finance-stats article, .budget-total-cards article, .reserve-grid article, .per-student > div, .page-link-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

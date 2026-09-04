document.addEventListener('DOMContentLoaded', () => {
  const boton = document.querySelector('.header__toggle');
  const menu = document.querySelector('.header__nav');

  if (boton && menu) {
    boton.addEventListener('click', () => {
      const abierto = menu.classList.toggle('is-open');
      boton.setAttribute('aria-expanded', abierto);
    });
  }

  const revelar = (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  };

  const elementos = document.querySelectorAll('.reveal, .reveal-stagger');

  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observador = new IntersectionObserver(revelar, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    });

    elementos.forEach((el) => observador.observe(el));
  }

  const CLAVE_COOKIES = 'manaba-cookie-consent';
  const banner = document.getElementById('cookiesBanner');

  if (banner) {
    let consentimiento = null;
    try {
      consentimiento = localStorage.getItem(CLAVE_COOKIES);
    } catch (e) {
      consentimiento = null;
    }

    if (consentimiento) {
      banner.hidden = true;
    }

    banner.querySelectorAll('[data-cookie]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const valor = btn.dataset.cookie;
        try {
          localStorage.setItem(CLAVE_COOKIES, valor);
        } catch (e) {
          /* modo privado sin almacenamiento: solo ocultamos el aviso */
        }
        banner.hidden = true;
      });
    });
  }
});
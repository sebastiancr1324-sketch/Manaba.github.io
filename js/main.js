document.addEventListener('DOMContentLoaded', () => {
  const boton = document.querySelector('.header__toggle');
  const menu = document.querySelector('.header__nav');

  if (boton && menu) {
    const setMenu = (abierto) => {
      menu.classList.toggle('is-open', abierto);
      boton.setAttribute('aria-expanded', abierto);
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    };

    boton.addEventListener('click', () => {
      setMenu(!menu.classList.contains('is-open'));
    });

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        boton.focus();
      }
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

  // Sitio de demostración: GitHub Pages no acepta envíos (responde 405),
  // así que los formularios avisan en lugar de enviar.
  document.querySelectorAll('form.formulario').forEach((form) => {
    const aviso = document.createElement('p');
    aviso.className = 'formulario__aviso';
    aviso.setAttribute('role', 'status');
    form.append(aviso);

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      aviso.textContent = '¡Gracias! Este es un sitio de demostración, así que el formulario no envía datos.';
    });
  });
});
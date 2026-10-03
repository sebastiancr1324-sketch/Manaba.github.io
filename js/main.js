document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const boton = document.querySelector('.header__toggle');
  const menu = document.querySelector('.header__nav');

  if (header) {
    const marcarScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    marcarScroll();
    window.addEventListener('scroll', marcarScroll, { passive: true });
  }

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

  // Año del copyright siempre al día (el HTML trae uno de respaldo)
  document.querySelectorAll('[data-anio]').forEach((el) => {
    el.textContent = el.textContent.replace(/\d{4}/, new Date().getFullYear());
  });

  // Reservas: no permitir fechas pasadas (fecha local, no UTC)
  const fecha = document.querySelector('input[type="date"]#fecha');
  if (fecha) {
    const hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    fecha.min = hoy.toISOString().slice(0, 10);
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
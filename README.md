# Manaba — café de especialidad

Sitio de portafolio de un café ficticio en Palermo (CABA). HTML, SCSS y
JavaScript sin dependencias, publicado con GitHub Pages en
<https://sebastiancr1324-sketch.github.io/Manaba.github.io/>.

## Estructura

- `index.html`, `404.html` y `pages/`: las páginas.
- `scss/`: estilos fuente. Colores, tipografías, espaciado, radios y sombras
  viven como custom properties en `scss/_tokens.scss`: no se usan hex ni
  `rgba` fuera de ese archivo. `css/main.css` es el resultado compilado y se
  sube al repo, porque GitHub Pages sirve los archivos tal cual.
- `js/main.js`: menú móvil, animaciones de entrada, formularios de
  demostración y año del pie.
- `fonts/`: Poppins y JetBrains Mono (subconjunto latino, licencia SIL OFL).
  Fraunces, la de los títulos, se carga desde Google Fonts.
- `img/`: fotos en WebP (480, 800 y 1200 px), imagen para redes
  (`og-manaba.jpg`) e íconos.

## Compilar los estilos

Después de cambiar algo en `scss/`, regenerá `css/main.css`:

```sh
npx sass --no-source-map scss/main.scss css/main.css
```

## Notas

- `404.html` usa rutas que empiezan con `/Manaba.github.io/`, porque
  GitHub Pages la muestra en la URL que falló, a cualquier profundidad.
- Las animaciones de entrada solo ocultan contenido si `<html>` tiene la
  clase `js`; sin JavaScript todo se ve igual.
- Los datos de contacto, el CUIT y los formularios son de demostración.

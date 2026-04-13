# BEO Storybook — Proyecto de prueba GitHub Pages

Réplica mínima del stack real para validar el pipeline de CI/CD antes de moverlo a Pantheon Gold.

## Stack

| Tecnología | Versión |
|---|---|
| Lit | ^3.3.2 |
| Tailwind CSS | ^4.2.2 |
| Storybook | ^8.6.12 |
| Vite | ^6.x |
| TypeScript | ~5.7.x |

## Inicio rápido

```bash
npm install

npm run storybook
```

Storybook corre en **http://localhost:6008**

## Estructura del componente de prueba

```
src/stories/atoms/cc-button/
├── cc-button.css        ← Fuente Tailwind (edita aquí)
├── cc-button.lit.ts     ← Generado por build:tailwind (no editar)
├── cc-button.ts         ← LitElement
└── cc-button.stories.ts ← Stories de Storybook
```

## Pipeline CSS

```
cc-button.css  ──→  PostCSS + Tailwind  ──→  cc-button.lit.ts  ──→  Shadow DOM
beo-input.css  ──→  PostCSS + Tailwind  ──→  beo-tailwind.css  ──→  Storybook global
```

**Importante:** `npm run build:tailwind` debe ejecutarse antes de `build-storybook`.
El workflow de GitHub Actions lo hace automáticamente.

## Deploy en GitHub Pages

El workflow `.github/workflows/deploy-storybook.yml` se dispara en cada push a `main`:

1. `npm ci`
2. `npm run build:tailwind` — genera CSS y `.lit.ts`
3. `npm run build-storybook` — compila a `storybook-static/`
4. Deploy a GitHub Pages

### Configurar GitHub Pages

1. Ve a tu repo → **Settings** → **Pages**
2. En **Source** selecciona **GitHub Actions**
3. Haz push a `main` y espera el primer deploy

La URL quedará en: `https://<usuario>.github.io/<repo>/`

## Diferencias con el proyecto real en Pantheon

| Aspecto | Este repo (prueba) | Proyecto real |
|---|---|---|
| Hosting | GitHub Pages (gratis) | Pantheon Multidev (Gold) |
| Contenido | Solo Storybook estático | Drupal + Storybook integrado |
| Deploy trigger | Push a `main` | Push a rama Pantheon |
| CSS pipeline | Idéntico | Idéntico |
| Convenciones de código | Idénticas | Idénticas |

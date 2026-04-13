import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";
import { writeFileSync, readFileSync, readdirSync, statSync, existsSync, mkdirSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// ── Directorios ────────────────────────────────────────────────
const COMPONENTS_DIR = join(__dirname, "..", "stories");
const STYLES_DIR     = join(__dirname, "..", "styles");
const DIST_DIR       = join(__dirname, "..", "..", "dist");
const INPUTS_DIR     = join(STYLES_DIR, "inputs");
const PREVIEW_PATH   = join(__dirname, "..", "..", ".storybook", "preview.ts");

/**
 * Detecta el tema activo leyendo el import en preview.ts
 */
function detectActiveBrand() {
  try {
    const previewContent = readFileSync(PREVIEW_PATH, "utf8");
    const match = previewContent.match(/import\s+['"].*\/(\w+)-tailwind\.css['"]/);
    if (match) {
      const brand = match[1];
      if (brand === "tailwind") return "input.css";
      return `${brand}-input.css`;
    }
  } catch {
    console.warn("⚠️  No se pudo leer preview.ts");
  }
  return "beo-input.css";
}

// ── Configuración por marca ────────────────────────────────────
const BRAND_CONFIGS = [
  { input: "input.css",     output: "tailwind.css",     distOutput: "tailwind.min.css"     },
  { input: "beo-input.css", output: "beo-tailwind.css", distOutput: "beo-tailwind.min.css" },
  { input: "ebf-input.css", output: "ebf-tailwind.css", distOutput: "ebf-tailwind.min.css" },
];

/**
 * Procesa el CSS global de Tailwind para una marca y genera la versión minificada en dist/
 */
async function processGlobalCss(config) {
  const inputPath     = join(INPUTS_DIR, config.input);
  const outputPath    = join(STYLES_DIR, config.output);
  const distOutputPath = join(DIST_DIR, config.distOutput);

  if (!existsSync(inputPath)) {
    console.log(`⚠️  Archivo no encontrado: ${config.input}, saltando...`);
    return;
  }

  try {
    const inputCss = readFileSync(inputPath, "utf8");

    // Desarrollo (sin minificar)
    const result = await postcss([tailwindcss()]).process(inputCss, { from: inputPath });
    writeFileSync(outputPath, result.css, "utf8");
    console.log(`✅ Global CSS generado: ${config.output}`);

    // Dist (minificado)
    if (!existsSync(DIST_DIR)) mkdirSync(DIST_DIR, { recursive: true });
    const minified = await postcss([tailwindcss(), cssnano({ preset: "default" })]).process(inputCss, { from: inputPath });
    writeFileSync(distOutputPath, minified.css, "utf8");
    console.log(`✅ Global CSS minificado: dist/${config.distOutput}`);
  } catch (error) {
    console.error(`❌ Error al procesar ${config.input}:`, error.message || error);
  }
}

/**
 * Procesa un CSS de componente con Tailwind y genera el archivo .lit.ts (minificado)
 */
async function processTailwindToLit(inputCss, outputPath) {
  const componentName  = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    const componentCss   = readFileSync(inputCss, "utf8");
    const activeInputFile = detectActiveBrand();
    const activeInputPath = join(INPUTS_DIR, activeInputFile);
    const combinedCss    = `@reference "${activeInputPath}";\n\n${componentCss}`;

    const result = await postcss([tailwindcss(), cssnano({ preset: "default" })]).process(combinedCss, { from: inputCss });
    const componentStyles = result.css.trim();
    const hostStyles = `:host{box-sizing:border-box}:host *,:host *::before,:host *::after{box-sizing:inherit}[hidden]{display:none!important}`;

    const litCss = `import { css } from 'lit';\nexport default css\`${hostStyles}${componentStyles}\`;\n`;
    writeFileSync(outputFilePath, litCss, "utf8");
    console.log(`✅ Componente generado: ${componentName}.lit.ts`);
    return true;
  } catch (error) {
    console.error(`❌ Error al procesar ${inputCss}:`, error.message || error);
    return false;
  }
}

/**
 * Busca recursivamente archivos CSS de componentes (cc-*.css)
 */
function findComponentCssFiles(dir, files = []) {
  for (const item of readdirSync(dir)) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) {
      if (item !== "styles") findComponentCssFiles(fullPath, files);
    } else if (item.endsWith(".css") && item.startsWith("cc-")) {
      files.push(fullPath);
    }
  }
  return files;
}

// ── Ejecutar build ─────────────────────────────────────────────
console.log("🚀 Compilando Tailwind CSS...\n");

for (const config of BRAND_CONFIGS) {
  await processGlobalCss(config);
}

const componentFiles = findComponentCssFiles(COMPONENTS_DIR);

if (componentFiles.length === 0) {
  console.log("\n⚠️  No se encontraron componentes CSS para procesar.");
} else {
  console.log(`\n📦 Procesando ${componentFiles.length} componente(s)...\n`);
  let ok = 0, fail = 0;
  for (const file of componentFiles) {
    const success = await processTailwindToLit(file, join(dirname(file), "/"));
    success ? ok++ : fail++;
  }
  console.log("\n" + "=".repeat(40));
  console.log(`✨ Build completado: ${ok} exitosos${fail ? ` | ❌ ${fail} errores` : ""}`);
  console.log("=".repeat(40));
}
